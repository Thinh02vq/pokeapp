// screens/DetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getPokemonDetail } from '../utils/api';

export default function DetailScreen({ route }) {
  const { pokemon: routePokemon, name } = route.params;
  const [pokemon, setPokemon] = useState(routePokemon || null);

  useEffect(() => {
    if (!routePokemon && name) {
      getPokemonDetail(name).then(setPokemon);
    }
  }, []);

  if (!pokemon) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  const renderStatBar = (label, value) => (
    <View style={styles.statRow} key={label}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${value}%` }]} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.header}>
        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
        <Image source={{ uri: pokemon.sprites.other['official-artwork'].front_default }} style={styles.image} />
        <View style={styles.typeContainer}>
          {pokemon.types.map((t) => (
            <View key={t.type.name} style={[styles.typeBadge, { backgroundColor: getTypeColor(t.type.name) }]}>
              <Text style={styles.typeText}>{t.type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Height: {pokemon.height / 10} m</Text>
        <Text style={styles.infoText}>Weight: {pokemon.weight / 10} kg</Text>
        <Text style={styles.infoText}>Base Experience: {pokemon.base_experience}</Text>
        <Text style={styles.infoText}>Abilities: {pokemon.abilities.map((a) => a.ability.name).join(', ')}</Text>
      </View>

      <Text style={styles.sectionTitle}>Stats</Text>
      <View style={styles.statsBox}>
        {pokemon.stats.map((s) => renderStatBar(s.stat.name, s.base_stat))}
      </View>
    </ScrollView>
  );
}

function getTypeColor(type) {
  const colors = {
    grass: '#78C850',
    poison: '#A040A0',
    fire: '#F08030',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    flying: '#A890F0',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
  };
  return colors[type] || '#aaa';
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  infoBox: {
    marginBottom: 24,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsBox: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    width: 100,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  barFill: {
    height: 8,
    backgroundColor: '#4CAF50',
  },
  statValue: {
    width: 40,
    textAlign: 'right',
  },
});