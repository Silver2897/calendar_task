import React, { useContext, useState, useEffect } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { Session } from '../../types';
import './SessionForm.css';

interface SessionFormProps {
  selectedDate: Date | null;
}

const SessionForm: React.FC<SessionFormProps> = ({ selectedDate }) => {
  const { addSession } = useContext(SessionContext)!;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [caseNumber, setCaseNumber] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [arbitrator, setArbitrator] = useState<string>('');
  const [participants, setParticipants] = useState<string>('');

  useEffect(() => {
    if (selectedDate) {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      setDate(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
    } else {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      setDate(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
    }
  }, [selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: Session = {
      id: Math.random().toString(36).substr(2, 9),
      caseNumber,
      date,
      time,
      arbitrator,
      participants: participants.split(',').map(participant => participant.trim()),
    };
    addSession(newSession);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setCaseNumber('');
    setDate('');
    setTime('');
    setArbitrator('');
    setParticipants('');
  };

  return (
    <div>
      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>
        Schedule New Session
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Session</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Case Number:</label>
                <input type="text" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Arbitrator:</label>
                <input type="text" value={arbitrator} onChange={(e) => setArbitrator(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Participants (comma-separated):</label>
                <input type="text" value={participants} onChange={(e) => setParticipants(e.target.value)} required />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="submit-button">Schedule Session</button>
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionForm;