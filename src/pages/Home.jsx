import React from 'react';
import { useFriends } from '../context/FriendContext';
import LoadingSpinner from '../components/LoadingSpinner';
import FriendCard from '../components/FriendCard';
import { UserPlus, Users, Bell, MessageCircle, Calendar } from 'lucide-react';

const Home = () => {
  const { friends, interactions, loading } = useFriends();

  if (loading) return <LoadingSpinner />;

  // Analytics Calculation
  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(f => f.status !== 'on-track').length;
  
  // Interactions this month (simplified)
  const currentMonthInteractions = interactions.length; 

  const summaryCards = [
    { title: 'Total Friends', value: totalFriends, icon: <Users size={24} />, color: 'bg-blue-50 text-blue-600' },
    { title: 'On-Track', value: onTrackCount, icon: <Calendar size={24} />, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Need Attention', value: needAttention, icon: <Bell size={24} />, color: 'bg-rose-50 text-rose-600' },
    { title: 'Interactions', value: currentMonthInteractions, icon: <MessageCircle size={24} />, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Keep Your <span className="text-primary-dark">Friendships Solid</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Never lose touch with the people who matter. Tracking interactions and reminders all in one place.
        </p>
        <button className="btn-primary mx-auto">
          <UserPlus size={20} />
          Add a Friend
        </button>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="card p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-xl ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Friends Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 px-2">Your Inner Circle</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {friends.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
