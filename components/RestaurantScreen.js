import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';

export default function RestaurantScreen() {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude:60.200692,
    longitude:24.934302,
    latitudeDelta:0.0322,
    longitudeDelta:0.0221,
  })

  const [restaurants, setRestaurants] = useState([]);

  const showAddress = () => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=iXufxVGlPgkzr9Q915xPX6orKsNEG9lD'
    fetch(url)
    .then(response => response.json())
    .then(responseData => {
      const lat = responseData.results[0].geometry.location.lat;
      const lon = responseData.results[0].geometry.location.lng;
      setRegion ({
      latitude: lat,
      longitude: lon,
      latitudeDelta:0.0322,
      longitudeDelta:0.0221,
    });
  })
  .then(() => showRestaurants())
  .catch(error => Alert.alert('Error', error));
}

const showRestaurants = () => {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + region.latitude + ',' + region.longitude + '&radius=500&type=restaurant&key=iXufxVGlPgkzr9Q915xPX6orKsNEG9lD'
    fetch(url)
    .then(response => response.json())
    .then(responseData => setRestaurants(responseData.results))
    .catch(error => Alert.alert('Error', error));
}

  return (
    <View style={styles.container} >
      <MapView 
      style={{flex: 5}}
      region = {region} >
        {restaurants.map((marker, index) => (
      <MapView.Marker
          key={index}
          coordinate={{
          latitude: marker.geometry.location.lat, 
          longitude: marker.geometry.location.lng }} 
          title={marker.name}
          description={marker.vicinity}
          />
        ))}
        
      </MapView>
      <View style={styles.container}>
      <TextInput style={{fontSize: 20, hight: 40}} placeholder='Type address'
        onChangeText = {address => setAddress(address)} />
        <Button title="Show" onPress={showAddress} />
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffafa',
  },
    input: {
      flexDirection: 'row',
  },
});