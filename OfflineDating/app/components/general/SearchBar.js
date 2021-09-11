import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import colors from '../../config/colors';
import Icon from '../../assets/icons/TramigoIcon';


/**
 * @param props style, onChangeText, searchAlgorithm
 * @description style - overwrites the current style to create a style for the actual component itself
 * @description onChangeText - overwrites the current onChangeText to create our own onChangeText for the actual component itself
 * @description searchAlgorithm - this is for applying different search algorithm based on filters
 * @returns a navigation for users to search different profiles, activities, etc.
 */
function SearchBar({ onChangeText, onSubmitEditing, style }) {
	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	return (
		<View style={style}>
			<View style={styles.container}>
				<View style={styles.iconContainer}>
					<Icon name={'magnifying-glass-left'} size={20} color={theme.colors.placeholder} />
				</View>
				<TextInput
					placeholder={"search"}
					placeholderTextColor={theme.colors.placeholder}
					style={styles.search}
					onChangeText={onChangeText}
					returnKeyType={"search"}
					onSubmitEditing={onSubmitEditing}
				/>
			</View>
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			backgroundColor: theme.colors.background,
			borderRadius: 5,
		},
		iconContainer: {
			width: 35,
			height: 35,
			justifyContent: 'center',
			alignItems: 'center',
		},
		search: {
			width: '85%',
			height: 35,
			color: theme.colors.text,
			backgroundColor: theme.colors.background,
			fontSize: 20,
		},
	});

	return styles;
}

SearchBar.propTypes = {
	onChangeText: PropTypes.func,
	onSubmitEditing: PropTypes.func,
	style: PropTypes.object,
};

export default SearchBar;
