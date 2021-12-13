import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet, Image, View, Text, TextInput, Button } from 'react-native';

export default function CalculatorScreen() {
  const[numA, setNumA] = useState('');
  const[numB, setNumB] = useState('');
  const[result, setResult] = useState(0);

  const calcSum = () => {
    setResult(parseFloat(numA) + parseFloat(numB));
  }

  const calcSub = () => {
    setResult(parseFloat(numA) - parseFloat(numB));
  }

  const calcMul = () => {
    setResult(parseFloat(numA) * parseFloat(numB));
  }  

  const calcDiv = () => {
    setResult(parseFloat(numA) / parseFloat(numB));
  } 


  return (
    <View style={styles.container}>
    <Image
        style={{width:100, height:100 }}
        source={{ uri: 'https://cdn2.vectorstock.com/i/1000x1000/00/41/calculator-icon-cartoon-style-vector-19330041.jpg'}}
    />      
      <View style={styles.container}>
      <Text style={{fontSize: 20}}>Calculator</Text>
      
      <TextInput
        keyboardType ="numeric"
        style={{fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={numA => setNumA(numA)}
        value={String(numA)}
      />

      <TextInput
        keyboardType ="numeric"
        style={{fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={numB => setNumB(numB)}
        value={String(numB)}
      />

      <Text style={{fontSize: 20}}>Result: {result.toFixed(2)}</Text>
      <View style={styles.buttoncontainer}>
        <Button onPress={calcSum} title=" + "/>
        <Button onPress={calcSub} title=" - "/>
        <Button onPress={calcMul} title=" * "/>
        <Button onPress={calcDiv} title=" / "/>
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
