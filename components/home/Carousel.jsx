import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { COLORS } from "../../constants/index";

const Carousel = () => {
    const slides = [
        "https://firebasestorage.googleapis.com/v0/b/cupkat-mobile-multi-store.appspot.com/o/Banners%2Fbanner1.jpg?alt=media&token=ecbc9282-d54e-41bd-9ebb-dac38cae1be4",
        "https://firebasestorage.googleapis.com/v0/b/cupkat-mobile-multi-store.appspot.com/o/Banners%2Fbanner2.jpg?alt=media&token=88d403c7-db89-42d9-9065-e9d5545ea267",
        "https://d326fntlu7tb1e.cloudfront.net/uploads/5d445b91-c01a-4564-8ff8-c27c2b88ea5b-fn7.png",
    ]
    return (
        <View styles={styles.carouselContainer}>
            <SliderBox images={slides}
                dotColor={COLORS.primary}
                inactiveDotColor={COLORS.secondary}
                ImageComponentStyle={{ borderRadius: 15, width: "95%", marginTop: 15 }}
                autoplay
                circleLoop
            />
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        aligntItems: "center"
    }
})