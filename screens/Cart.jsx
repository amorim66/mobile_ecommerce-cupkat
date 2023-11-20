import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './cart.style'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SHADOWS, SIZES } from "../constants";
import fetchCart from '../hook/fetchCart';
import { FlatList } from 'react-native-gesture-handler';
import CartTile from '../components/cart/cartTile';
import { Button } from '../components';


const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  useEffect(() => {
    console.log("Selected item:", selectedItem);
  }, [selectedItem]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.titleTxt}>Carrinho</Text>
      </View>

      {loading ? (<ActivityIndicator />)
        : (<FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>
            <CartTile
              item={item}
              onPress={() => handleItemPress(item)}
              isSelected={selectedItem === item}
            />
          }
        />)}

      {selectedItem !== null && (
        <Button title={'Pedido'} loader={false}
         isValid={selectedItem}
         onPress={()=> {}}
         />
      )}

    </SafeAreaView>
  );
};

export default Cart;
