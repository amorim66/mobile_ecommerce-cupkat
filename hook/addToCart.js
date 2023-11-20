import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



const addToCart = async(productId, quantity) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const endpoint = 'https://api-gq7y.onrender.com/api/carts';
        console.log(token);
        const data = {
            cartItem: productId,
            quantity: quantity
        }

        const headers = {
            'Content-Type': 'application/json',
            'token': 'Bearer '+ JSON.parse(token)
        };


        await axios.post(endpoint, data, {headers})

    } catch (error) {
        throw new Error(error.message)
    }
};

export default addToCart;