import React, { createContext, useContext, useState, useEffect } from 'react';
import initialFriends from '../data/friends.json';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('keenkeeper_friends');
    return saved ? JSON.parse(saved) : initialFriends;
  });

  const [interactions, setInteractions] = useState(() => {
    const saved = localStorage.getItem('keenkeeper_interactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('keenkeeper_friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('keenkeeper_interactions', JSON.stringify(interactions));
  }, [interactions]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const addInteraction = (friendId, type) => {
    const friend = friends.find(f => f.id === parseInt(friendId));
    if (!friend) return;

    const newInteraction = {
      id: Date.now(),
      friendId: friend.id,
      friendName: friend.name,
      type, // 'Call', 'Text', 'Video'
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      timestamp: new Date().toISOString()
    };

    setInteractions(prev => [newInteraction, ...prev]);

    // Update friend status (reset contact days for simplicity in this demo)
    setFriends(prev => prev.map(f => {
      if (f.id === friend.id) {
        return {
          ...f,
          days_since_contact: 0,
          status: 'on-track'
        };
      }
      return f;
    }));
  };

  const updateGoal = (friendId, newGoal) => {
    setFriends(prev => prev.map(f => {
      if (f.id === parseInt(friendId)) {
        return { ...f, goal: newGoal };
      }
      return f;
    }));
  };

  return (
    <FriendContext.Provider value={{ 
      friends, 
      interactions, 
      loading, 
      addInteraction,
      updateGoal 
    }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriends = () => useContext(FriendContext);
