import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function PokemonCard({ pokemon, onPress }) {
  const scaleAnim = new Animated.Value(1);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    checkFavorite();
  }, []);
  const checkFavorite = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    if (stored) {
      const favs = JSON.parse(stored);
      const found = favs.some((p) => p.id === pokemon.id);
      setIsFavorite(found);
    }
  };
  const toggleFavorite = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    let favs = stored ? JSON.parse(stored) : [];

    if (isFavorite) {
      favs = favs.filter((p) => p.id !== pokemon.id);
    } else {
      favs.push(pokemon);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };
  const handlePress = async () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.cardContainer, { transform: [{ scale: scaleAnim }] }]}> 
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite} style={styles.heart}>
        <AntDesign name={isFavorite ? 'heart' : 'hearto'} size={20} color="red" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 6,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
  },
  name: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
