import React, { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { Session } from '../../types';
import './SessionList.css';

const SessionList: React.FC = () => {
  const { sessions, removeSession } = useContext(SessionContext)!;

  return (
    <div>
      <h2>Scheduled Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions scheduled.</p>
      ) : (
        <table className="session-table">
          <thead>
            <tr>
              <th>Case Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Arbitrator</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session: Session) => (
              <tr key={session.id}>
                <td>{session.caseNumber}</td>
                <td>{session.date}</td>
                <td>{session.time}</td>
                <td>{session.arbitrator}</td>
                <td>{session.participants.join(', ')}</td>
                <td>
                  <button onClick={() => removeSession(session.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SessionList;