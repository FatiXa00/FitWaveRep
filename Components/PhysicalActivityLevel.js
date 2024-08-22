import { Camera, CameraType, FlashMode } from 'expo-camera/legacy';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ScanBarcodeScreen() {
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: 'white' }}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const fetchNutritionData = async (barcode) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.nutritionix.com/v1_1/item?upc=${barcode}&appId=YOUR_APP_ID&appKey=YOUR_APP_KEY`);
      const data = await response.json();
      setNutritionData(data);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
    fetchNutritionData(data);
  };

  function toggleFlashMode() {
    setFlash((current) => (
      current === FlashMode.off ? FlashMode.torch : FlashMode.off
    ));
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Scan Barcode</Text>
        </View>
        <View style={styles.scanFrame}>
          <Text style={styles.scanText}>Scan Barcode</Text>
          <Text style={styles.scanSubText}>Place Barcode in the frame to scan</Text>
        </View>
      </Camera>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.flashButton} onPress={toggleFlashMode}>
          <Ionicons name="flash" size={24} color="white" />
          <Text style={styles.footerButtonText}>Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeBarcodeButton}>
          <Ionicons name="md-keypad" size={24} color="white" />
          <Text style={styles.footerButtonText}>Type Barcode</Text>
        </TouchableOpacity>
      </View>

      {scanned && (
        <View style={styles.resultContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#ff6347" />
          ) : nutritionData ? (
            <View>
              <Text style={styles.resultText}>Product: {nutritionData.item_name}</Text>
              <Text style={styles.resultText}>Calories: {nutritionData.nf_calories}</Text>
              <Text style={styles.resultText}>Total Fat: {nutritionData.nf_total_fat}g</Text>
              <Text style={styles.resultText}>Sodium: {nutritionData.nf_sodium}mg</Text>
              <Text style={styles.resultText}>Total Carbohydrate: {nutritionData.nf_total_carbohydrate}g</Text>
              <Text style={styles.resultText}>Protein: {nutritionData.nf_protein}g</Text>
            </View>
          ) : (
            <Text style={styles.resultText}>No nutritional data found for this product.</Text>
          )}
          <TouchableOpacity style={styles.scanAgainButton} onPress={() => { setScanned(false); setNutritionData(null); }}>
            <Text style={styles.scanAgainText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  camera: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scanFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scanSubText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flashButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBarcodeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  resultText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  scanAgainButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    borderRadius: 10,
  },
  scanAgainText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  permissionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
