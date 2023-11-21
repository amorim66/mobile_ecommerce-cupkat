import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../screens/cart.style'
import { COLORS } from '../constants';

const OrdersTile = ({ item }) => {
    // Função para traduzir o status de pagamento para português
    const translatePaymentStatus = (status) => {
        return status === 'paid' ? 'Pago' : status;
    };
    return (
        <TouchableOpacity style={styles.favContainer(COLORS.secondary)}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.productId.imageUrl }}
                    style={styles.image}

                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.productTxt} numberOfLines={1}>{item.productId.title}</Text>
                <Text style={styles.supplya} numberOfLines={1}>{item.productId.supplier}</Text>

                <Text style={styles.supplya} numberOfLines={1}>{item.productId.price}</Text>
            </View>

            <View style={styles.orders}>
                {/* Exibe o status de pagamento traduzido */}
                <Text style={styles.productTxt}>{translatePaymentStatus(item.payment_status)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OrdersTile