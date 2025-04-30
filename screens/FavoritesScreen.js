// screens/FavoritesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokemonDetail } from '../utils/api';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      const parsed = stored ? JSON.parse(stored) : [];

      const detailed = await Promise.all(
        parsed.map((item) => getPokemonDetail(item.name || item.id))
      );

      setFavorites(detailed);
    } catch (err) {
      console.error('Lỗi khi load favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { pokemon: item })}>
      <Image
        source={{ uri: item.sprites.other['official-artwork'].front_default }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f44336" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có Pokémon yêu thích.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
