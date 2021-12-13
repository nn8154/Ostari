import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppingdb.db');

export default function DBScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists items (id integer primary key not null, amount text, description text);');
    });
    updateList();    
  }, []);

  // Save course
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into items (amount, description) values (?, ?);', [amount, description]);    
      }, null, updateList
    )
  }

  // Update courselist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from items;', [], (_, { rows }) => {
        setItems(rows._array);
        setAmount('');
        setDescription('');
      }); 
    });
  }

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from items where id = ?;', [id]);
      }, null, updateList
    )    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
    <Image
        style={{width:100, height:100 }}
        source={{uri: 'https://image.shutterstock.com/image-vector/shop-front-view-city-design-260nw-1065654218.jpg'}}
    />       
      <TextInput placeholder='Product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={description => setDescription(description)}
        value={description}/>  
      <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>      
      <Button onPress={saveItem} title="Save" /> 
      <Text style={{marginTop: 30, fontSize: 20}}>Shopping List</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => 
        <View style={styles.listcontainer}>
          <Text style={{fontSize: 18}}>{item.description}, {item.amount}</Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> Done</Text>
        </View>} 
        data={items} 
        ItemSeparatorComponent={listSeparator} 
      />      
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
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
});