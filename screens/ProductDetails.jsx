import { View, TouchableOpacity, Image, Text, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons"
import styles from './productDetails.style'
import { COLORS, SIZES } from '../constants'
import { ScrollView } from 'react-native-gesture-handler'
import addToCart from '../hook/addToCart'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from '../components/Toast'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

const ProductDetails = ({ navigation }) => {
    const route = useRoute();
    const { item } = route.params;
    const [count, setCount] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favorites, setFavorites] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    useEffect(() => {
        checkUser();
        checkFavorites();
    }, [])

    const checkUser = async () => {
        try {
            const id = AsyncStorage.getItem('id');
            if (id !== null) {
                setIsLoggedIn(true)
                console.log(isLoggedIn);

            } else {
                console.log('Usuário não logado');
            }
        } catch (error) {

        }
    };

    const createCheckOut = async () => {
        const id = await AsyncStorage.getItem('id')

        const response = await fetch('https://stripe-production-e5fe.up.railway.app/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: JSON.parse(id),
                cartItems: [
                    {
                        name: item.title,
                        id: item._id,
                        price: item.price,
                        cartQuantity: count,
                    }
                    
                ]
            })
        });

        const responseBody = await response.text();
        console.log(responseBody);

        const { url } = await response.json();
        setPaymentUrl(url)
    };

    const onNavigationStateChange = (webViewState) => {
        const { url } = webViewState;

        if (url && url.includes('checkout-success')) {
            navigation.navigate("Orders")
        } else if (url && url.include('cancel')) {
            navigation.goBack();
        }
    };

    const addToFavorites = async () => {
        const id = await AsyncStorage.getItem('id');
        const favoritesId = `favorites${JSON.parse(id)}`;

        let productId = item._id;
        let productObj = {
            title: item.title,
            id: item._id,
            supplier: item.supplier,
            imageUrl: item.imageUrl,
            product_location: item.product_location,
            price: item.price,
        };

        try {
            const existingItem = await AsyncStorage.getItem(favoritesId);
            let favoritesObj = existingItem ? JSON.parse(existingItem) : {};


            if (favoritesObj[productId]) {
                delete favoritesObj[productId];
                console.log("deleted");
                setFavorites(false);
                showToast(`O produto ${item.title} foi removido dos favoritos.`);
            } else {
                favoritesObj[productId] = productObj;
                console.log("added to fav");
                setFavorites(true);
                showToast(`O produto ${item.title} foi adicionado aos favoritos.`);
            }

            await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
        } catch (error) {
            console.log(error);
        }
    };

    const showToast = (message) => {
        setToastMessage(message);
        console.log(toastMessage);
        setTimeout(() => {
            setToastMessage(null); // Limpa a mensagem após algum tempo
        }, 3000);
    };

    const checkFavorites = async () => {
        const id = await AsyncStorage.getItem("id");
        const favoritesId = `favorites${JSON.parse(id)}`;

        console.log(favoritesId);

        try {
            const favoritesObj = await AsyncStorage.getItem(favoritesId);
            if (favoritesObj !== null) {
                const favorites = JSON.parse(favoritesObj);

                if (favorites[item._id]) {
                    console.log(item._id);
                    setFavorites(true)
                }

            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePress = () => {
        if (!isLoggedIn) {
            navigation.navigate('Login')
        } else {
            addToFavorites();
        }
    };

    const handleBuy = () => {
        if (!isLoggedIn) {
            navigation.navigate('Login')
        } else {
            createCheckOut();
        }
    };

    const handleCart = () => {
        if (!isLoggedIn) {
            navigation.navigate('Login')
        } else {
            addToCart(item._id, count)
        }
    };



    return (
        <ScrollView>
            <View style={styles.container}>
                {paymentUrl ? (
                    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                        <WebView
                            source={{ uri: paymentUrl }}
                            onNavigationStateChange={onNavigationStateChange}
                        />
                    </SafeAreaView>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.container}>

                            {toastMessage && <Toast message={toastMessage} />}
                            <View style={styles.upperRow}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name='chevron-back-circle' size={30} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handlePress()}
                                >
                                    <Ionicons name={favorites ? 'heart' : 'heart-outline'} size={30} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>

                            <Image
                                source={{ uri: item.imageUrl }}
                                style={styles.image}
                            />

                            <View style={styles.details}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <View style={styles.priceWrapper}>
                                        <Text style={styles.price}>R$ {item.price}</Text>
                                    </View>
                                </View>

                                <View style={styles.ratingRow}>
                                    <View style={styles.rating}>
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <Ionicons
                                                key={index}
                                                name='star'
                                                size={24}
                                                color="gold"
                                            />
                                        ))}

                                        <Text style={styles.ratingText}> (4.9)</Text>
                                    </View>

                                    <View style={styles.rating}>
                                        <TouchableOpacity onPress={() => increment()}>
                                            <SimpleLineIcons
                                                name='plus' size={20}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.ratingText}>{count}</Text>

                                        <TouchableOpacity onPress={() => decrement()}>
                                            <SimpleLineIcons
                                                name='minus' size={20}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={styles.descriptionWrapper}>
                                    <Text style={styles.description}> Description</Text>
                                    <Text style={styles.descText}>{item.description}</Text>
                                </View>

                                <View style={{ marginBottom: SIZES.small }}>
                                    <View style={styles.location}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Ionicons name='location-outline' size={20} />
                                            <Text>  {item.product_location} </Text>
                                        </View>

                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name='truck-delivery-outline' size={20} />
                                            <Text> Free Delivery </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cartRow}>
                                    <TouchableOpacity onPress={() => handleBuy()}
                                        style={styles.cartBtn}>
                                        <Text style={styles.carTitle}>BUY NOW</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => handleCart()}

                                        style={styles.addCart}>

                                        <Fontisto name='shopping-bag' size={22} color={COLORS.lightWhite} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default ProductDetails