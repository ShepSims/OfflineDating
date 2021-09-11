import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import ErrorMessage from '../../components/welcome/ErrorMessage';
import Button from '../../components/general/Button';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ForgotPasswordScreen(props) {
	// Navigation
	const navigation = useNavigation();

	// State
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [errorOccurred, setErrorOccurred] = useState(false);

	return (
		<KeyboardAwareScrollView
			style={{ flex: 1 }}
			contentContainerStyle={styles.container}
			resetScrollToCoords={{ x: 0, y: 0 }}
			scrollEnabled={false}
		>
			<Icon name={'pad-lock'} size={85} color={colors.white} style={styles.icon} />

			<Text style={styles.title}>Forgot Your Password?</Text>

			<Text style={styles.text}>Please enter the email associated with{'\n'}your account.</Text>

			<TextInput
				placeholder={'email'}
				placeholderTextColor={colors.gray}
				style={styles.input}
				autoCapitalize={'none'}
				autoCompleteType={'email'}
				onChangeText={(value) => setEmail(value)}
				returnKeyType={'next'}
			/>

			<View style={styles.error}>{errorOccurred && <ErrorMessage message={error} />}</View>

			<Button
				label={'Continue'}
				size={'large'}
				color={colors.orange}
				onPress={() => {
					Auth.forgotPassword(email)
						.then((data) => {
							navigation.navigate('ResetPassword', { email: email });
						})
						.catch((err) => {
							console.log(err);
							setError(err.message);
							setErrorOccurred(true);
						});
				}}
				style={{
					position: 'absolute',
					bottom: 50,
				}}
			/>

			<View style={styles.btnContainer}>
				<Text onPress={() => navigation.navigate('Login')} style={styles.btn}>
					Back to Login
				</Text>
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

export default ForgotPasswordScreen;
