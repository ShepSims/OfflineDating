import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from "../../config/colors";
import images from "../../config/images";
import Button from '../../components/general/Button';

function WelcomeScreen(props) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground source={images.welcome} style={styles.bgImg}>
                {/* StreetsMart Logo */}
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={images.fullLogo} />
                </View>
                <View style={styles.btnContainer}>
                    {/* Login Button */}
                    <Button
                        label={'Login'}
                        color={colors.orange}
                        size={'medium'}
                        onPress={() => navigation.navigate('Login')}
                    />

                    <View style={{ padding: 7 }} />

                    {/* Register Button */}
                    <Button
                        label={'Register'}
                        color={colors.teal}
                        size={'medium'}
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    bgImg: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        backgroundColor: colors.light_teal,
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: '10%',
    },
    btnLabel: {
        fontSize: 25,
        color: colors.white,
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "70%",
        height: 50,
        backgroundColor: colors.orange,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 251,
        height: 86,
    },
    logoContainer: {
        marginBottom: '83%',
        alignItems: "center",
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 50,
    },
    registerButton: {
        width: "70%",
        height: 50,
        backgroundColor: colors.teal,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default WelcomeScreen;