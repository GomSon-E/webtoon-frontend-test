import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Modal } from 'antd';

const CalendarArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate an API call to fetch events
    setTimeout(() => {
      const fetchedEvents = [
        {
          title: '일정 1',
          start: '2023-06-28',
          end: '2023-06-29',
          backgroundColor: 'green'
        },
        {
          title: '일정 2',
          start: '2023-07-01',
          end: '2023-07-02',
          backgroundColor: 'green'
        },
        // Additional events...
      ];
      setEvents(fetchedEvents);
      setIsLoading(false);
    }, ); 
  }, []);
  

  return (
    <div className={`calendar-area ${isLoading ? 'loading' : ''}`}>
      {isLoading ? (
        <div className="skeleton-loader"/>
      ) : (
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[dayGridPlugin, timeGridPlugin]} 
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
        />
      )}
    </div>
  );
};

export default CalendarArea;
