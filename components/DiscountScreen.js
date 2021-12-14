import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet, Image, View, Text, TextInput, Button } from 'react-native';

export default function DiscountScreen() {
  const[price, setPrice] = useState('');
  const[discount, setDiscount] = useState('');
  const[result, setResult] = useState(0);

  const calcDiscount = () => {
    setResult(parseFloat(price) * (parseFloat(discount)/100));
  }

  return (
    <View style={styles.container}>
    <Image
        style={{width:100, height:100 }}
        source={{ uri: 'https://freedesignfile.com/upload/2019/06/Cartoon-sale-discount-illustration-vector.jpg'}}
    />      
      <View style={styles.container}>

      <Text style={{fontSize: 20}}>Price, euro</Text>
      <TextInput
        keyboardType ="numeric"
        style={{fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={price => setPrice(price)}
        value={String(price)}
      />

      <Text style={{fontSize: 20}}>Discount, %</Text>
      <TextInput
        keyboardType ="numeric"
        style={{fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={discount => setDiscount(discount)}
        value={String(discount)}
      />

      <Text style={{fontSize: 20}}>Result: {result.toFixed(2)}</Text>
      <View style={styles.buttoncontainer}>
      <Button onPress={calcDiscount} title=" Discount "/>      
        
      </View>
      </View>
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
    flex: 2,
    height: 150,
    flexDirection: 'row',
    backgroundColor: '#fffafa',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});
