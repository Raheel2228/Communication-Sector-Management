import React, { useState } from 'react';
import { Header, Sidebar, ContentArea } from 'commons';

const Dashboard: React.FC = ({ children }) => {
  const [minimizedSidebar, setMinimizedSidebar] = useState(true);

  const handleDrawerClose = () => {
    setMinimizedSidebar(!minimizedSidebar);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Header sidebarIsMini={minimizedSidebar} />
      <Sidebar sidebarIsMini={minimizedSidebar} toggleSidebar={handleDrawerClose} />
      <ContentArea>
        <>{children}</>
      </ContentArea>
    </div>
  );
};

export default Dashboard;
