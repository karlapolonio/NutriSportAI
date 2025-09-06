import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Platform, ActionSheetIOS } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Main() {
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const openCamera = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
        alert('Camera permissions are required!');
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setCapturedPhoto(result.assets[0].uri);
    }
    };

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Gallery permission is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedPhoto(result.assets[0].uri);
    }
  };

  const showOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Camera', 'Gallery'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) openCamera();
          else if (buttonIndex === 2) openGallery();
        }
      );
    } else {
      Alert.alert('Select Option', 'Choose an image source', [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  return (
    <TouchableOpacity style={styles.box} onPress={showOptions}>
      {capturedPhoto ? (
        <Image source={{ uri: capturedPhoto }} style={styles.image} />
      ) : (
        <Text style={styles.label}>ADD IMAGE</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '90%',
    height: 350,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
