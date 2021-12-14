import React, { useState } from 'react';
import MapView, { Marker} from 'react-native-maps';
import { StyleSheet, TextInput, Button, View, Text, Dimensions } from 'react-native';

export default function MapScreen() {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude:60.200692,
    longitude:24.934302,
    latitudeDelta:0.0222,
    longitudeDelta:0.0121,
  })

  const showAddress = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=iXufxVGlPgkzr9Q915xPX6orKsNEG9lD&location=' + address
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
      <View>
      <MapView 
      style={styles.map}
      region = {region} >
      <Marker
          coordinate={{
          latitude: region.latitude, 
          longitude: region.longitude }} 
          title = 'You are here'/>
      </MapView>
    </View>

      <TextInput style={{fontSize: 20, hight: 40}} placeholder='Type address'
        onChangeText = {address => setAddress(address)} />  
      <Button title="Show" onPress={showAddress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
