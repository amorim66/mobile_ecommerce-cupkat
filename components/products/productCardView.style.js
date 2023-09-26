import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const windowWidth = Dimensions.get('window').width;
const numColumns = 2; // Número de colunas
const cardWidth = (windowWidth - SIZES.xSmall * (numColumns + 1)) / numColumns;

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        height: 220,
        marginHorizontal: SIZES.xSmall - 2,
        marginBottom: 10,
        marginRight: 2,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
    },
    imageContainer: {
        flex: 1,
        width: cardWidth - 10,
        marginLeft: SIZES.small / 2,
        marginTop: SIZES.small / 2,
        borderRadius: SIZES.small,
        overflow: "hidden"
    },
    image: {
        aspectRatio: 1,
        resizeMode: 'cover'
    },
    details: {
        padding: SIZES.small,
    },
    title: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
        marginBottom: 2
    },
    supplier: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        color: COLORS.gray
    },
    price: {
        fontFamily: "bold",
        fontSize: SIZES.small,

    },
    addBtn: {
        position: "absolute",
        bottom: SIZES.xSmall,
        right: SIZES.xSmall,

    }
})

export default styles;