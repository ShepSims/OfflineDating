import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * @param props title, text
 * @returns Component that renders the about me section and shows all the info
 */
function ProfileSection({ title, text }) {
	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	return (
		<View style={styles.container}>
			{/* Section Title */}

			<Text style={styles.title}>{title}</Text>

			{/* Section Info */}
			<View style={styles.textContainer}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'column',
			width: '100%',
			alignItems: 'flex-start',
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
			padding: 20,
		},
		text: {
			fontSize: 18,
			color: theme.colors.text,
		},
		textContainer: {
			paddingTop: 10,
		},
		title: {
			fontSize: 18,
			fontWeight: 'bold',
			color: theme.colors.text,
		},
	});

	return styles;
}

ProfileSection.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
};

export default memo(ProfileSection);
