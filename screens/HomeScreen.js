import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Dimensions } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { getAllPokemon, getPokemonDetail } from '../utils/api';

const numColumns = 2;

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    getAllPokemon().then(async (list) => {
      const detailedList = await Promise.all(list.map(p => getPokemonDetail(p.name)));
      setPokemonList(detailedList);
      setFilteredList(detailedList);
      setLoading(false);
    });
  }, []);

  const handleSearch = (text) => {
    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(text.toLowerCase()) &&
      (selectedType === 'all' || pokemon.types.some(t => t.type.name === selectedType))
    );
    setFilteredList(filtered);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    const filtered = pokemonList.filter(pokemon =>
      (type === 'all' || pokemon.types.some(t => t.type.name === type))
    );
    setFilteredList(filtered);
  };

  const types = ['all', 'grass', 'fire', 'water', 'bug', 'normal', 'electric', 'poison', 'ground', 'fairy'];

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <View style={styles.typeFilter}>
        {types.map(type => (
          <Text
            key={type}
            onPress={() => handleTypeFilter(type)}
            style={[styles.typeButton, selectedType === type && styles.selectedType]}
          >
            {type.toUpperCase()}
          </Text>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          key={numColumns.toString()} // fix cảnh báo thay đổi numColumns
          data={filteredList}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} onPress={() => navigation.navigate('Detail', { name: item.name })} />
          )}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  typeFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  typeButton: {
    margin: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  selectedType: {
    backgroundColor: '#add8e6',
  },
  grid: {
    paddingHorizontal: 8,
  },
});