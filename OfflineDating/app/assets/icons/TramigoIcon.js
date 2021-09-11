import { createIconSetFromIcoMoon } from '@expo/vector-icons';

/**
 * @param props name, size, color, style
 * @description Available names: 
 * 	airplane,
 * 	airplane-landing,
 * 	airplane-take-off,
 * 	arrow-down, 
 * 	arrow-left, 
 * 	arrow-right, 
 * 	arrow-up,
 *  art-exhibit,
 * 	art-set,
 * 	backpack,
 * 	backpacker, 
 * 	backpacker-check,
 * 	backpacker-paper-airplane,
 * 	backpacker-plus,
 * 	beach,
 * 	beach-ball,
 * 	bell, 
 * 	biography,
 * 	bonfire,
 * 	book,
 * 	brief-case,
 * 	cake,
 * 	calendar, 
 * 	camera, 
 *  check-mark,
 * 	cheese,
 * 	chess-pieces
 *  clock,
 * 	comments, 
 * 	compass,
 * 	contact-book,
 * 	cup,
 * 	dumbbell
 * 	ellipsis, 
 * 	envelope,
 * 	filter,
 * 	football,
 * 	game-controller,
 * 	guitar,
 * 	half-arrow-down,
 * 	half-arrow-left, 
 * 	half-arrow-right, 
 * 	half-arrow-up,
 * 	hiker,
 * 	home, 
 * 	info, 
 * 	knife-and-spatula,
 * 	magnifying-glass-left,
 * 	magnifying-glass-right,
 * 	menu, 
 * 	mug,
 * 	newspaper,
 *  pad-lock, 
 * 	paper-airplane, 
 * 	party-cup,
 * 	party-hat,
 * 	paw-print,
 * 	pencil, 
 * 	person, 
 * 	photo,
 * 	pin, 
 * 	pin-check,
 * 	pin-plus,
 * 	pin-x,
 * 	plus, 
 * 	popcorn-and-drink,
 * 	road-trip-car,
 * 	scholar-cap,
 * 	shopping-bag,
 * 	soccer-ball,
 * 	sports,
 * 	star, 
 * 	star-outline, 
 * 	surfer,
 * 	tent,
 * 	umbrella,
 * 	wine-glass,
 *	wine-and-cheese,
 * 	world,
 * 	x,
 * 	tramigo-logo,
 * 	tramigo-full-logo
 * @returns An Icon that you can resize, recolor, and style
 */

export default createIconSetFromIcoMoon(
	require('./selection.json'),
	'Tramigo',
	'Tramigo.ttf'
);