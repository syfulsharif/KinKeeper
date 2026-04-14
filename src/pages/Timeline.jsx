import React, { useState } from 'react';
import { useFriends } from '../context/FriendContext';
import { Calendar, MessageSquare, Phone, Video, History, Activity } from 'lucide-react';



const Timeline = () => {
  const { interactions } = useFriends();
  const [filter, setFilter] = useState('All');

  const filteredInteractions = filter === 'All' 
    ? interactions 
    : interactions.filter(i => i.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case 'Call': return <div className="p-2 bg-emerald-100 rounded-full text-emerald-600"><Phone size={18} /></div>;
      case 'Text': return <div className="p-2 bg-purple-100 rounded-full text-purple-600"><MessageSquare size={18} /></div>;
      case 'Video': return <div className="p-2 bg-amber-100 rounded-full text-amber-600"><Video size={18} /></div>;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Interaction History</h1>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          {['All', 'Call', 'Text', 'Video'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filter === type 
                  ? 'bg-primary-dark text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filteredInteractions.length === 0 ? (
        <div className="text-center py-24 card bg-white border-2 border-dashed border-gray-100 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary-light/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white p-6 rounded-3xl shadow-xl ring-1 ring-gray-100 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <History className="text-primary-dark" size={64} strokeWidth={1.5} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Your Timeline is Empty</h3>
          <p className="text-gray-500 max-w-sm mx-auto leading-relaxed mb-10">
            You haven't logged any interactions yet. Head over to a friend's profile to record your first check-in!
          </p>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 w-full max-w-md">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Activity size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Pro Tip</h4>
                <p className="text-xs text-gray-500">Regular check-ins keep your friendship health scores high and streaks alive.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative space-y-8">
          {/* Vertical Line */}
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-100 -z-10"></div>

          {filteredInteractions.map((interaction, idx) => (
            <div key={interaction.id} className="flex items-start gap-6 group">
              <div className="z-10 bg-white p-1 rounded-full shadow-sm ring-4 ring-gray-50">
                {getIcon(interaction.type)}
              </div>
              
              <div className="flex-grow card p-5 hover:shadow-md transition-all group-hover:border-primary-light">
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {interaction.type} with <span className="text-primary-dark">{interaction.friendName}</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <Calendar size={12} />
                    {interaction.date}
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Successfully logged a {interaction.type.toLowerCase()} interaction to maintain your friendship streak.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
