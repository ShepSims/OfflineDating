import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import ErrorMessage from '../../components/welcome/ErrorMessage';
import Button from '../../components/general/Button';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ResetPasswordScreen(props) {
    // Navigation
    const navigation = useNavigation();
    const route = useRoute();
    const email = route.params.email;

    // State
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPass] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState('');
    const [errorOccurred, setErrorOccurred] = useState(false);

    // Refs
    const passRef = useRef(null);
    const cPassRef = useRef(null);
    const confirmationCodeRef = useRef(null);

    function resetPassword(email, password, confirmPassword, confirmationCode) {
        if (password != confirmPassword) {
            setError('Passwords don\'t match');
            setErrorOccurred(true);
        }
        else {
            Auth.forgotPasswordSubmit(email, confirmationCode, password)
                .then(data => {
                    alert('Password successfully reset!');
                    navigation.navigate('Login');
                })
                .catch(err => {
                    console.log(err);
                    setError(err.message);
                    setErrorOccurred(true);
                });
        }
    }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
        >
            <Icon name={'pad-lock'} size={85} color={colors.white} style={styles.icon} />

            <Text style={styles.title}>Reset Your Password</Text>

            <Text style={styles.text}>
                Please check your email for a confirmation code.
            </Text>

            <TextInput
                ref={passRef}
                placeholder={'new password'}
                placeholderTextColor={colors.gray}
                style={styles.input}
                autoCapitalize={'none'}
                autoCompleteType={'password'}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true}
                returnKeyType={'next'}
                onSubmitEditing={() => cPassRef.current.focus()}
            />

            <TextInput
                ref={cPassRef}
                placeholder={'retype new password'}
                placeholderTextColor={colors.gray}
                style={styles.input}
                autoCapitalize={'none'}
                autoCompleteType={'password'}
                onChangeText={(value) => setConfirmPass(value)}
                secureTextEntry={true}
                returnKeyType={'next'}
                onSubmitEditing={() => confirmationCodeRef.current.focus()}
            />

            <TextInput
                ref={confirmationCodeRef}
                placeholder={'confirmation code'}
                placeholderTextColor={colors.gray}
                style={styles.input}
                onChangeText={(value) => setConfirmationCode(value)}
                returnKeyType={'done'}
                keyboardType={'number-pad'}
            />

            <View style={styles.error}>{errorOccurred && <ErrorMessage message={error} />}</View>

            <Button
                label={'Reset'}
                size={'large'}
                color={colors.orange}
                onPress={() => resetPassword(email, password, confirmPassword, confirmationCode)}
                style={{
                    position: 'absolute',
                    bottom: 50,
                }}
            />

            <View style={styles.btnContainer}>
                <Text onPress={() => navigation.navigate('Login')} style={styles.btn}>Back to Login</Text>

                <Text style={styles.btn} onPress={() => Auth.forgotPassword(email)}>Resend Email</Text>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    btn: {
        color: colors.white,
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 15,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.light_teal,
    },
    error: {
        paddingTop: 25,
    },
    icon: {
        marginTop: screenHeight * 0.2,
        marginBottom: screenHeight * 0.1,
    },
    input: {
        width: screenWidth * 0.65,
        height: 35,
        fontSize: 20,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: colors.white,
        color: colors.black,
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
        color: colors.white,
        paddingHorizontal: 15,
        fontSize: 16,
        lineHeight: 30,
        paddingBottom: 15,
    },
    title: {
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
});

export default ResetPasswordScreen;