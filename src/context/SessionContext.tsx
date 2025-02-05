import React, { createContext, useState, ReactNode } from 'react';
import { Session } from '../types.ts';

interface SessionContextType {
  sessions: Session[];
  addSession: (session: Session) => void;
  removeSession: (id: string) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const addSession = (session: Session) => {
    setSessions((prev) => [...prev, session]);
  };

  const removeSession = (id: string) => {
    setSessions((prev) => prev.filter(session => session.id !== id));
  };

  return (
    <SessionContext.Provider value={{ sessions, addSession, removeSession }}>
      {children}
    </SessionContext.Provider>
  );
};