import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons/TramigoIcon';
import colors from '../../config/colors';

function StarRating({ rating, onChangeRating, starSize, starColor }) {
    const [stars, setStars] = useState([false, false, false, false, false])
    const size = starSize ? starSize : 40;
    const color = starColor ? starColor : colors.orange;

    function toggleStars(numStars) {
        let temp = Array(5).fill(false);
        temp.fill(true, 0, numStars);
        setStars(temp);
        onChangeRating(numStars);
    }

    useEffect(() => {
        if (rating == 0) toggleStars(0);
    }, [rating]);

    return (
        <View style={styles.rating}>
            <TouchableOpacity onPress={() => toggleStars(1)} style={styles.star}>
                <Icon name={stars[0] ? 'star' : 'star-outline'} size={size} color={color} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleStars(2)} style={styles.star}>
                <Icon name={stars[1] ? 'star' : 'star-outline'} size={size} color={color} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleStars(3)} style={styles.star}>
                <Icon name={stars[2] ? 'star' : 'star-outline'} size={size} color={color} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleStars(4)} style={styles.star}>
                <Icon name={stars[3] ? 'star' : 'star-outline'} size={size} color={color} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleStars(5)} style={styles.star}>
                <Icon name={stars[4] ? 'star' : 'star-outline'} size={size} color={color} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
    },
    star: {
        padding: 2.5,
    },
});

StarRating.propTypes = {
    rating: PropTypes.number,
    onChangeRating: PropTypes.func,
    starSize: PropTypes.number,
    starColor: PropTypes.string,
};

export default StarRating;