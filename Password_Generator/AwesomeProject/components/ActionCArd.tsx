import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import React from 'react';

export default function ActionCArd() {
  function openwebsite(url: string) {
    Linking.openURL(url);
  }
  return (
    <View>
      <Text>ActionCArd</Text>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => openwebsite('https://www.youtube.com/')}>
            <Text style={styles.Text}>Open Website</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} activeOpacity={0.5}>
            <Text style={styles.Text}>Press Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
