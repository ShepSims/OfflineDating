import React, { memo, useState } from 'react';
import { View, StyleSheet, Text, Button, Image, Dimensions, ImageBackground, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

/**
 * @param props userId, firstName, lastName, profile
 * @returns Component that renders a rounded square consisting of a picture, name, of origin
 */
function MatchSquare({ name, profilePic, phone }) {
	const navigation = useNavigation();
	const [tapped, setTapped] = useState(false);
	const [matched, setMatched] = useState(false);
	function openLink(openLink) {
		Linking.canOpenURL(openLink)
			.then((supported) => {
				if (!supported) {
					Alert.alert(
						'',
						'',
						[
							{ text: 'go to store', onPress: this.openStorePress },
							{ text: 'cancel', onPress: () => {}, style: 'cancel' },
						],
						{ cancelable: false }
					);
				} else {
					return Linking.openURL(appUrl);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function render() {
		return matched ? null : (
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					setTapped(!tapped);
				}}
			>
				<ImageBackground source={profilePic} style={styles.img} imageStyle={styles.img}>
					{tapped == true ? (
						phone ? (
							<View style={styles.infoContainerPressed}>
								<TouchableOpacity style={styles.instagram} onPress={() => Linking.openURL('http://instagram.com/_u/shep_sims')}>
									<Text style={styles.buttonText}> {'instagram - ' + '@shep.io'}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.phoneButton}
									onPress={() => Linking.openURL('sms:&addresses=3049821999&body=My sms text')}
								>
									<Text style={styles.buttonText}> {'phone - ' + phone}</Text>
								</TouchableOpacity>
								<View style={styles.textInput} />
								<TouchableOpacity style={styles.dismissButton} onPress={() => setMatched(true)}>
									<Text style={styles.buttonText}> Unmatch</Text>
								</TouchableOpacity>
							</View>
						) : (
							<View style={styles.infoContainerPressed}>
								<TouchableOpacity style={styles.matchButton} onPress={() => setMatched(true)}>
									<Text style={styles.buttonText}> Match</Text>
								</TouchableOpacity>
								<View style={styles.textInput} />
								<TouchableOpacity style={styles.dismissButton} onPress={() => setMatched(true)}>
									<Text style={styles.buttonText}> Dismiss</Text>
								</TouchableOpacity>
							</View>
						)
					) : (
						<View style={styles.infoContainer}>
							<Text style={styles.text} numberOfLines={1}>
								{name}
							</Text>
						</View>
					)}
				</ImageBackground>
			</TouchableOpacity>
		);
	}
	return render();
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: '5%',
		paddingVertical: '5%',
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 2 },
		shadowColor: '#000000',
		shadowOpacity: 0.5,
	},
	img: {
		width: screenWidth / 2.4,
		height: screenHeight / 3.5,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: 45,
		backgroundColor: 'rgba(0, 0, 0,0.45)',
		borderBottomRightRadius: 25,
		borderBottomLeftRadius: 25,
	},
	infoContainerPressed: {
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0,0.45)',
		borderBottomRightRadius: 25,
		borderBottomLeftRadius: 25,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	text: {
		flexDirection: 'row',
		position: 'absolute',
		color: '#F0FFFF',
		fontWeight: 'bold',
		fontSize: 16,
		left: 15,
	},
	matchButton: {
		position: 'absolute',
		color: '#F0FFFF',
		height: 100,
		top: '25%',
	},
	instagram: {
		position: 'absolute',
		color: '#F0FFFF',
		height: 100,
		top: '13%',
	},
	dismissButton: {
		flexDirection: 'column',
		position: 'absolute',
		color: '#000000',
		bottom: '25%',
	},
	textInput: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		width: '100%',
		textAlign: 'center',
		fontSize: 18,
		top: '50%',
		color: '#F0FFFF',
	},
	buttonText: {
		fontSize: 14,
		color: '#F0FFFF',
	},
	phoneButton: {
		position: 'absolute',
		color: '#F0FFFF',
		height: 100,
		top: '30%',
	},
});

export default memo(MatchSquare);