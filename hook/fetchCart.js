import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchCart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoader(true);
    
    try {
      const token = await AsyncStorage.getItem('token');
      const endpoint = 'https://api-gq7y.onrender.com/api/carts/find';

      const headers = {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + JSON.parse(token)
      };

      const response = await axios.get(endpoint, { headers });
      const cart = response.data[0];

      if (cart && cart.products) {
        await AsyncStorage.setItem('cartCount', JSON.stringify(cart.products.length));
        setData(cart.products);
      } else {
        await AsyncStorage.setItem('cartCount', '0');
        setData([]);
      }

    } catch (error) {
      setError(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default fetchCart;
