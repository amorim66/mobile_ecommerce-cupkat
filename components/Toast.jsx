import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Toast = ({ message }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 10,
    zIndex:1
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Toast;
