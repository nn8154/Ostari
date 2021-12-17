import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text } from 'react-native';

import ShoppingScreen from './components/ShoppingScreen';
import CalculatorScreen from './components/CalculatorScreen';
import DiscountScreen from './components/DiscountScreen';
import MapScreen from './components/MapScreen';
import DistanceScreen from './components/DistanceScreen';
import RestaurantScreen from './components/RestaurantScreen';
import AppleScreen from './components/AppleScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({ 
        tabBarIcon: ({focused, color, size}) => { 

          let iconName;

          if (route.name === 'Shopping List') {
            iconName = 'md-list';
          } else if (route.name === 'Calculator') {
            iconName = 'md-calculator';
          } else if (route.name === 'Discount') {
            iconName = 'aperture-outline';
          } else if (route.name === 'Map') {
            iconName = 'md-map';
          } else if (route.name === 'Distance') {
            iconName = 'flag-outline';
          } else if (route.name === 'Restaurants') {
            iconName = 'fast-food-outline';
          } else if (route.name === 'Apple') {
            iconName = 'nutrition-outline';
          } 
          return <Ionicons name={iconName} size={size} color={color} />; 
          },
        })}>
        <Tab.Screen name="Shopping List" component={ShoppingScreen} />
        <Tab.Screen name="Calculator" component={CalculatorScreen} />
        <Tab.Screen name="Discount" component={DiscountScreen} />      
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Distance" component={DistanceScreen} />       
        <Tab.Screen name="Restaurants" component={RestaurantScreen} />
        <Tab.Screen name="Apple" component={AppleScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}