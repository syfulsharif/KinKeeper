import React, { useState } from 'react';
import { useFriends } from '../context/FriendContext';
import { Filter, Calendar, MessageSquare, Phone, Video, Search } from 'lucide-react';

// Assets for reference (using Lucide for timeline icons for better clarity/consistency)
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

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
        <div className="text-center py-20 card bg-gray-50 border-dashed border-gray-200">
          <History className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No interactions logged yet</h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            Check in with your friends from their profile page to see history here.
          </p>
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
