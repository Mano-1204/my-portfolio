import React, { useState, useEffect } from 'react';
import { Mail, Clock, User, MessageSquare, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API}/contact`);
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.patch(`${API}/contact/${messageId}/read`);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
    } catch (err) {
      console.error('Error marking message as read:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-slate-300 text-lg">Manage contact messages and portfolio content</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-2">Contact Messages</h2>
            <p className="text-slate-300">Total messages: {messages.length}</p>
          </div>

          <div className="divide-y divide-slate-700/50">
            {messages.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 hover:bg-slate-700/20 transition-colors duration-200 ${
                    !message.is_read ? 'bg-blue-500/5 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{message.name}</h3>
                        <p className="text-slate-400 text-sm">{message.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-slate-400 text-sm">
                        <Clock size={16} />
                        <span>{formatDate(message.timestamp)}</span>
                      </div>
                      {!message.is_read && (
                        <button
                          onClick={() => markAsRead(message.id)}
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                        >
                          <Eye size={16} />
                          <span>Mark as read</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-white font-medium mb-1">Subject:</h4>
                    <p className="text-slate-300">{message.subject}</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-1">Message:</h4>
                    <p className="text-slate-300 leading-relaxed">{message.message}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {message.is_read ? (
                        <div className="flex items-center space-x-1 text-green-400 text-sm">
                          <EyeOff size={16} />
                          <span>Read</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-blue-400 text-sm">
                          <Mail size={16} />
                          <span>Unread</span>
                        </div>
                      )}
                    </div>
                    <a
                      href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      Reply
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;