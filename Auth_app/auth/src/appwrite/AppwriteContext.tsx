import React, {FC, createContext, useState, useContext} from 'react';
import AppwriteService from './service';
import {PropsWithChildren} from 'react';

type AppContextType = {
  appwrite: AppwriteService;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

// Create context without a default value
export const AppwriteContext = createContext<AppContextType | undefined>(
  undefined,
);

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const appwrite = new AppwriteService(); // Ensure a single instance

  return (
    <AppwriteContext.Provider value={{appwrite, isLoggedIn, setIsLoggedIn}}>
      {children}
    </AppwriteContext.Provider>
  );
};

// Custom hook to safely use context
export const useAppwrite = () => {
  const context = useContext(AppwriteContext);
  if (!context) {
    throw new Error('useAppwrite must be used within an AppwriteProvider');
  }
  return context;
};

export default AppwriteContext;
