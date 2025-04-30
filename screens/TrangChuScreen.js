// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function TrangChuScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://assets.pokemon.com/static2/_ui/img/chrome/external_link_bumper.png' }}
        style={styles.banner}
      />

      <Text style={styles.sectionTitle}>Featured Pokémon</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
        {[1, 4, 7, 25, 150].map((id) => (
          <TouchableOpacity
            key={id}
            style={styles.featuredCard}
            onPress={() => navigation.navigate('Detail', { name: id.toString() })}>
            <Image
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
              style={styles.featuredImage}
            />
            <Text style={styles.featuredText}>#{id}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Explore More</Text>
      <View style={styles.grid}>
        {[10, 25, 39, 52, 63, 92].map((id) => (
          <TouchableOpacity
            key={id}
            style={styles.gridCard}
            onPress={() => navigation.navigate('Detail', { name: id.toString() })}>
            <Image
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
              style={styles.gridImage}
            />
            <Text style={styles.gridText}>#{id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
  },
  banner: {
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  featuredCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  featuredImage: {
    width: 100,
    height: 100,
  },
  featuredText: {
    marginTop: 4,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
  gridImage: {
    width: 80,
    height: 80,
  },
  gridText: {
    marginTop: 4,
    fontSize: 14,
  },
});
