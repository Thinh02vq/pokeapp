import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUser] = useState('');

  const handleRegister = async () => {
    const userData = { username, email, password };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('Đăng ký với:', userData);
      navigation.replace('Login');
    } catch (error) {
      console.error('Lỗi lưu thông tin:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground 
        source={require("../assets/pokeball.png")} 
        style={styles.background}
        imageStyle={{ opacity: 0.15 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Đăng Ký</Text>
          <TextInput placeholder="User" style={styles.input} value={username} onChangeText={setUser} />
          <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput placeholder="Mật khẩu" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
          <Button title="Đăng ký" onPress={handleRegister} />
          <Text onPress={() => navigation.goBack()} style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
