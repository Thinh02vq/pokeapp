import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === email && user.password === password) {
          navigation.replace('Main');
        } else {
          alert('Sai email hoặc mật khẩu');
        }
      } else {
        alert('Không tìm thấy tài khoản. Vui lòng đăng ký.');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user');
      navigation.replace(user ? 'Main' : 'Login');
    };

    
  }, []);

  return (
    <ImageBackground 
            source={require("../assets/pokeball.png")} 
            style={styles.background}
            imageStyle={{ opacity: 0.15 }}
          >
    <View style={styles.overlay}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Mật khẩu" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Chưa có tài khoản? Đăng ký
      </Text>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // nền trắng nhẹ giúp nội dung nổi bật, ảnh nền vẫn rõ
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  overlay: {
    flex: 1,
    
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 8, backgroundColor: '#fff' },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});
