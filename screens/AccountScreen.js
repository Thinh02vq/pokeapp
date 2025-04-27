import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/pokeball.png')}
      style={styles.background}
      imageStyle={{ opacity: 0.15 }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>🌟 Thông Tin Tài Khoản</Text>
        <Text style={styles.info}>👤 Tên đăng nhập: <Text style={styles.highlight}>{user.username}</Text></Text>
        <Text style={styles.info}>📧 Email: <Text style={styles.highlight}>{user.email}</Text></Text>

        <View style={styles.buttonGroup}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Xem Pokémon yêu thích"
              onPress={() => navigation.navigate('FavoritesScreen')}
              color="#1976D2"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Đăng xuất"
              onPress={handleLogout}
              color="#D32F2F"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // nền vàng sáng nhẹ
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF176',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#E53935',
  },
  buttonGroup: {
    marginTop: 20,
    width: '100%',
  },
  buttonWrapper: {
    marginVertical: 6,
  },
});
