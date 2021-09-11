import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { determinePFP } from '../../../config/functions';
import { calculateCurrentExp, calculateCurrentExpCap } from '../../../config/experience';
import TopNavBar from '../../../components/general/TopNavBar';
import ProfileMap from '../../../components/profile/ProfileMap';
import ProfileSection from '../../../components/profile/ProfileSection';
import ContentPlaceholder from '../../../components/profile/ContentPlaceholder';
import Post from '../../../components/newsfeed/Post';
import Activity from '../../../components/explore/Activity';
import Trip from '../../../components/explore/Trip';
import Buddy from '../../../components/profile/Buddy';
import BottomNavBar from '../../../components/general/BottomNavBar';
import FloatingButton from '../../../components/general/FloatingButton';
import ProgressBar from '../../../components/profile/ProgressBar';
import BadgesModal from '../../../components/profile/BadgesModal';
import ProfilePicModal from '../../../components/profile/ProfilePicModal';
import Icon from '../../../assets/icons/TramigoIcon';
import images from '../../../config/images';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ProfileScreen(props) {
	// Navigation Hook
	const navigation = useNavigation();

	// Redux
	const currentUser = useSelector((state) => state.currentUser);
	const activities = useSelector((state) => state.activities);
	const trips = useSelector((state) => state.trips);
	const users = useSelector((state) => state.users);
	const posts = useSelector((state) => state.posts);
	const locations = useSelector((state) => state.locations);

	// Theme
	const theme = currentUser.theme;
	const [styles, setStyles] = useState({});

	// State
	const [name] = useState(currentUser.fname + ' ' + currentUser.lname);
	const [bio, setBio] = useState(currentUser.bio);
	const [age, setAge] = useState(currentUser.age);
	const [location, setLocation] = useState(currentUser.location);
	const [work, setWork] = useState(currentUser.work);
	const [school, setSchool] = useState(currentUser.school);
	const [level, setLevel] = useState(currentUser.level);
	const [exp, setExp] = useState(currentUser.exp);
	const [profilePic, setProfilePic] = useState(determinePFP(users[currentUser.id].profilePicURL, images.pfpWhite));
	const [mapValues, setMapValues] = useState(currentUser.places);
	const [postList, setPostList] = useState([]);
	const [tripList, setTripList] = useState([]);
	const [activityList, setActivityList] = useState([]);
	const [buddyList, setBuddyList] = useState([]);
	const [content, setContent] = useState(userInfo);
	const [toggle, setToggle] = useState([true, false, false, false]);
	const [badgesModalVisible, setBadgesModalVisible] = useState(false);
	const [pfpModalVisible, setPfpModalVisible] = useState(false);
	const [favedPosts, setFavedPosts] = useState([]);
	const [badges, setBadges] = useState(currentUser.badges);
	const [mapExpanded, setMapExpanded] = useState(false);

	let userPosts = renderPosts();
	let schedule = renderSchedule();
	let buddies = renderBuddies();

	const userInfo = () => {
		let currentExp = calculateCurrentExp(exp, level);
		let currentExpCap = calculateCurrentExpCap(level);

		return (
			<View style={{ width: '100%', alignItems: 'center' }}>
				<Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text }}>Level {level}</Text>
				<ProgressBar step={currentExp} steps={currentExpCap} width={'90%'} height={20} color={theme.colors.accent2} />
				<View style={{ height: 20, width: '100%' }} />
				<ProfileSection title={'About Me'} text={bio} />
				<ProfileSection title={'Age'} text={age.toString()} />
				<ProfileSection title={'Country'} text={location} />
				<ProfileSection title={'Profession'} text={work} />
				<ProfileSection title={'School'} text={school} />
			</View>
		);
	};

	function includePosts(data) {
		let temp = [];
		for (let i = 0; i < data.length; i++) {
			if (posts[data[i]].archived == false) {
				let location = null;
				if (posts[data[i]].location != null) {
					location = locations[posts[data[i]].location].addressStr;
				}

				let post = {
					id: data[i],
					userId: posts[data[i]].userId,
					text: posts[data[i]].text,
					dateTime: posts[data[i]].dateCreated,
					location: location,
					source: posts[data[i]].source,
				};
				temp.push(post);
			}
		}
		setPostList(temp.reverse());
	}

	function includeTrips(data) {
		let trps = [];
		for (let i = 0; i < data.length; i++) {
			if (trips[data[i]].archived == false) {
				let trip = {
					id: data[i],
					userId: trips[data[i]].createdBy,
					title: trips[data[i]].title,
					description: trips[data[i]].description,
					startDate: trips[data[i]].startDate,
					endDate: trips[data[i]].endDate,
					createdBy: trips[data[i]].createdBy,
					attendees: trips[data[i]].members.length,
					capacity: trips[data[i]].capacity,
					activities: trips[data[i]].activities,
				};
				trps.push(trip);
			}
		}
		setTripList(trps);
	}

	function includeActivities(data) {
		let acts = [];
		for (let i = 0; i < data.length; i++) {
			if (activities[data[i]].archived == false) {
				let activity = {
					ref: i,
					id: data[i],
					userId: activities[data[i]].createdBy,
					title: activities[data[i]].title,
					description: activities[data[i]].description,
					location: activities[data[i]].location,
					dateTime: activities[data[i]].timeOfEvent,
					createdBy: activities[data[i]].createdBy,
					attendees: activities[data[i]].attendees.length,
					capacity: activities[data[i]].capacity,
					coordinate: {
						latitude: parseFloat(activities[data[i]].lat),
						longitude: parseFloat(activities[data[i]].lon),
					},
				};
				acts.push(activity);
			}
		}
		setActivityList(acts);
	}

	function includeBuddies(data) {
		let buddies = [];
		for (let i = 0; i < data.length; i++) {
			let buddy = {
				ref: i,
				id: data[i],
				name: users[data[i]].name + ' ' + users[data[i]].lastName,
				profilePic: users[data[i]].profilePicURL,
			};
			buddies.push(buddy);
		}
		setBuddyList(buddies);
	}

	function renderPosts() {
		let newPosts = [];

		if (postList.length === 0) {
			return <ContentPlaceholder iconName={'world'} text={"There's nothing here."} />;
		}

		for (let i = 0; i < postList.length; i++) {
			newPosts.push(
				<Post
					id={postList[i].id}
					key={postList[i].id}
					userId={postList[i].userId}
					userName={name}
					profilePic={currentUser.profilePic}
					text={postList[i].text}
					location={postList[i].location}
					dateTime={postList[i].dateTime}
					source={postList[i].source}
				/>
			);
		}

		return newPosts;
	}

	function renderSchedule() {
		let items = activityList.concat(tripList);
		let newSchedule = [];

		if (items.length === 0) {
			return <ContentPlaceholder iconName={'world'} text={"There's nothing here."} />;
		}

		for (let i = 0; i < items.length; i++) {
			items[i].startDate !== undefined
				? newSchedule.push(
						<Trip
							key={i}
							createdBy={items[i].createdBy}
							profilePic={users[items[i].createdBy].profilePicURL}
							title={items[i].title}
							description={items[i].description}
							startDate={items[i].startDate}
							endDate={items[i].endDate}
							members={items[i].attendees}
							capacity={items[i].capacity}
							activities={items[i].activities}
							createdBy={items[i].createdBy}
							onPress={() =>
								navigation.navigate('TripPage', {
									tripId: items[i].id,
									title: items[i].title,
									description: items[i].description,
									activities: items[i].activities,
									startDate: items[i].startDate,
									endDate: items[i].endDate,
									location: items[i].location,
									navigateTo: 'Profile',
								})
							}
							onPressDetails={() =>
								navigation.navigate('TripPage', {
									tripId: items[i].id,
									title: items[i].title,
									description: items[i].description,
									activities: items[i].activities,
									startDate: items[i].startDate,
									endDate: items[i].endDate,
									location: items[i].location,
									navigateTo: 'Profile',
								})
							}
						/>
				  )
				: newSchedule.push(
						<Activity
							key={i}
							createdBy={items[i].createdBy}
							profilePic={users[items[i].createdBy].profilePicURL}
							title={items[i].title}
							description={items[i].description}
							location={locations[items[i].location].addressStr}
							dateTime={items[i].dateTime}
							members={items[i].attendees}
							capacity={items[i].capacity}
							createdBy={items[i].createdBy}
							onPress={() =>
								navigation.navigate('ActivityPage', {
									id: items[i].id,
									navigateTo: 'Profile',
								})
							}
							onPressDetails={() =>
								navigation.navigate('ActivityPage', {
									id: items[i].id,
									navigateTo: 'Profile',
								})
							}
						/>
				  );
		}

		return newSchedule;
	}

	function renderBuddies() {
		let newBuddies = [];

		if (buddyList.length === 0) {
			return <ContentPlaceholder iconName={'world'} text={"There's nothing here."} />;
		}

		for (let i = 0; i < buddyList.length; i++) {
			newBuddies.push(<Buddy id={buddyList[i].id} key={buddyList[i].ref} name={buddyList[i].name} profilePic={buddyList[i].profilePic} />);
		}

		return newBuddies;
	}

	function fetchProfileContent() {
		setLevel(currentUser.level);
		setExp(currentUser.exp);
		setBio(currentUser.bio);
		setAge(currentUser.age);
		setLocation(currentUser.location);
		setWork(currentUser.work);
		setSchool(currentUser.school);
		setProfilePic(determinePFP(users[currentUser.id].profilePicURL, images.pfpWhite));
		setBadges(currentUser.badges);
		setToggle([true, false, false, false]);
		setMapValues(currentUser.places);
	}

	useLayoutEffect(() => {
		setContent(userInfo());
		userPosts = renderPosts();
		schedule = renderSchedule();
		buddies = renderBuddies();
	}, [bio, age, location, work, school, level, exp, mapValues, theme]);

	useFocusEffect(
		useCallback(() => {
			fetchProfileContent();
			includePosts(currentUser.posts);
			includeBuddies(currentUser.buddies.buddies);
			includeActivities(currentUser.activities['own'].concat(currentUser.activities['joined']));
			includeTrips(currentUser.trips['own'].concat(currentUser.trips['joined']));
		}, [currentUser])
	);

	useEffect(() => {
		setStyles(useTheme(theme));
	}, [theme]);

	return (
		<View style={styles.container}>
			<TopNavBar title={name} />

			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={styles.scroll}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				{/* Button that navigates to TravelMapScreen*/}
				<TouchableOpacity onPress={() => setMapExpanded(!mapExpanded)} style={styles.expandedMapBtn}>
					<Icon name={mapExpanded ? 'half-arrow-up' : 'half-arrow-down'} size={25} color={theme.colors.white} />
				</TouchableOpacity>

				{/* Links to the Travel Map page */}
				<ProfileMap mapValues={mapValues} height={mapExpanded ? screenHeight : screenHeight / 2.8} />

				{/* All info about the user as well as posts */}
				<View style={styles.contentContainer}>
					<View style={styles.buttonContainer}>
						{/* About Me Button */}
						<TouchableOpacity
							onPress={() => {
								setContent(userInfo);
								setToggle([true, false, false, false]);
							}}
							style={toggle[0] ? styles.selectedButton : styles.button}
						>
							<Icon name={'backpacker'} size={30} color={theme.colors.white} style={styles.icon} />
						</TouchableOpacity>

						{/* My Posts Button */}
						<TouchableOpacity
							onPress={() => {
								setContent(userPosts);
								setToggle([false, true, false, false]);
							}}
							style={toggle[1] ? styles.selectedButton : styles.button}
						>
							<Icon name={'camera'} size={30} color={theme.colors.white} style={styles.icon} />
						</TouchableOpacity>

						{/* Profile Pic and Badges Button */}
						<View style={styles.pfpContainer}>
							<TouchableOpacity onPress={() => setPfpModalVisible(true)} style={styles.pfpTouch}>
								<Image style={styles.pfp} source={profilePic} />
							</TouchableOpacity>
							{/* <TouchableOpacity onPress={() => setBadgesModalVisible(true)} style={styles.badgeContainer}>
								<View style={styles.badge} >
									<Icon name={'compass'} size={25} color={theme.colors.white} />
								</View>
							</TouchableOpacity> */}
						</View>

						{/* My Schedule Button */}
						<TouchableOpacity
							onPress={() => {
								setContent(schedule);
								setToggle([false, false, true, false]);
							}}
							style={toggle[2] ? styles.selectedButton : styles.button}
						>
							<Icon name={'calendar'} size={30} color={theme.colors.white} style={styles.icon} />
						</TouchableOpacity>

						{/* My Buddies Button */}
						<TouchableOpacity
							onPress={() => {
								setContent(buddies);
								setToggle([false, false, false, true]);
							}}
							style={toggle[3] ? styles.selectedButton : styles.button}
						>
							<Icon name={'contact-book'} size={28} color={theme.colors.white} style={styles.icon} />
						</TouchableOpacity>
					</View>
					{content}
				</View>

				{/* Spacer */}
				<View style={{ width: '100%', padding: 40, backgroundColor: theme.colors.background }} />
			</ScrollView>

			{!mapExpanded && (
				<FloatingButton
					color={theme.colors.accent1}
					iconName={'pencil'}
					size={35}
					iconColor={theme.colors.white}
					navigateTo={'EditProfile'}
				/>
			)}

			{/* Modals */}

			<BadgesModal
				visible={badgesModalVisible}
				onPressX={() => setBadgesModalVisible(false)}
				onRequestClose={() => setBadgesModalVisible(false)}
				badgesData={badges}
			/>

			<ProfilePicModal
				visible={pfpModalVisible}
				onPress={() => setPfpModalVisible(false)}
				onRequestClose={() => setPfpModalVisible(false)}
				profilePic={profilePic}
			/>

			<BottomNavBar />
		</View>
	);
}

function useTheme(theme) {
	const styles = StyleSheet.create({
		badge: {
			width: 35,
			height: 35,
			borderRadius: 999,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.colors.accent1,
		},
		badgeContainer: {
			zIndex: 999,
			right: 35,
			top: 42,
			width: 35,
			height: 35,
			borderRadius: 999,
		},
		button: {
			width: 45,
			height: 45,
			backgroundColor: theme.mode == 'dark' ? theme.colors.primary_light : theme.colors.primary_light,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 100,
			shadowRadius: 1,
			shadowOffset: { width: 0, height: 1 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.7,
			marginHorizontal: 5,
		},
		buttonContainer: {
			width: '100%',
			height: 80,
			marginBottom: 15,
			flexDirection: 'row',
			justifyContent: 'space-evenly',
			backgroundColor: theme.colors.background,
			borderColor: theme.colors.primary,
			borderTopWidth: 7,
			alignItems: 'center',
		},
		buttonLabel: {
			fontSize: 17,
			color: theme.colors.white,
			fontWeight: 'bold',
		},
		container: {
			flex: 1,
			flexDirection: 'column',
			backgroundColor: theme.colors.background,
		},
		contentContainer: {
			flex: 1,
			zIndex: 1,
			width: '100%',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
			minHeight: screenHeight * 0.45,
		},
		expandedMapBtn: {
			position: 'absolute',
			zIndex: 999,
			top: 15,
			right: 15,
		},
		pfp: {
			width: 120,
			height: 120,
			borderRadius: 100,
			borderColor: theme.colors.primary,
			borderWidth: 7,
			backgroundColor: theme.colors.primary_light,
		},
		pfpContainer: {
			zIndex: 4,
			paddingBottom: 70,
			width: 120,
			height: 1,
			marginHorizontal: 5,
			alignItems: 'center',
			flexDirection: 'row',
			shadowRadius: 5,
			shadowOffset: { width: 0, height: 4 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.5,
		},
		pfpTouch: {
			borderRadius: 999,
		},
		scroll: {
			zIndex: 0,
			justifyContent: 'flex-start',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
		},
		selectedButton: {
			width: 45,
			height: 45,
			backgroundColor: theme.colors.accent1,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 100,
			shadowRadius: 1,
			shadowOffset: { width: 0, height: 1 },
			shadowColor: theme.colors.black,
			shadowOpacity: 0.7,
			marginHorizontal: 5,
		},
	});

	return styles;
}

export default ProfileScreen;
