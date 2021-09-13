/**
 * Description: This file contains reusable themes for convenience.
 *
 * Adding Themes:
 * 1. Copy and paste the one of the current themes and rename it to whatever you want.
 * 2. Use the provided color constants to change the colors in the theme.
 * 3. Choose which theme to give Google maps by setting mapStyle to classicMap or darkMap.
 * 3. Add a your theme to the themes dictionary at the next integer id.
 * 4. Go to Settings.js and add add your theme to the theme picker.
 */

const classicMapBackground = {
	ios: '#b8dff3',
	android: '#aadaff',
};

const darkMapBackground = {
	ios: '#374364',
	android: '#17263c',
};

const white = '#FFFFFF';
const light_gray = '#e3e3e3';
const gray = '#a3a3a3';
const black = '#1a1a1a';
const true_black = '#000000';
const lightest_teal = '#b7e5e5';
const light_teal = '#479fb3';
const teal = '#2B616D';
const dark_teal = '#023B44';
const darkest_teal = '#012930';
const lightest_orange = '#efb39e';
const light_orange = '#e99b7c';
const orange = '#E38059';
const dark_orange = '#de693b';
const light_green = '#93e5c6';
const green = '#19A573';
const red = '#FF6666';
const yellow = '#ffc34d';
const purple = '#6C4AA3';

export const classic = {
	mode: 'light',
	colors: {
		icon: white,
		text: black,
		text_input: white,
		modal: white,
		background: white,
		navBars: teal,
		primary: teal,
		primary_light: light_teal,
		primary_lightest: lightest_teal,
		accent1: orange,
		accent1_light: light_orange,
		accent2: green,
		accent2_light: light_green,
		mapPins: red,
		border: light_gray,
		placeholder: gray,
		white: white,
		light_gray: light_gray,
		gray: gray,
		black: true_black,
		leftMessage: light_gray,
		rightMessage: light_teal,
		trips: light_teal,
		activities: light_teal,
		visitedPlace: 'rgba(25, 164, 115, 0.7)', // green
		visitedPlaceOutline: 'rgba(25, 164, 115, 0.9)', // green
		unvisitedPlace: 'rgba(199, 172, 117, 0.7)', // gold
		unvisitedPlaceOutline: 'rgba(199, 172, 117, 0.9)', // gold
		map: classicMapBackground,
	},
};

export const dark = {
	mode: 'dark',
	colors: {
		icon: white,
		text: white,
		text_input: dark_teal,
		modal: dark_teal,
		background: dark_teal,
		navBars: darkest_teal,
		primary: darkest_teal,
		primary_light: teal,
		primary_lightest: light_teal,
		accent1: dark_orange,
		accent1_light: orange,
		accent2: green,
		accent2_light: light_green,
		mapPins: red,
		border: darkest_teal,
		placeholder: gray,
		white: white,
		light_gray: light_gray,
		gray: gray,
		black: true_black,
		leftMessage: darkest_teal,
		rightMessage: light_teal,
		trips: darkest_teal,
		activities: darkest_teal,
		visitedPlace: 'rgba(25, 164, 115, 0.7)', // green
		visitedPlaceOutline: 'rgba(25, 164, 115, 0.9)', // green
		unvisitedPlace: 'rgba(1, 43, 50, 0.7)', // dark_teal
		unvisitedPlaceOutline: 'rgba(1, 43, 50, .5)', // dark_teal
		map: darkMapBackground,
	},
};

export const midnight = {
	mode: 'dark',
	colors: {
		icon: white,
		text: white,
		text_input: black,
		modal: black,
		background: true_black,
		navBars: true_black,
		primary: true_black,
		primary_light: black,
		primary_lightest: black,
		accent1: teal,
		accent1_light: light_teal,
		accent2: teal,
		accent2_light: light_teal,
		mapPins: red,
		border: black,
		placeholder: gray,
		white: white,
		light_gray: light_gray,
		gray: gray,
		black: true_black,
		leftMessage: black,
		rightMessage: light_teal,
		trips: black,
		activities: black,
		visitedPlace: 'rgba(43, 97, 109, 0.7)', // teal
		visitedPlaceOutline: 'rgba(43, 97, 109, 0.9)', // teal
		unvisitedPlace: 'rgba(0, 0, 0, 0.7)', // black
		unvisitedPlaceOutline: 'rgba(0, 0, 0, 0.5)', // black
		map: darkMapBackground,
	},
};

export const light = {
	mode: 'light',
	colors: {
		icon: light_teal,
		text: black,
		text_input: white,
		modal: white,
		background: white,
		navBars: white,
		primary: light_teal,
		primary_light: light_teal,
		primary_lightest: lightest_teal,
		accent1: orange,
		accent1_light: light_orange,
		accent2: green,
		accent2_light: light_green,
		mapPins: red,
		border: light_gray,
		placeholder: gray,
		white: white,
		light_gray: light_gray,
		gray: gray,
		black: true_black,
		leftMessage: light_gray,
		rightMessage: light_teal,
		trips: light_teal,
		activities: light_teal,
		visitedPlace: 'rgba(25, 164, 115, 0.7)', // green
		visitedPlaceOutline: 'rgba(25, 164, 115, 0.9)', // green
		unvisitedPlace: 'rgba(199, 172, 117, 0.7)', // gold
		unvisitedPlaceOutline: 'rgba(199, 172, 117, 0.9)', // gold
		map: classicMapBackground,
	},
};

const themes = {
	0: classic,
	1: dark,
	2: midnight,
	3: light,
};

export function selectTheme(themeId) {
	return themes[themeId] ? themes[themeId] : classic;
}
