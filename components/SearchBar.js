import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default function SearchBar({ onSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Pokémon..."
        onChangeText={onSearch}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
});