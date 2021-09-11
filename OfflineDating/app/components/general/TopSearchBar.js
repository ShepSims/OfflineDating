import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from './SearchBar';
import colors from '../../config/colors';

function TopSearchBar(props) {
	const navigation = useNavigation();
	const [searchTSerm, setSearchTerm] = React.useState('');
	function search() {
		console.log('Searching...');
	}
	return (
		<View style={styles.container}>
			<SearchBar
				style={styles.searchContainer}
				onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
				searchAlgorithm={search()}
			/>
		</View>
	);
}

const screenHeight = Math.round(Dimensions.get('window').height); // Gets the height of the device's screen
const isX = Platform.OS === 'ios' && screenHeight > 800; // Determines if device is iPhoneX or higher based on screen height
const barHeight = isX === true ? 90 : 70; // If device is iPhoneX or higher, TopNavBar's height is 90px, else it's 70px

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	icon: {
		width: 25,
		height: 25,
	},
	iconContainer: {
		width: 35,
		height: 35,
		backgroundColor: colors.white,
		borderColor: colors.light_gray,
		borderWidth: 1,
		borderRightWidth: 0,
		borderTopLeftRadius: 3,
		borderBottomLeftRadius: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	search: {
		width: '85%',
		height: 35,
		color: colors.black,
		fontSize: 20,
		borderColor: colors.light_gray,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopRightRadius: 3,
		borderBottomRightRadius: 3,
		backgroundColor: colors.white,
	},
	searchContainer: {
		width: '100%',
		height: barHeight,
		paddingTop: 25,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.teal,
	},
});

export default TopSearchBar;
