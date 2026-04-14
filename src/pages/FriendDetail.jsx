import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFriends } from '../context/FriendContext';
import { toast } from 'react-toastify';
import { Mail, Calendar, Target, Clock, Activity, ChevronLeft, Edit2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

// Assets
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

const FriendDetail = () => {
  const { id } = useParams();
  const { friends, addInteraction, loading } = useFriends();
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  const friend = friends.find(f => f.id === parseInt(id));

  if (loading) return <LoadingSpinner />;
  if (!friend) return <div className="text-center py-20 font-bold text-2xl">Friend Not Found</div>;

  const handleAction = (type) => {
    addInteraction(friend.id, type);
    toast.success(`${type} with ${friend.name} logged!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'bg-rose-100 text-rose-600 border-rose-200';
      case 'almost due': return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'on-track': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="flex items-center gap-1 text-primary-dark font-medium mb-8 hover:underline">
        <ChevronLeft size={20} />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-4">
          <div className="card">
            <div className="p-8 text-center border-b border-gray-100">
              <div className="relative inline-block mb-6">
                <img 
                  src={friend.picture} 
                  alt={friend.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                />
                <div className={`absolute bottom-1 right-1 w-6 h-6 border-4 border-white rounded-full ${friend.status === 'on-track' ? 'bg-emerald-500' : friend.status === 'almost due' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{friend.name}</h2>
              <span className={`badge border ${getStatusColor(friend.status)}`}>
                {friend.status}
              </span>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {friend.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-50 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">About</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{friend.bio}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="text-primary-dark" />
                <span className="text-sm">{friend.email}</span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex flex-col gap-3">
              <button className="w-full py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors text-sm">
                ⏰ Snooze 2 Weeks
              </button>
              <button className="w-full py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors text-sm">
                📦 Archive
              </button>
              <button className="w-full py-2.5 rounded-lg border border-rose-100 bg-white text-rose-600 font-medium hover:bg-rose-50 transition-colors text-sm">
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Actions */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card p-6 flex flex-col items-center text-center">
              <Activity className="text-rose-500 mb-3" size={24} />
              <span className="text-2xl font-bold text-gray-900">{friend.days_since_contact}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">Days Since Contact</span>
            </div>
            <div className="card p-6 flex flex-col items-center text-center">
              <Target className="text-primary-dark mb-3" size={24} />
              <span className="text-2xl font-bold text-gray-900">{friend.goal}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">Current Goal (Days)</span>
            </div>
            <div className="card p-6 flex flex-col items-center text-center">
              <Clock className="text-amber-500 mb-3" size={24} />
              <span className="text-2xl font-bold text-gray-900">{friend.next_due_date}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-tighter">Next Due Date</span>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Target size={20} className="text-primary-dark" />
                Relationship Goal
              </h3>
              <button 
                onClick={() => setIsEditingGoal(!isEditingGoal)}
                className="text-primary-dark hover:text-opacity-80 transition-colors"
                title="Edit Goal"
              >
                <Edit2 size={18} />
              </button>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <p className="text-emerald-800">
                You currently aim to contact <span className="font-bold">{friend.name}</span> every <span className="font-bold underline">{friend.goal} days</span>.
              </p>
              {isEditingGoal && (
                <div className="mt-4 flex gap-2">
                   <input type="number" placeholder={friend.goal} className="w-20 px-3 py-1 rounded border border-emerald-200 outline-none focus:ring-2 focus:ring-primary-light" />
                   <button className="bg-primary-dark text-white px-4 py-1 rounded text-sm font-medium">Save</button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Check-In Card */}
          <div className="card p-8 bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Activity size={20} className="text-rose-500" />
              Quick Check-In
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <button 
                onClick={() => handleAction('Call')}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-gray-50 border-2 border-transparent hover:border-gray-100 transition-all duration-200 group"
              >
                <div className="p-4 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform">
                  <img src={callIcon} alt="Call" className="w-10 h-10" />
                </div>
                <span className="font-bold text-gray-700">Log Call</span>
              </button>
              
              <button 
                onClick={() => handleAction('Text')}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-gray-50 border-2 border-transparent hover:border-gray-100 transition-all duration-200 group"
              >
                <div className="p-4 bg-purple-50 rounded-full group-hover:scale-110 transition-transform">
                  <img src={textIcon} alt="Text" className="w-10 h-10" />
                </div>
                <span className="font-bold text-gray-700">Log Text</span>
              </button>
              
              <button 
                onClick={() => handleAction('Video')}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-gray-50 border-2 border-transparent hover:border-gray-100 transition-all duration-200 group"
              >
                <div className="p-4 bg-amber-50 rounded-full group-hover:scale-110 transition-transform">
                  <img src={videoIcon} alt="Video" className="w-10 h-10" />
                </div>
                <span className="font-bold text-gray-700">Log Video</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FriendDetail;
