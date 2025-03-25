import React, {useEffect, useState} from 'react';
import {useAppwrite} from '../appwrite/AppwriteContext';
import Loading from '../components/Loading';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';

export const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {appwrite, isLoggedIn, setIsLoggedIn} = useAppwrite();

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false);
        setIsLoggedIn(!!response);
      })
      .catch(() => {
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return isLoggedIn ? <AppStack /> : <AuthStack />;
};
