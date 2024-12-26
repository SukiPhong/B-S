import React from 'react';
import { Check, Star, DollarSign, Bell, User, Edit } from 'lucide-react';

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const { id, content, createdAt, type, isRead } = notification;

  const getIcon = () => {
    switch (type) {
      case 'post_approval':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'post_rating':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'package_purchase':
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      case 'user_update':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'post_edit':
        return <Edit className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div 
      className={`flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
        isRead ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex-shrink-0 mr-4">
        {getIcon()}
      </div>
      <div className="flex-grow min-w-0">
        <p className={`text-sm ${isRead ? 'text-gray-600' : 'text-gray-900'}`}>
          {content}
        </p>
        <p className="text-xs text-gray-500 mt-1">
        {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      {!isRead && (
        <button
          onClick={() => onMarkAsRead(id)}
          className="ml-4 text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap"
        >
          Mark as read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;

