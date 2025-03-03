import React from 'react';
import {SafeAreaView} from 'react-native';
import CurrencyConverter from './components/CurrencyCOnverter';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CurrencyConverter />
    </SafeAreaView>
  );
};

export default App;
