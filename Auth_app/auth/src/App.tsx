import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Router} from './routes/Router';
import {AppwriteProvider} from './appwrite/AppwriteContext';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000); // Hides splash after 2 sec
  }, []);
  return (
    <AppwriteProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </AppwriteProvider>
  );
}
