import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import TopNavBar from '../../../components/general/TopNavBar';
import BottomNavBar from '../../../components/general/BottomNavBar';
import ToggleButtons from '../../../components/general/ToggleButtons';
import Go from '../../../components/explore/Go';
import Plan from '../../../components/explore/Plan';
import Meet from '../../../components/explore/Meet';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

function HomeScreen(props) {
	// State
	const [currentScreen, setCurrentScreen] = useState(<Go />);

	// Theme
	const theme = useSelector((state) => state.currentUser.theme);
	const styles = useTheme(theme);

	return (
		<View style={styles.container}>
			<TopNavBar title={'Explore'} />

			<ToggleButtons
				toggleArray={[false, true, false]}
				buttonNames={['Plan', 'Go', 'Meet']}
				onPress1={() => setCurrentScreen(<Plan />)}
				onPress2={() => setCurrentScreen(<Go />)}
				onPress3={() => setCurrentScreen(<Meet />)}
				positionAbsolute={true}
				spaceAbove={screenHeight * .12}
			/>

			{currentScreen}

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
			backgroundColor: theme.colors.background,
		},
	});

	return styles;
}

export default HomeScreen;