import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';  // Ensure this import is correct

const ScanBarcodeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera?.Constants?.Type?.back || 'back'); // Fallback
  const cameraRef = useRef(null);

  useEffect(() => {
    console.log(Camera); // Log Camera object to verify
    (async () => { 
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCamera = () => { 
    setType(current => (current === Camera?.Constants?.Type?.back ? Camera?.Constants?.Type?.front : Camera?.Constants?.Type?.back || 'back'));
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {Camera ? (
        <Camera style={styles.camera} type={type} ref={cameraRef} />
      ) : (
        <Text>Camera module not available</Text>
      )}
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.closeButton} onPress={() => {}}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.scanText}>Scan Barcode</Text>
        <Text style={styles.scanSubText}>Place Barcode in the frame to scan</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.flashButton} onPress={() => {}}>
          <Text style={styles.buttonText}>Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeButton} onPress={toggleCamera}>
          <Text style={styles.buttonText}>Type Barcode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  closeText: {
    color: 'white',
    fontSize: 24,
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  scanSubText: {
    color: 'white',
    fontSize: 14,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  flashButton: {
    backgroundColor: '#FD6639',
    padding: 15,
    borderRadius: 10,
  },
  typeButton: {
    backgroundColor: '#FD6639',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ScanBarcodeScreen;
