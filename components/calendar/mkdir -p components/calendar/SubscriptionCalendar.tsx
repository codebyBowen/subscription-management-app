'use client';

import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Image from 'next/image';

const localizer = momentLocalizer(moment);

export interface Subscription {
  id?: string;
  name: string;
  price: string;
  startDate: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  logo?: string | null;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: Subscription;
}

interface SubscriptionCalendarProps {
  subscriptions: Subscription[];
}

interface EventComponentProps {
  event: CalendarEvent;
}

export default function SubscriptionCalendar({ subscriptions = [] }: SubscriptionCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  useEffect(() => {
    // 将订阅转换为日历事件
    const calendarEvents: CalendarEvent[] = [];
    
    subscriptions.forEach(sub => {
      // 添加初始付款
      const startDate = new Date(sub.startDate);
      
      // 添加未来的付款（例如，未来12个月）
      for (let i = 0; i <= 12; i++) {
        const futureDate = new Date(startDate);
        
        if (sub.frequency === 'monthly') {
          futureDate.setMonth(startDate.getMonth() + i);
        } else if (sub.frequency === 'yearly') {
          futureDate.setFullYear(startDate.getFullYear() + i);
        } else if (sub.frequency === 'weekly') {
          futureDate.setDate(startDate.getDate() + (i * 7));
        } else if (sub.frequency === 'daily') {
          futureDate.setDate(startDate.getDate() + i);
        }
        
        calendarEvents.push({
          id: `${sub.id || sub.name}-${i}`,
          title: `${sub.name} - ${sub.price}`,
          start: futureDate,
          end: futureDate,
          allDay: true,
          resource: sub
        });
      }
    });
    
    setEvents(calendarEvents);
  }, [subscriptions]);
  
  // 自定义事件渲染，显示logo
  const EventComponent = ({ event }: EventComponentProps) => {
    return (
      <div className="flex items-center gap-2 p-1">
        {event.resource.logo && (
          <div className="w-5 h-5 relative">
            <Image 
              src={event.resource.logo} 
              alt={event.resource.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <span className="text-sm truncate">{event.title}</span>
      </div>
    );
  };
  
  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        components={{
          event: EventComponent
        }}
      />
    </div>
  );
}