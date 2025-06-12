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
read -p "Vuoi configurare HTTPS? (s/n): " USE_HTTPS
read -p "Inserisci il dominio per il certificato SSL (es. cricossato.it): " DOMAIN

USER_NAME=$(whoami)
APP_DIR="/var/www/cricossato"
REPO_URL="https://github.com/EasySimho/CRICossato-Server-Host2"
NGINX_CONF_PATH="/etc/nginx/sites-available/cricossato"

echo "Aggiornamento sistema..."
sudo apt update && sudo apt upgrade -y

echo "Installazione dipendenze base..."
sudo apt install -y git curl nginx ufw certbot python3-certbot-nginx

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
FRONTEND_URL=http${USE_HTTPS,,}://$IP_PUBBLICO
BASE_URL=http${USE_HTTPS,,}://$IP_PUBBLICO
JWT_SECRET=$JWT_SECRET
ADMIN_PASSWORD=$ADMIN_PASSWORD
EOF

echo "File backend/.env creato."

# Creazione frontend .env
cat > $APP_DIR/frontend/.env <<EOF
VITE_BACKEND_URL=
VITE_URL_PUBBLICO=http${USE_HTTPS,,}://$IP_PUBBLICO
EOF

echo "File frontend/.env creato."

echo "Installazione dipendenze backend..."
cd $APP_DIR/backend
npm install

echo "Build backend..."
npm run build

echo "Installazione dipendenze frontend..."
cd $APP_DIR/frontend
npm install

echo "Build frontend..."
npm run build

echo "Configurazione PM2 backend..."
cd $APP_DIR/backend
pm2 start npm --name "cricossato-backend" -- start
pm2 save

# Creazione script di avvio
cat > $APP_DIR/start.sh <<EOF
#!/bin/bash
cd $APP_DIR/backend
pm2 start npm --name "cricossato-backend" -- start
EOF

chmod +x $APP_DIR/start.sh

echo "Configurazione firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "Configurazione Nginx..."

if [ "${USE_HTTPS,,}" = "s" ]; then
  sudo bash -c "cat > $NGINX_CONF_PATH" <<EOF
server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

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
else
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
fi

echo "Rimozione configurazione Nginx di default..."
sudo rm -f /etc/nginx/sites-enabled/default

echo "Abilitazione configurazione cricossato..."
sudo ln -sf $NGINX_CONF_PATH /etc/nginx/sites-enabled/

echo "Verifica configurazione Nginx..."
sudo nginx -t

echo "Riavvio Nginx..."
sudo systemctl restart nginx

if [ "${USE_HTTPS,,}" = "s" ]; then
  echo "Configurazione certificato SSL..."
  sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
fi

echo
echo "=== SETUP COMPLETATO ==="
if [ "${USE_HTTPS,,}" = "s" ]; then
  echo "Applicazione disponibile all'indirizzo: https://$DOMAIN"
else
  echo "Applicazione disponibile all'indirizzo: http://$IP_PUBBLICO"
fi
