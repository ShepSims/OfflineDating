import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

/**
 * @param props visible, onRequestClose, onPressBlock
 * @returns Component that renders a modal where the user can choose from a list of profile-related options
 */
function NotMyProfileOptionsModal({ visible, onRequestClose, onPressBlock, onPressUnblock, blocked }) {
	return (
		<Modal animationType={'slide'} transparent={true} visible={visible} onRequestClose={onRequestClose}>
			<View style={styles.view}>
				<View style={styles.container}>
					<TouchableOpacity onPress={onRequestClose} style={styles.xBtn}>
						<Icon name={'x'} size={15} color={colors.black} />
					</TouchableOpacity>

					<Text style={styles.title}>Profile Options</Text>

					<TouchableOpacity onPress={!blocked ? onPressBlock : onPressUnblock} style={styles.btn}>
						{!blocked ? <Text style={styles.btnLabel}>Block</Text> : <Text style={styles.btnLabel}>Unblock</Text>}
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	btn: {
		width: '100%',
		paddingVertical: 10,
		alignItems: 'center',
	},
	btnLabel: {
		fontSize: 18,
	},
	container: {
		width: screenWidth * 0.75,
		alignItems: 'center',
		padding: 20,
		backgroundColor: colors.white,
		borderRadius: 20,
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	view: {
		width: screenWidth,
		height: screenHeight,
		justifyContent: 'center',
		alignItems: 'center',
	},
	xBtn: {
		position: 'absolute',
		top: 25,
		left: 25,
	},
});

NotMyProfileOptionsModal.propTypes = {
	user: PropTypes.oneOf(['current', 'other']),
	visible: PropTypes.bool,
	isJoined: PropTypes.bool,
	onRequestClose: PropTypes.func,
	onPressRequests: PropTypes.func,
	onPressEdit: PropTypes.func,
	onPressRemove: PropTypes.func,
	onPressAddToTrip: PropTypes.func,
	onPressReport: PropTypes.func,
	onPressShare: PropTypes.func,
};

export default NotMyProfileOptionsModal;
