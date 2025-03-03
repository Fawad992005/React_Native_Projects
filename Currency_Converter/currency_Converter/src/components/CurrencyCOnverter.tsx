import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {getFlagEmoji} from '../CountryCode';

interface ExchangeRatesResponse {
  conversion_rates: {[key: string]: number};
}

const CurrencyConverter: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('PKR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY_Dev = '';
  const API_URL_Dev = `${BASE_URL}/${API_KEY_Dev}/latest/${fromCurrency}`;

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get<ExchangeRatesResponse>(API_URL_Dev);
      setCurrencies(Object.keys(response.data.conversion_rates));
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const convertCurrency = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ExchangeRatesResponse>(API_URL_Dev);
      const rate = response.data.conversion_rates[toCurrency];
      setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
      Snackbar.show({
        text: 'Currency Converted',
        backgroundColor: 'green',
        textColor: '#000000',
      });
    } catch (error) {
      console.error('Error converting currency:', error);
      Snackbar.show({
        text: 'Error converting currency',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Currency Converter</Text>

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>From:</Text>
      <Picker
        selectedValue={fromCurrency}
        onValueChange={setFromCurrency}
        mode="dropdown"
        style={styles.picker}>
        {currencies.map(currency => (
          <Picker.Item
            key={currency}
            label={`${getFlagEmoji(currency)} ${currency}`}
            value={currency}
          />
        ))}
      </Picker>

      <Text style={styles.label}>To:</Text>
      <Picker
        selectedValue={toCurrency}
        onValueChange={setToCurrency}
        mode="dropdown"
        style={styles.picker}>
        {currencies.map(currency => (
          <Picker.Item
            key={currency}
            label={`${getFlagEmoji(currency)} ${currency}`}
            value={currency}
          />
        ))}
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Text style={styles.result}>
          Converted Amount: {convertedAmount} {toCurrency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f8f8f8',
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default CurrencyConverter;
