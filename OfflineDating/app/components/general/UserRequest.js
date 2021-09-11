import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { determinePFP } from '../../config/functions';
import PropTypes from 'prop-types';
import Icon from '../../assets/icons/TramigoIcon';
import images from '../../config/images';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function UserRequest({ name, profilePic, onPressProfile, onPressCheck, onPressX }) {
    const pfp = determinePFP(profilePic ? profilePic : '', images.pfpTeal);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressProfile} style={styles.infoContainer}>
                <Image source={pfp} style={styles.pfp} />
                <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={onPressCheck}>
                    <View style={styles.check} >
                        <Icon name={'check-mark'} size={10} color={colors.white} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressX}>
                    <View style={styles.x} >
                        <Icon name={'x'} size={10} color={colors.white} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
    },
    check: {
        width: 35,
        height: 35,
        borderRadius: 999,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    container: {
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 17,
    },
    pfp: {
        width: 45,
        height: 45,
        borderRadius: 999,
        marginRight: 15,
    },
    x: {
        width: 35,
        height: 35,
        borderRadius: 999,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

UserRequest.propTypes = {
    name: PropTypes.string,
    profilePic: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    onPressProfile: PropTypes.func,
    onPressCheck: PropTypes.func,
    onPressX: PropTypes.func,
};

export default UserRequest;