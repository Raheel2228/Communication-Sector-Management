import React, { useEffect } from 'react';
import { Dashboard } from 'layouts';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = `Service Appointment`;
  });
  return (
    <Dashboard>
      <h1 style={{ margin: '30px' }}>Access Denied</h1>
    </Dashboard>
  );
};

export default Home;
