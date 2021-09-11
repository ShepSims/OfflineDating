import React, { useState, memo } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { storeCurrentUser, updateUser } from '../../redux/actions/currentUserActions';
import { determinePFP } from '../../config/functions';
import PropTypes from 'prop-types';
import RemoveBuddyModal from './RemoveBuddyModal';
import images from '../../config/images';
import { deleteBuddy } from '../../../../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function Buddy({ id, name, profilePic, hideRemoveButton, prevScreen, relationshipId }) {
	const navigation = useNavigation();

	// Redux
	const dispatch = useDispatch();
	let currentUser = Object.assign(useSelector((state) => state.currentUser));

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [modalVisible, setModalVisible] = useState(false);

	// Constants
	const pfp = determinePFP(profilePic, images.pfpTeal);

	async function remove() {
		if (id != null) {
			await API.graphql(graphqlOperation(deleteBuddy, { input: { id: relationshipId } }));

			for (var i = 0; i < currentUser.buddies.buddies.length; i++) {
				if (currentUser.buddies.buddies[i] === id) {
					currentUser.buddies.buddies.splice(i, 1);
				}
			}
		} else {
			console.log('No friend found');
		}
		dispatch(storeCurrentUser(currentUser));
		setModalVisible(false);
	}

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('NotMyProfile', {
							other_user_id: id,
							prevScreen: prevScreen,
						})
					}
					style={styles.info}
				>
					<Image source={pfp} style={styles.pfp} />

					<Text style={styles.name}>{name}</Text>
				</TouchableOpacity>

				{!hideRemoveButton && (
					<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.remove}>
						<Text style={styles.removeLabel}>Remove</Text>
					</TouchableOpacity>
				)}
			</View>

			<RemoveBuddyModal
				animationType={'slide'}
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}
				onPressRemove={() => remove()}
				onPressCancel={() => setModalVisible(false)}
			/>
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			width: screenWidth,
			height: 70,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
			justifyContent: 'center',
			backgroundColor: theme.colors.background,
		},
		info: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		infoContainer: {
			margin: 15,
			flexDirection: 'row',
			alignItems: 'center',
		},
		name: {
			fontSize: 18,
			color: theme.colors.text,
		},
		pfp: {
			width: 45,
			height: 45,
			borderRadius: 999,
			backgroundColor: theme.colors.primary_lightest,
			marginRight: 16,
		},
		remove: {
			width: 75,
			height: 30,
			position: 'absolute',
			right: 0,
			backgroundColor: theme.colors.accent1,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 999,
		},
		removeLabel: {
			color: theme.colors.white,
			fontWeight: 'bold',
		},
	});

	return styles;
}

Buddy.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	profilePic: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
	hideRemoveButton: PropTypes.bool,
};

export default memo(Buddy);
