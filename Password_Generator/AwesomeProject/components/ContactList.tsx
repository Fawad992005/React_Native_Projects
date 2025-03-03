import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ContactList() {
  const contacts = [
    {
      id: 1,
      name: 'fawad',
      email: 'fawad995@gmail.com',
    },
    {
      id: 2,
      name: 'fawad',
      email: 'fawad995@gmail.com',
    },
    {
      id: 3,
      name: 'fawad',
      email: 'fawad995@gmail.com',
    },
    {
      id: 4,
      name: 'fawad',
      email: 'fawad995@gmail.com',
    },
  ];
  return (
    <View>
      <Text>ContactList</Text>
      <ScrollView style={styles.container} scrollEnabled={false}>
        {contacts.map(conatct => (
          <View key={conatct.id} style={styles.usercard}>
            <Text style={styles.textColor}>{conatct.name}</Text>
            <Text style={styles.textColor}>{conatct.email}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  usercard: {},
  textColor: {
    color: 'white',
  },
});
