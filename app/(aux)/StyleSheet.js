import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ButtonFontSize = 16;
const HeaderFontSize = 10;
const NormalFontSize = 20;
const HintFontSize = 24;
const SmallerHeaderFontSize = 12;
buttonText = width / ButtonFontSize;
headerText = width / HeaderFontSize;
normalText = width / NormalFontSize;
hintText = width / HintFontSize;
SmallHeadText = width / SmallerHeaderFontSize;
//let insets = useSafeAreaInsets();

const styles = StyleSheet.create({
    // Colors go from lightest to darkest
    colors: {
        lightColor: "#F9F7F7",
        lightAccentColor: "#DBE2EF",
        darkAccentColor: "#3F72AF",
        darkColor: "#112D4E",
    },
    boldtext: { fontSize: normalText, fontWeight: "bold" },
    normaltext: { fontSize: normalText },
    SmallerHeaderFontSize: { fontSize: SmallHeadText, color: "#F9F7F7" },

    background: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F9F7F7",
    },

    forms: {
        width: "80%",
    },

    // loginBtn: {
    //     width: "80%",
    //     borderRadius: 25, //was 25
    //     height: "7%", //was 50
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: "12%", //was 40
    //     backgroundColor: "#3F72AF",
    // },

    deleteBtn: {
        width: "80%",
        borderRadius: 25, //was 25
        height: "7%", //was 50
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#F30000",
        marginBottom: "50%",
    },
    buttonText: {
        color: "#F9F7F7",
        fontSize: buttonText,
        fontWeight: "bold",
    },
    chatHeader: {
        // paddingTop: "10%",
        margin: "15%",
        fontWeight: "bold",
        fontSize: SmallHeadText,
        alignContent: "center",
        textAlign: "center",
    },
    container: {
        marginTop: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    createUserInput: {
        marginBottom: "6%", //was 20
        borderWidth: 1, //was 1
        borderRadius: 10,
        fontSize: normalText,
        //was 7
        paddingTop: "2%", //was 7
        paddingBottom: "2%", //was 7
        paddingLeft: "6%",
        backgroundColor: "white",
        borderColor: "#B3B3B3",
    },

    createUserInputError: {
        marginBottom: "6%", //was 20
        borderWidth: 1, //was 1
        borderRadius: 20,
        fontSize: normalText,
        paddingTop: "2%", //was 7
        paddingBottom: "2%", //was 7
        paddingLeft: "6%",
        backgroundColor: "white",
        borderColor: "red",
    },
    postListingHeader: {
        paddingTop: "0%",
        //was 20
        fontWeight: "bold",

        alignContent: "center",
        textAlign: "center",
        fontSize: SmallHeadText,
    },
    dropdownlists: {
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#B3B3B3",
        marginBottom: "6%",
        height: 40,
    },
    postListingDescription: {
        height: "20%",
        //was 20
        borderWidth: 1, //was 1
        borderRadius: 20,
        fontSize: normalText,
        paddingTop: "2%", //was 7
        paddingBottom: "2%", //was 7
        paddingLeft: "6%",
        paddingRight: "6%",
        backgroundColor: "white",
        borderColor: "#B3B3B3",
        marginBottom: "-3%",
    },
    postListingDescriptionError: {
        height: "20%",
        //was 20
        paddingRight: "6%",
        paddingLeft: "6%",
        borderWidth: 1, //was 1
        borderRadius: 20,
        fontSize: normalText,
        paddingTop: "2%", //was 7
        paddingBottom: "2%", //was 7
        backgroundColor: "white",
        borderColor: "red",
        marginBottom: "-3%",
    },
    dropDownListsError: {
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "red",
        paddingTop: "2%", //was 7
        paddingBottom: "2%", //was 7
        paddingLeft: "6%",
        marginBottom: "6%",
    },
    loginHeader: {
        //paddingTop: "45%",
        margin: "5%",
        fontWeight: "bold",
        fontSize: headerText,
        alignContent: "center",
        textAlign: "center",
    },
    registerHeader: {
        marginBottom: "2%", //was 20
        fontWeight: "bold",
        fontSize: headerText,
        alignContent: "center",
        textAlign: "center",
    },
    resetHeader: {
        paddingTop: "35%",
        margin: "15%", //was 20
        fontWeight: "bold",
        fontSize: headerText,
        alignContent: "center",
        textAlign: "center",
    },
    button: {
        textAlign: "center",
    },
    notUserButton: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "2%",
    },
    notUserButtonText: {
        fontSize: hintText,
    },
    dividerLine: {
        backgroundColor: "#B3B3B3",
        height: 1,
        width: "90%",
        marginBottom: 25,
        marginTop: 0,
    },

    searchContainer: {
        backgroundColor: "transparent",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        justifyContent: "center",
    },
});
export default styles;
