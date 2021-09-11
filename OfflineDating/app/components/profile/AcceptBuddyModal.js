import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function AcceptBuddyModal({ name, visible, onPressRemove, onPressCancel, onRequestClose, onPressAccept }) {
	return (
		<Modal animationType={'slide'} transparent={true} visible={visible} onRequestClose={onRequestClose}>
			<View style={styles.modalView}>
				<Text style={styles.modalText}>{name} wants to be your Tramigo</Text>
				<View style={styles.modalButtons}>
					<Pressable style={styles.modalCancel} onPress={onPressAccept}>
						<Text style={styles.modalBtnLabel}>Accept</Text>
					</Pressable>
					<View style={{ width: '10%' }} />
					<Pressable style={styles.modalRemove} onPress={onPressRemove}>
						<Text style={styles.modalBtnLabel}>Reject</Text>
					</Pressable>

					<View style={{ width: '10%' }} />
					<Pressable style={styles.modalCancel} onPress={onPressCancel}>
						<Text style={styles.modalBtnLabel}>X</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalBtnLabel: {
		color: colors.white,
		fontWeight: 'bold',
	},
	modalButtons: {
		flexDirection: 'row',
	},
	modalCancel: {
		width: 75,
		height: 30,
		backgroundColor: colors.light_teal,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 999,
	},
	modalRemove: {
		width: 75,
		height: 30,
		backgroundColor: colors.orange,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 999,
	},
	modalText: {
		marginBottom: 45,
		textAlign: 'center',
		fontSize: 18,
	},
	modalView: {
		bottom: screenHeight / 2.5,
		alignSelf: 'center',
		position: 'absolute',
		width: '70%',
		margin: 20,
		backgroundColor: colors.white,
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

AcceptBuddyModal.propTypes = {
	name: PropTypes.string,
	visible: PropTypes.bool,
	onPressRemove: PropTypes.func,
	onPressCancel: PropTypes.func,
	onRequestClose: PropTypes.func,
};

export default AcceptBuddyModal;
