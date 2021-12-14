import React, {useState} from 'react';
import {StyleSheet, TextInput, Button, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude:60.200692,
    longitude:24.934302,
    latitudeDelta:0.0222,
    longitudeDelta:0.0121,
  })

  const showAddress = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=AIzaSyCkQUEr8UCmWT-YKlnINZAdD2qcV3w7bos&location=' + address
    fetch(url)
    .then(response => response.json())
    .then(responseData => {
      setRegion ({
      ...region,
      latitude: responseData.results[0].locations[0].latLng.lat,
      longitude: responseData.results[0].locations[0].latLng.lng,
    });
  })
}

  return (
    <View style={styles.container}>
    <MapView 
      style={{flex: 5}}
      region = {region} >
        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude }} />
    </MapView>
      <TextInput style={{fontSize: 20, hight: 40}} placeholder='Type address'
        onChangeText = {address => setAddress(address)} />  
      <Button title="Show" onPress={showAddress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
