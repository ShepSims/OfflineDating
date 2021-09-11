import React, { memo } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Platform, } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons/TramigoIcon';

const screenWidth = Math.round(Dimensions.get('window').width);

/**
 * @param props onChangeText, value, onSend
 * @returns Text Input styled in a way that we like
 */
function MessageEditor({ value, onSend, onChangeText, pickImage }) {
	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.camera} onPress={pickImage}>
				<Icon name={'camera'} size={30} color={theme.colors.navBars == '#FFFFFF' ? theme.colors.primary_light : theme.colors.white} />
			</TouchableOpacity>

			<View style={styles.textArea}>
				<TextInput
					style={styles.text}
					multiline={true}
					placeholder={'Message'}
					placeholderTextColor={theme.colors.placeholder}
					onChangeText={onChangeText}
					value={value}
				/>

				<TouchableOpacity onPress={onSend} style={styles.send}>
					<Icon
						name={'paper-airplane'}
						size={15}
						color={theme.colors.white}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		camera: {
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: 15,
			marginBottom: 15,
		},
		container: {
			flexDirection: 'row',
			width: screenWidth,
			backgroundColor: theme.colors.navBars,
			alignItems: 'flex-end',
			justifyContent: 'space-between',
			shadowRadius: 2,
			shadowOffset: { width: 0, height: -2 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.25,
		},
		send: {
			width: 28,
			height: 28,
			backgroundColor: theme.colors.accent2,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 999,
			paddingTop: 2,
			paddingRight: 1,
		},
		textArea: {
			flexDirection: 'row',
			alignItems: 'flex-end',
			padding: 5,
			width: '81%',
			color: theme.colors.text,
			backgroundColor: theme.colors.text_input,
			borderRadius: 20,
			marginVertical: 10,
			marginRight: 15,
			borderWidth: 2,
			borderColor: theme.colors.border,
		},
		text: {
			width: '91%',
			fontSize: 18,
			paddingLeft: 10,
			paddingBottom: Platform.OS === 'ios' ? 5 : 0,
			color: theme.colors.text,
		},
	});

	return styles;
}

MessageEditor.propTypes = {
	value: PropTypes.string,
	onSend: PropTypes.func,
	onChangeText: PropTypes.func,
};

export default memo(MessageEditor);
