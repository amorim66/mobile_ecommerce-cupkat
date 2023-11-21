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

  const deleteCartItem = async (item) => {
    try {
      // Faça a chamada à API para excluir o item do carrinho
      const response = await fetch(`https://api-gq7y.onrender.com/api/carts/${item._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Inclua quaisquer cabeçalhos adicionais necessários, como tokens de autenticação
        },
      });

      if (response.ok) {
        console.log(`Item do carrinho excluído com sucesso: ${item._id}`);
        // Atualize os dados chamando refetch ou outra lógica adequada
        refetch();
      } else {
        console.error('Erro ao excluir item do carrinho:', response.status, response.statusText);
        // Lidere com o erro, exiba uma mensagem de erro ao usuário, se necessário
      }
    } catch (error) {
      console.error('Erro ao excluir item do carrinho:', error);
      // Lidere com o erro, exiba uma mensagem de erro ao usuário, se necessário
    }
  };

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
          <CartTile item={item} onPress={() => handleItemPress(item)} onDelete={() => deleteCartItem(item)} isSelected={selectedItem === item} />
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
