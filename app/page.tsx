'use client';

import { useState } from 'react';
import SubscriptionCalendar from '@/components/calendar/SubscriptionCalendar';
import AddSubscriptionModal from '@/components/subscriptions/AddSubscriptionModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  
  const handleAddSubscription = (newSubscription) => {
    setSubscriptions([...subscriptions, newSubscription]);
    setIsModalOpen(false);
  };
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subscription Calendar</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Subscription
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-4">
        <SubscriptionCalendar subscriptions={subscriptions} />
      </div>
      
      {isModalOpen && (
        <AddSubscriptionModal 
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddSubscription}
        />
      )}
    </main>
  );
}
