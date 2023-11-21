import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import styles from './welcome.style';
import { COLORS, SIZES } from '../../constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const Welcome = (color, top) => {
    const navigation = useNavigation();
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.welcomeTxt(COLORS.black, SIZES.xSmall)}>Bem-vindo, a</Text>
                    <Text style={styles.welcomeTxt(COLORS.primary, 0)}> Cupkat</Text>
                </View>

                <View style={styles.searchContainer}>
                    <TouchableOpacity>
                        <Feather name="search" size={24} style={styles.searchIcon} />
                    </TouchableOpacity>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            style={styles.searchInput}
                            value=""
                            onPressIn={()=>navigation.navigate("Pesquisar")}
                        placeholder="O que você está procurando"
                    />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
}

export default Welcome