import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
}

const API_URL = import.meta.env.PROD
  ? `${import.meta.env.VITE_URL_PUBBLICO}/api`
  : '/api';


export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', errorData);
        throw new Error(`Failed to fetch contact: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setContact(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
      if (error instanceof Error && error.message.includes('No authentication token')) {
        // Redirect to login if no token is found
        window.location.href = '/admin/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: 'read' | 'replied') => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Sessione scaduta. Effettua nuovamente il login.');
      navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', errorData);
        throw new Error(`Failed to update contact status: ${response.status}`);
      }

      const updatedContact = await response.json();
      setContact(updatedContact);
    } catch (error) {
      console.error('Error updating contact status:', error);
      alert('Errore durante l\'aggiornamento dello stato. Riprova più tardi.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Sei sicuro di voler eliminare questa richiesta di contatto?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      navigate('/admin/contacts');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Richiesta non trovata</h2>
        <button
          onClick={() => navigate('/admin/contacts')}
          className="mt-4 text-blue-600 hover:text-blue-900"
        >
          Torna alla lista
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/contacts')}
          className="flex items-center text-blue-600 hover:text-blue-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Torna alla lista
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{contact.subject}</h1>
              <p className="text-gray-500 mt-1">
                Ricevuto il {formatDate(contact.createdAt)}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nome</h3>
                <p className="mt-1 text-gray-900">{contact.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-gray-900">{contact.email}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Messaggio</h3>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{contact.message}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Stato</h3>
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => handleStatusChange('read')}
                  className={`px-4 py-2 rounded-md ${contact.status === 'read'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-800'
                    }`}
                >
                  Segna come letto
                </button>
                <button
                  onClick={() => handleStatusChange('replied')}
                  className={`px-4 py-2 rounded-md ${contact.status === 'replied'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-green-100 hover:text-green-800'
                    }`}
                >
                  Segna come risposto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 