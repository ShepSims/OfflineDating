import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperience } from '../../redux/actions/currentUserActions';
import { experience, calculateLevel } from '../../config/experience';
import RNPickerSelect from 'react-native-picker-select';
import TopNavBar from '../../components/general/TopNavBar';
import StarRating from '../../components/general/StarRating';
import BottomNavBar from '../../components/general/BottomNavBar';
import Button from '../../components/general/Button';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { customCreateFeedback, customUpdateExp } from '../../../../src/graphql/customQueries';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function FeedbackScreen(props) {
	// Redux
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.currentUser);

	// Theme
	const theme = currentUser.theme;
	const styles = useTheme(theme);

	// State
	const [feedbackType, setFeedbackType] = useState('');
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [rating, setRating] = useState(0);

	const pickerItems = [
		{ label: 'Report a bug', value: 'bugReport' },
		{ label: 'Make a suggestion', value: 'suggestion' },
		{ label: 'Ask a question', value: 'question' },
		{ label: 'Other', value: 'other' },
	];

	async function submit(feedbackType, title, message, rating) {
		if (title == '' || feedbackType == '' || message == '' || rating == 0) {
			alert("Fields can't be left blank!");
		} else {
			await API.graphql(
				graphqlOperation(customCreateFeedback, {
					content: message,
					feedbackType: feedbackType,
					rating: rating,
					title: title,
					userID: currentUser.id,
				})
			);

			// Increment experience
			let newExp = experience.feedback + currentUser.exp;
			dispatch(updateExperience(newExp, currentUser.level));
			await API.graphql(
				graphqlOperation(customUpdateExp, {
					id: currentUser.id,
					exp: newExp,
					level: calculateLevel(newExp, currentUser.level),
				})
			);

			if (feedbackType == 'bugReport') {
				alert('Thanks for reporting a bug!  Our extermination team is suiting up and ready to get squashing.');
			} else if (feedbackType == 'suggestion') {
				alert('Thanks for your suggestion!  Our dev team will hop to it!');
			} else if (feedbackType == 'question') {
				alert('Thanks for your question!  Our support team will get back to your shortly!');
			} else if (feedbackType == 'other') {
				alert('Thanks for your submission!  Our support team will get back to your shortly!');
			}

			// Clear inputs
			setFeedbackType({ label: 'Reason for contact', value: '' });
			setTitle('');
			setMessage('');
			setRating(0);
		}
	}

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
			<TopNavBar title={'Contact Us'} />

			<ScrollView contentContainerStyle={styles.scroll}>
				<View style={styles.inputContainer}>
					<Text style={styles.heading}>Rate Your Experience</Text>

					{/* Rating */}
					<View style={styles.rating}>
						<StarRating rating={rating} starColor={theme.colors.accent1} starSize={40} onChangeRating={(rating) => setRating(rating)} />
					</View>

					<Text style={styles.heading}>Send Us a Message</Text>

					{/* Feedback Type */}
					<View style={styles.pickerContainer}>
						<RNPickerSelect
							items={pickerItems}
							onValueChange={(value) => setFeedbackType(value)}
							style={pickerSelectStyles}
							useNativeAndroidPickerStyle={false}
							placeholder={{
								label: 'Reason for contact',
								value: '',
								color: theme.colors.black,
							}}
							textInputProps={{
								color: feedbackType == 0 ? theme.colors.placeholder : theme.colors.text,
								width: '100%',
								height: 40,
								textAlign: 'left',
								fontSize: 18,
								backgroundColor: theme.colors.background,
								paddingHorizontal: 15,
							}}
						/>
					</View>

					{/* Title */}
					<TextInput
						placeholder={'Title'}
						placeholderTextColor={theme.colors.placeholder}
						value={title}
						onChangeText={(text) => setTitle(text)}
						style={styles.title}
						maxLength={50}
					/>

					{/* Message */}
					<TextInput
						placeholder={'Tell us how we can improve...'}
						placeholderTextColor={theme.colors.placeholder}
						value={message}
						onChangeText={(text) => setMessage(text)}
						style={styles.message}
						multiline={true}
						maxLength={500}
					/>
				</View>

				{/* Submit Button */}
				<Button
					label={'Submit'}
					size={'x-large'}
					color={theme.colors.accent1}
					onPress={() => submit(feedbackType, title, message, rating)}
					style={{
						position: 'absolute',
						bottom: screenHeight * 0.125,
					}}
				/>
			</ScrollView>
			<BottomNavBar />
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			width: screenWidth,
			alignItems: 'center',
			justifyContent: 'flex-start',
			backgroundColor: theme.colors.background,
		},
		heading: {
			color: theme.mode == 'dark' ? theme.colors.white : theme.colors.primary_light,
			fontSize: 30,
			paddingBottom: 10,
		},
		inputContainer: {
			flex: 1,
			width: screenWidth,
			height: screenHeight,
			alignItems: 'flex-start',
			padding: 15,
			backgroundColor: theme.colors.background,
		},
		message: {
			width: '100%',
			height: screenHeight * 0.25,
			backgroundColor: theme.colors.text_input,
			fontSize: 18,
			paddingTop: Platform.OS === 'ios' ? 10 : 0,
			borderRadius: 10,
			borderColor: theme.colors.border,
			color: theme.colors.text,
			borderWidth: 2,
			padding: 15,
		},
		pickerContainer: {
			width: screenWidth * 0.6,
			height: 40,
			marginBottom: 15,
		},
		rating: {
			width: '100%',
			paddingBottom: 15,
		},
		scroll: {
			flex: 1,
		},
		star: {
			padding: 2.5,
		},
		title: {
			width: '100%',
			height: 40,
			backgroundColor: theme.colors.text_input,
			color: theme.colors.text,
			fontSize: 18,
			borderRadius: 10,
			borderColor: theme.colors.border,
			borderWidth: 2,
			paddingHorizontal: 15,
			marginBottom: 15,
		},
	});

	return styles;
}

export default FeedbackScreen;
