import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DateTimePicker from '../general/DateTimePicker';
import RNPickerSelect from 'react-native-picker-select';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

/**
 * @param props title, multiline, text, onChange
 * @description multiline (boolean) - Allows component to be mulitline or not
 * @description onChange - overwrites the current onChange to create our own onChange for the actual component itself
 * @returns A component that allows for editing certain profile attributes using a textInput
 */
function EditableProfileSection({ type, title, onChange, date, showPicker, onPressShow, placeholder, textInputProps, items, text, multiline }) {
	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	const pickerSelectStyles = StyleSheet.create({
		inputAndroid: {
			fontSize: 18,
			borderRadius: 10,
			color: theme.colors.text,
			backgroundColor: theme.colors.background,
		},
		inputIOS: {
			fontSize: 18,
			borderRadius: 10,
			color: theme.colors.text,
		},
		inputIOSContainer: {
			width: '100%',
		},
	});

	if (type === 'date') {
		return (
			<View style={styles.dateTimeContainer}>
				<View style={styles.dateTimeTextContainer}>
					{/* Section Title */}
					<Text style={styles.dateTimeTitle}>{title}</Text>
					{/* Section Info */}
					<DateTimePicker
						value={date}
						mode={'date'}
						dateFormat={'long'}
						display={Platform.OS === 'ios' ? 'compact' : 'default'}
						onChange={onChange}
						showPicker={showPicker}
						onPressShow={onPressShow}
						style={{ width: 320 }}
					/>
				</View>
			</View>
		);
	}
	else if (type === 'select') {
		return (
			<View style={styles.container}>
				<View style={styles.pickerContainer}>
					{/* Section Title */}
					<Text style={styles.title}>{title}</Text>
					{/* Section Info */}
					<RNPickerSelect
						onValueChange={onChange}
						style={pickerSelectStyles}
						useNativeAndroidPickerStyle={false}
						placeholder={placeholder}
						textInputProps={textInputProps}
						items={items}
					/>
				</View>
			</View>
		);
	}
	else {
		return (
			<View style={styles.container}>
				<View style={styles.textContainer}>
					{/* Section Title */}
					<Text style={styles.title}>{title}</Text>
					{/* Section Info */}
					<TextInput
						placeholder={placeholder}
						placeholderTextColor={theme.colors.placeholder}
						defaultValue={text}
						multiline={multiline}
						onChangeText={onChange}
						style={{
							fontSize: 18,
							width: '100%',
							height: multiline === true ? '95%' : 35,
							color: theme.colors.text,
							paddingTop: 10,
							backgroundColor: theme.colors.background,
						}}
					/>
				</View>
			</View>
		);
	}
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			zIndex: 1,
			flexDirection: 'row',
			width: screenWidth,
			alignItems: 'flex-start',
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
			padding: 20,
		},
		dateTimeContainer: {
			flex: 1,
			zIndex: 1,
			flexDirection: 'row',
			width: '100%',
			alignItems: 'flex-start',
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
			padding: 20,
		},
		dateTimeTextContainer: {
			width: '100%',
			height: '100%',
		},
		dateTimeTitle: {
			fontSize: 18,
			fontWeight: 'bold',
			color: theme.colors.text,
		},
		pickerContainer: {
			width: screenWidth * .6,
			height: 40,
			justifyContent: 'center',
			alignItems: 'flex-start',
		},
		textContainer: {
			width: '100%',
			height: '100%',
		},
		title: {
			fontSize: 18,
			fontWeight: 'bold',
			color: theme.colors.text,
		},
	});

	return styles;
}

EditableProfileSection.propTypes = {
	type: PropTypes.oneOf(['text', 'date', 'select']),
	title: PropTypes.string,
	onChange: PropTypes.func,
	date: PropTypes.object,
	showPicker: PropTypes.bool,
	onPressShow: PropTypes.func,
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	textInputProps: PropTypes.object,
	items: PropTypes.arrayOf(PropTypes.object),
	text: PropTypes.string,
	multiline: PropTypes.bool,
};

export default EditableProfileSection;
