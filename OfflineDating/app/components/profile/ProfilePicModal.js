import React from 'react';
import { View, Image, Modal, Pressable, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function ProfilePicModal({ profilePic, visible, onPress, onRequestClose }) {
    return (
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.container}>
                <Pressable onPress={onPress} style={styles.modal}>
                    <Image source={profilePic} style={styles.pfp} />
                </Pressable>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
        alignItems: 'center',
    },
    modal: {
        width: screenWidth * 0.75,
        height: screenWidth * 0.75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black,
        borderRadius: 20,
        marginTop: screenHeight * 0.15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    pfp: {
        width: screenWidth * 0.75,
        height: screenWidth * 0.75,
        borderRadius: 20,
    },
    xBtnTouch: {
        zIndex: 99,
        position: 'absolute',
        left: 20,
        top: 20,
        backgroundColor: colors.black,
        padding: 7,
        borderRadius: 999,
    },
});

ProfilePicModal.propTypes = {
    profilePic: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    visible: PropTypes.bool,
    onPress: PropTypes.func,
    onRequestClose: PropTypes.func,
};

export default ProfilePicModal;