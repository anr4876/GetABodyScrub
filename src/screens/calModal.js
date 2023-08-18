import React from 'react';
import { Modal, View } from 'react-native';

const CalModal = ({ modalVisible, onClose, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose(!modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: '80%',
            height: '60%',
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CalModal;
