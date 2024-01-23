import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const SaveConfirmationModal = ({isVisible, onOk, onCancel}) => {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            width:'70%',
            // padding: 16,
            justifyContent:'center',
            alignItems:'center',
            borderRadius: 8,
            elevation: 5,
            height:"25%"
          }}>
          <Text style={{color:'#000', fontSize:moderateScale(18)}}>Do you want to save the location?</Text>
          <View
            style={{
                width:'100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 16,
            }}>
            <TouchableOpacity onPress={onOk}>
              <Text style={{color: '#0352fc', fontWeight: 'bold'}}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{color: '#0352fc', fontWeight: 'bold'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SaveConfirmationModal;
