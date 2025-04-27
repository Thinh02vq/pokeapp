// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SplashScreen from './screens/SplashScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import TrangChuScreen from './screens/TrangChuScreen'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';
import { AntDesign } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Trang Chủ') {
            iconName = 'home';
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'Tìm Kiếm') {
            iconName = 'search1'; // bạn có thể đổi sang 'login' hoặc bất kỳ icon nào hợp lý
            return <AntDesign name={iconName} size={size} color={color} />;
          }
          
          else if (route.name === 'Tài Khoản') {
            iconName = 'user';
            return <AntDesign name={iconName} size={size} color={color} />;
          } 

          return null;
        },
        tabBarActiveTintColor: '#f44336',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Trang Chủ" component={TrangChuScreen} />
      <Tab.Screen name="Tìm Kiếm" component={HomeScreen} />
      <Tab.Screen name="Tài Khoản" component={AccountScreen} options={{headerShown:false}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
       
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ 
            headerShown: true,
            title: 'Chi tiết Pokémon',
            animation: 'slide_from_right'
          }} 
        />

        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ title: 'Pokémon Yêu thích' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
