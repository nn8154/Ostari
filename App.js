import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text } from 'react-native';

import ShoppingScreen from './components/ShoppingScreen';
import CalculatorScreen from './components/CalculatorScreen';
import MapScreen from './components/MapScreen';
import RestaurantScreen from './components/RestaurantScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({ 
        tabBarIcon: ({ focused, color, size }) => { 

          let iconName;

          if (route.name === 'Shopping List') {
            iconName = 'md-list';
          } else if (route.name === 'Calculator') {
            iconName = 'md-calculator';
          } else if (route.name === 'Map') {
            iconName = 'md-map';
          } else if (route.name === 'Restaurants') {
            iconName = 'md-map';
          }
      return <Ionicons name={iconName} size={size} color={color} />; 
    },
    })}>
      <Tab.Screen name="Shopping List" component={ShoppingScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}