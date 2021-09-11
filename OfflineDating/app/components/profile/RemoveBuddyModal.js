import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

function RemoveBuddyModal({ name, visible, onPressRemove, onPressCancel, onRequestClose }) {
    return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you want to remove {name}?</Text>
                <View style={styles.modalButtons}>
                    <Pressable style={styles.modalRemove} onPress={onPressRemove}>
                        <Text style={styles.modalBtnLabel}>Remove</Text>
                    </Pressable>
                    <View style={{ width: '15%' }} />
                    <Pressable style={styles.modalCancel} onPress={onPressCancel}>
                        <Text style={styles.modalBtnLabel}>Cancel</Text>
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

RemoveBuddyModal.propTypes = {
    name: PropTypes.string,
    visible: PropTypes.bool,
    onPressRemove: PropTypes.func,
    onPressCancel: PropTypes.func,
    onRequestClose: PropTypes.func,
};

export default RemoveBuddyModal;