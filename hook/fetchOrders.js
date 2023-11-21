import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoader(true);
    
    try {
      const token = await AsyncStorage.getItem('token');
      const endpoint = 'https://api-gq7y.onrender.com/api/orders';

      const headers = {
        'Content-Type': 'application/json',
        'token': 'Bearer ' + JSON.parse(token)
      };

      const response = await axios.get(endpoint, { headers });
      
      setData(response.data);
      
      setLoader(false);
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

export default fetchOrders;
