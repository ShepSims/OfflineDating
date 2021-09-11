import React, { memo } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

/**
 * @param props text 
 * @returns A view that allows to see if something is toggled on or off
 */
function ToggleSwitch({ text, onValueChange, value, trackColor, thumbColor, textColor }) {

	return (
		<View style={styles.toggleView}>
			<Text style={[styles.toggleText, { color: textColor }]}>{text}</Text>
			<Switch
				trackColor={trackColor ? trackColor : { false: colors.light_gray, true: colors.orange }}
				onValueChange={onValueChange}
				value={value}
				thumbColor={thumbColor ? thumbColor : colors.teal}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	toggleView: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		paddingBottom: 5,
	},
	toggleText: {
		fontSize: 18,
		textAlign: 'left',
		fontWeight: 'bold',
		paddingBottom: 15,
	},
});

ToggleSwitch.propTypes = {
	text: PropTypes.string,
	onValueChange: PropTypes.func,
	value: PropTypes.bool,
	trackColor: PropTypes.exact({ false: PropTypes.string, true: PropTypes.string }),
	thumbColor: PropTypes.string,
	textColor: PropTypes.string
};


export default memo(ToggleSwitch);
