import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Calendar } from 'lucide-react';

const FriendCard = ({ friend }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'bg-rose-100 text-rose-600 border-rose-200';
      case 'almost due': return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'on-track': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <Link to={`/friend/${friend.id}`} className="card group hover:border-primary-light transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
        />
        <div className="absolute top-4 right-4">
          <span className={`badge border ${getStatusColor(friend.status)}`}>
            {friend.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{friend.name}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Calendar size={14} />
          <span>Last contact: <span className="font-semibold text-gray-700">{friend.days_since_contact} days ago</span></span>
        </div>

        <div className="flex flex-wrap gap-2">
          {friend.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default FriendCard;
