import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import style from './profile.style';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from "../constants";
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true); // Corrigido aqui
      } else {
         navigation.navigate('Login');
      }

    } catch (error) {
      console.log("Error retrieving the data:", error);
    }
  };

  const userLogout = async()=>{
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userId, 'id']);
      navigation.replace('Bottom Navigation')
    } catch (error) {
      console.log("Erro ao fazer logout", error);
    }
  };

  const lougout = () => {
    Alert.alert(
      "Logout",
      "Tem certeza de que quer sair?",
      [
        {
          text: "Cancel", onPress: () => console.log("cancel pressed")
        },
        {
          text: "Continue", onPress: () => userLogout()
        },
        { defaultIndex: 1 }
      ]
    )
  }

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Tem certeza de que quer deletar dados salvos do seu dispositivo?",
      [
        {
          text: "Cancel", onPress: () => console.log("cancel pressed")
        },
        {
          text: "Continue", onPress: () => console.log("clear cache pressed")
        },
        { defaultIndex: 1 }
      ]
    )
  }

  const deleteUser = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const userId = `${JSON.parse(id)}`;
      const apiUrl = `https://api-gq7y.onrender.com/api/users/${userId}`;
  
      const response = await axios.delete(apiUrl);
  
      if (response.status === 200) {
        userLogout();
        console.log('Usuário excluído com sucesso');

        navigation.replace('Bottom Navigation')
        // Adicione a lógica para mostrar uma mensagem de sucesso aqui
        Alert.alert("Sucesso", "Usuário excluído com sucesso");
  
      } else {
        console.log('Erro ao excluir usuário:', response.status);
        // Adicione a lógica para mostrar uma mensagem de erro aqui
        Alert.alert("Erro", "Erro ao excluir usuário");
      }
    } catch (error) {
      console.log('Erro na solicitação de exclusão:', error);
      // Adicione a lógica para mostrar uma mensagem de erro aqui
      Alert.alert("Erro", "Erro na solicitação de exclusão");
    }
  };
  
  const deleteAccount = () => {
    Alert.alert(
      "Excluir conta",
      "Tem certeza de que deseja excluir a sua conta?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("cancel pressed"),
          style: "cancel" // Esta opção faz com que o botão tenha um estilo de cancelamento
        },
        {
          text: "Continue",
          onPress: () => deleteUser()
        }
      ],
      { cancelable: false } // Esta opção impede que o Alert seja fechado tocando fora dele ou pressionando o botão de voltar
    );
  };
  





  return (
    <View style={style.container}>
      <View style={style.container}>
        <StatusBar backgroundColor={COLORS.gray} />

        <View style={{ width: '100%' }}>
          <Image
            source={require('../assets/images/space.jpg')}
            style={style.cover}
          />
        </View>

        <View style={style.profileContainer}>
          <Image
            source={require('../assets/images/profile.jpeg')}
            style={style.profile}
          />
          <Text style={style.name}>
            {userLogin === true ? userData.username : "Realize o login na sua conta"}
          </Text>

          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={style.loginBtn}>
                <Text style={style.menuText}>L O G I N      </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={style.loginBtn}>
              <Text style={style.menuText}>{userData.email}    </Text>
            </View>
          )}


          {userLogin === false ? (
            <View>
            </View>
          ) : (
            <View style={style.menuWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Favoritos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Pedidos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={style.menuItem(0.3)}>
                  <SimpleLineIcons
                    name="bag"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Carrinho</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => clearCache()}>
                <View style={style.menuItem(0.3)}>
                  <MaterialCommunityIcons
                    name="cached"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Limpar cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={style.menuItem(0.3)}>
                  <AntDesign
                    name="deleteuser"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Excluir Conta</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => lougout()}>
                <View style={style.menuItem(0.3)}>
                  <AntDesign
                    name="logout"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Sair</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

        </View>

      </View>

    </View>
  )

}

export default Profile

const styles = StyleSheet.create({})