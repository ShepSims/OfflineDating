import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../../redux/actions/currentUserActions';
import { classic, dark } from '../../config/themes';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm from 'react-native-simple-radio-button';
import TopNavBar from '../../components/general/TopNavBar';
import BottomNavBar from '../../components/general/BottomNavBar';
import Button from '../../components/general/Button';
import ToggleSwitch from '../../components/general/ToggleSwitch';
import { API, graphqlOperation } from 'aws-amplify';
import { customUpdateSettings } from '../../../../src/graphql/customQueries';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function SettingsScreen(props) {
	const navigation = useNavigation();

	// Redux
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.currentUser);

	// Theme
	const [theme, setTheme] = useState(currentUser.theme);
	const styles = useTheme(theme);
	const [settingsValues, setSettingsValues] = useState(currentUser.settings);

	// Array that stores a set of radio buttons with values from radio_props for each setting
	const radioButtons = [];
	const set = [
		'Who can view your Profile?',
		'Who can view your Trips?',
		'Who can view your Activities?',
		'Who can view your Posts?',
		'Display on Meet?',
	];

	// Array that stores options for each place's radio buttons
	const radio_props = [
		{ label: 'Only Me', value: 0 },
		{ label: 'Friends', value: 1 },
		{ label: 'Everyone', value: 2 },
	];

	const tf_props = [
		{ label: 'Enable', value: 0 },
		{ label: 'Disable', value: 1 },
	];

	// Theme picker items
	const pickerItems = [
		{ label: 'Classic', value: 0 },
		{ label: 'Dark', value: 1 },
		{ label: 'Midnight', value: 2 },
		{ label: 'Light', value: 3 },
	];

	// Loading RadioButtons component for each setting into radioButtons array
	for (let i = 0; i < 4; i++) {
		radioButtons[i] = (
			<View style={styles.btnsContainer} key={i}>
				<View style={styles.btnContainer}>
					<Text style={styles.btnName}>{set[i]}</Text>
					<RadioForm
						radio_props={radio_props}
						initial={settingsValues[i]}
						formHorizontal={true}
						labelHorizontal={false}
						buttonColor={theme.colors.accent1}
						labelColor={theme.colors.text}
						selectedButtonColor={theme.colors.accent1}
						selectedLabelColor={theme.colors.text}
						animation={true}
						onPress={(value) => (settingsValues[i] = value)}
					/>
				</View>
			</View>
		);
	}

	radioButtons[4] = (
		<View style={styles.btnsContainer} key={4}>
			<View style={styles.btnContainer}>
				<Text style={styles.btnName}>{set[4]}</Text>
				<RadioForm
					radio_props={tf_props}
					initial={settingsValues[4]}
					formHorizontal={true}
					labelHorizontal={false}
					buttonColor={theme.colors.accent1}
					labelColor={theme.colors.text}
					selectedButtonColor={theme.colors.accent1}
					selectedLabelColor={theme.colors.text}
					animation={true}
					onPress={(value) => (settingsValues[4] = value)}
				/>
			</View>
		</View>
	);

	// Updates the database with edited profile information
	async function apply() {
		try {
			await API.graphql(graphqlOperation(customUpdateSettings, { settings: settingsValues, id: currentUser.id }));
			dispatch(updateSettings(settingsValues));
		} catch (error) {
			console.log(error);
		}
	}

	useLayoutEffect(() => {
		setTheme(currentUser.theme);
	}, [currentUser.theme]);

	const pickerSelectStyles = StyleSheet.create({
		inputIOS: {
			fontSize: 18,
			borderRadius: 10,
			color: theme.colors.text,
			textAlign: 'left',
		},
		inputIOSContainer: {
			width: '100%',
			borderRadius: 10,
			borderColor: theme.colors.border,
			borderWidth: 2,
		},
		inputAndroid: {
			fontSize: 18,
			borderRadius: 10,
			borderColor: theme.colors.border,
			borderWidth: 2,
			color: theme.colors.text,
			backgroundColor: theme.colors.background,
			textAlign: 'left',
		},
	});

	return (
		<View style={styles.container}>
			<TopNavBar title={'Settings'} />

			<ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
				{/* Settings Radio Buttons */}
				<View style={styles.sectionContainer}>
					{/* Theme Selector */}
					<View style={styles.pickerContainer}>
						<Text style={styles.btnName}>Theme</Text>
						<RNPickerSelect
							items={pickerItems}
							onValueChange={(value) => {
								settingsValues[5] = value;
							}}
							style={pickerSelectStyles}
							useNativeAndroidPickerStyle={false}
							textInputProps={{
								color: theme.colors.text,
								width: '100%',
								height: 40,
								textAlign: 'left',
								fontSize: 18,
								backgroundColor: theme.colors.background,
								paddingHorizontal: 15,
							}}
						/>
					</View>
					<View style={styles.radioContainer}>{radioButtons}</View>
				</View>

				{/* Done Button */}
				<Button label={'Done'} size={'large'} color={theme.colors.accent1} onPress={() => apply()} style={{ marginBottom: '10%' }} />
			</ScrollView>

			<BottomNavBar />
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		btnContainer: {
			alignItems: 'center',
			paddingVertical: 5,
		},
		btnName: {
			fontSize: 18,
			fontWeight: 'bold',
			color: theme.colors.text,
			paddingVertical: 15,
		},
		btnsContainer: {
			width: screenWidth,
			alignItems: 'center',
		},
		container: {
			flex: 1,
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-start',
			backgroundColor: theme.colors.background,
		},
		pickerContainer: {
			alignItems: 'center',
		},
		radioContainer: {
			paddingBottom: '10%',
		},
		scroll: {
			width: screenWidth,
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-start',
			paddingTop: '2.5%',
			paddingBottom: '10%',
		},
		sectionContainer: {
			alignItems: 'center',
			paddingTop: 10,
		},
		title: {
			fontSize: 30,
			fontWeight: 'bold',
		},
	});

	return styles;
}

export default SettingsScreen;
