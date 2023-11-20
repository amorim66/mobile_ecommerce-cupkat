import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'

const BackBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backbtn}>
        <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
        />
    </TouchableOpacity>
  )
}

export default BackBtn

const styles = StyleSheet.create({
    backbtn: {
        top: SIZES.large-10
    }
})
