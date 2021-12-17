import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Alert, StyleSheet, View, Text, Button, TextInput, FlatList, Image } from 'react-native';

export default function AppleScreen() {
  const [ing, setIng] = useState('');
  const [apple, setApple] = useState([]);

const getApple = () => {
  fetch(`https://fineli.fi/fineli/api/v1/foods?q=${ing}`)
  .then(response => response.json())
  .then(responseJson => setApple(responseJson.data))
  .catch((error) => {
    Alert.alert('Error', error);
  });
}

const listSeparator = () => {
  return (
    <View
    style = {{
      height: 5,
      width: "80%",
      backgroundColor: '#fffafa',
      marginLeft: "10%"
    }} />
  );
};

return (
  <View style={styles.container}>
    <StatusBar hidden = {true} /> 
    <FlatList
      style={{marginLeft: "5%"}}
      keyExtractor={(item, index) => index.toString()} 
      renderItem={({item}) =>
      <View>
        <Text style={{fontSize:20}}>{item.data.name}</Text>
      </View> }

      data={apple}
      ItemSeparatorComponent={listSeparator} />
      <TextInput style={{fontSize: 20, width: 200}} placeholder='ingredients'
        onChangeText = {ing => setIng(ing)} />
      <Button title="Find" onPress={getApple} />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffafa',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttoncontainer: {
    flex: 1,
    height: 120,
    flexDirection: 'row',
    backgroundColor: '#fffafa',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  listcontainer: {
    flex: 4,
    backgroundColor: '#fffafa',
    alignItems: 'center',
    justifyContent: 'center',
  },

});