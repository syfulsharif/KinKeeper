import React from 'react';
import { useFriends } from '../context/FriendContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart3, TrendingUp, Users, Heart } from 'lucide-react';

const Stats = () => {
  const { interactions, friends } = useFriends();

  // Aggregate Data for Pie Chart
  const dataMap = interactions.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, { Call: 0, Text: 0, Video: 0 });

  const chartData = [
    { name: 'Call', value: dataMap.Call, color: '#10B981' }, // emerald-500
    { name: 'Text', value: dataMap.Text, color: '#8B5CF6' }, // violet-500
    { name: 'Video', value: dataMap.Video, color: '#F59E0B' }, // amber-500
  ];

  // Additional Analytics
  const topFriend = friends.length > 0 ? friends.reduce((prev, current) => (prev.days_since_contact < current.days_since_contact) ? prev : current) : null;
  const healthScore = friends.length > 0 ? Math.round((friends.filter(f => f.status === 'on-track').length / friends.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Friendship Analytics</h1>
        <p className="text-gray-500">Insights into how you're maintaining your social connections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pie Chart Section */}
        <div className="lg:col-span-2 card p-8 h-[500px] flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary-dark" />
            Interaction Distribution
          </h3>
          <div className="flex-grow">
            {interactions.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 font-medium italic">
                No interaction data to display yet.
              </div>
            )}
          </div>
        </div>

        {/* Key Metrics Sidebar */}
        <div className="space-y-6">
          <div className="card p-6 bg-emerald-50 border-emerald-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm">
                <Heart size={24} />
              </div>
              <h4 className="font-bold text-emerald-900">Health Score</h4>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-emerald-600">{healthScore}%</span>
              <span className="text-emerald-700 text-sm font-medium mb-1">On-Track</span>
            </div>
            <p className="text-emerald-700/70 text-xs mt-3">Percentage of friends in "on-track" status.</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-gray-50 rounded-xl text-primary-dark">
                <Users size={24} />
              </div>
              <h4 className="font-bold text-gray-900">Total Contacts</h4>
            </div>
            <div className="text-3xl font-black text-gray-900">{friends.length}</div>
            <p className="text-gray-500 text-xs mt-2">Friends managed in your personal circle.</p>
          </div>

          {topFriend && (
            <div className="card p-6 border-l-4 border-amber-400">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-1 bg-amber-50 rounded-full border border-amber-100">
                  <img src={topFriend.picture} alt="" className="w-10 h-10 rounded-full object-cover" />
                </div>
                <h4 className="font-bold text-gray-900">Most Consistent</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">You're staying closest to:</p>
              <div className="font-bold text-lg text-amber-600">{topFriend.name}</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Stats;
