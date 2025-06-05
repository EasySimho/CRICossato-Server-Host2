#!/bin/bash

set -e

echo "=== Setup completo sito web CRICossato ==="

# Input utente
read -p "Inserisci IP pubblico / dominio del server (per info, usato solo in .env, non in nginx): " IP_PUBBLICO
read -p "Inserisci la porta backend (default 3000): " PORT
PORT=${PORT:-3000}
read -p "Inserisci la secret key JWT (es. stringa lunga casuale): " JWT_SECRET
read -p "Inserisci password admin (default 'Admin'): " ADMIN_PASSWORD
ADMIN_PASSWORD=${ADMIN_PASSWORD:-Admin}

USER_NAME=$(whoami)
APP_DIR="/var/www/cricossato"
REPO_URL="https://github.com/EasySimho/CRICossato-Server-Host2"
NGINX_CONF_PATH="/etc/nginx/sites-available/cricossato"

echo "Aggiornamento sistema..."
sudo apt update && sudo apt upgrade -y

echo "Installazione dipendenze base..."
sudo apt install -y git curl nginx ufw

echo "Installazione Node.js 18.x e npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

echo "Installazione PM2 globalmente..."
sudo npm install -g pm2

echo "Installazione MongoDB 8.0..."
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

echo "Creazione directory applicazione..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER_NAME:$USER_NAME $APP_DIR

echo "Clonazione repository..."
if [ -d "$APP_DIR/CRICossato-Server-Host2" ]; then
  echo "Repository già presente, aggiorno..."
  cd $APP_DIR/CRICossato-Server-Host2 && git pull
else
  git clone $REPO_URL $APP_DIR/CRICossato-Server-Host2
fi

echo "Spostamento file nella root di $APP_DIR..."
mv $APP_DIR/CRICossato-Server-Host2/* $APP_DIR/
rm -rf $APP_DIR/CRICossato-Server-Host2

# Creazione backend .env
cat > $APP_DIR/backend/.env <<EOF
PORT=$PORT
MONGODB_URI=mongodb://127.0.0.1:27017/cri-db
FRONTEND_URL=http://$IP_PUBBLICO
BASE_URL=http://$IP_PUBBLICO
JWT_SECRET=$JWT_SECRET
ADMIN_PASSWORD=$ADMIN_PASSWORD
EOF

echo "File backend/.env creato."

# Creazione frontend .env
cat > $APP_DIR/frontend/.env <<EOF
BACKEND_URL=
URL_PUBBLICO=http://$IP_PUBBLICO
EOF

echo "File frontend/.env creato."

echo "Installazione dipendenze backend..."
cd $APP_DIR/backend
npm install

echo "Installazione dipendenze frontend..."
cd $APP_DIR/frontend
npm install

echo "Build frontend..."
npm run build

echo "Configurazione PM2 backend..."
pm2 start npm --name "cricossato-backend" -- start
pm2 save
pm2 startup systemd -u $USER_NAME --hp /home/$USER_NAME

echo "Configurazione firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw --force enable

echo "Configurazione Nginx..."

sudo bash -c "cat > $NGINX_CONF_PATH" <<EOF
server {
    listen 80;
    server_name _;

    # Frontend
    location / {
        root $APP_DIR/frontend/dist;
        try_files \$uri \$uri/ /index.html;
        index index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Configurazione per file statici
    location /uploads {
        alias $APP_DIR/backend/uploads;
    }
}
EOF

echo "Rimozione configurazione Nginx di default..."
sudo rm -f /etc/nginx/sites-enabled/default

echo "Abilitazione configurazione cricossato..."
sudo ln -sf $NGINX_CONF_PATH /etc/nginx/sites-enabled/

echo "Verifica configurazione Nginx..."
sudo nginx -t

echo "Riavvio Nginx..."
sudo systemctl restart nginx

echo
echo "=== SETUP COMPLETATO ==="
echo "Applicazione disponibile all'indirizzo: http://$IP_PUBBLICO"
