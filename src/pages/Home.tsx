import React from 'react';
import Calendar from '../components/Calendar/Calendar.tsx';
import SessionList from '../components/SessionList/Sessionlist.tsx';
import SessionForm from '../components/SessionForm/Sessionform.tsx';
import { SessionProvider } from '../context/SessionContext.tsx';

const Home: React.FC = () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    return (
      <SessionProvider>
        <div>
          <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
          <SessionForm selectedDate={selectedDate} />
          <SessionList />
        </div>
      </SessionProvider>
    );
  };
  
  export default Home;