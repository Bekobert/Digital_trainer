import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

function WrongModal() {
    
    const [isModalVisible, setModalVisible] = uState(false);

    const toggleModal() {
        setModalVisible(!isModalVisible);
    }
    
    return (
        <View>
            <Modal isVisible={isModalVisible}> 
                <View style={{flex: 1}}>
                    <Text>I am WrongModal !</Text>
                </View>
            </Modal>
        </View>
    )
}

export default WrongModal
