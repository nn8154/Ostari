import * as React from 'react';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function DistanceScreen() {
  const [pin, setPin] = React.useState({
    latitude: 60.200692,
    longitude: 24.934302,
  })
  const [region, setRegion] = React.useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  })

  return (
    <View style={styles.container}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails = {true}
      GooglePlacesSearchQuery = {{
        rankby: 'distance'
      }}
        onPress={(data, details = null) => {
        console.log(data, details);
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        })
      }}
      query={{
        key: 'iXufxVGlPgkzr9Q915xPX6orKsNEG9lD',
        language: 'en',
        components: "country: fin",
        types: "establishment",
        radius: 30000,
        location: `${region.latitude}, ${region.longitude}`
      }}
      styles = {{
        container:{ flex: 0, position: "absolute", width: "100%", zIndex: 1 },
        listView:{ blackgroundColor: "white" }
      }}
    />
      <MapView style={styles.map} 
        initialRegion = {{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
        provider = "google"
      >
      <Marker coordinate = {{latitude: region.latitude, longitude: region.longitude}}/>
      <Marker
        coordinate = {pin}
        draggable = {true}
        onDragStart = {(e) => {
          console.log("Drag start", e.nativeEvent.coordinates)
        }}
        onDragEnd = {(e) => {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }}
        >
        <Callout>
          <Text>You're here</Text>
        </Callout>
      </Marker>

      <Circle center = {{
            latitude: 60.200692,
            longitude: 24.934302}}
            radius = {100} />
      </MapView>
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