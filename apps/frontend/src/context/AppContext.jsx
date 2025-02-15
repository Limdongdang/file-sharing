import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [sidebarEvent, setSidebarEvent] = useState(null);

  return (
    <AppContext.Provider value={{ sidebarEvent, setSidebarEvent }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };