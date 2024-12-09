import { Camera, CameraType, FlashMode } from 'expo-camera';
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
      const response = await fetch(`https://api.nutritionix.com/v1_1/item?upc=${barcode}&appId=9f936287&appKey=a1686d5082666cc09c8569a72ba977c6`);
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#FD6639" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan Barcode</Text>
      </View>

      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.scanFrame}>
            <Text style={styles.scanText}>Scan Barcode</Text>
            <Text style={styles.scanSubText}>Place barcode in the frame to scan</Text>
          </View>
        </Camera>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.flashButton} onPress={toggleFlashMode}>
          <Ionicons name="flash" size={24} color="white" />
          <Text style={styles.footerButtonText}>Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeBarcodeButton}>
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
    backgroundColor: '#141824',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    height: 100,
    backgroundColor: '#141824',
  },
  backButton: {
    marginRight: 20,
  },
  headerText: {
    color: '#FD6639',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign:'center',
    flex:1,
    marginRight:40,
  },
  cameraContainer: {
    flex: 2,
    marginHorizontal: 30,
    marginVertical:30,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 1,
  },
  camera: {
    flex: 1,
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
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#141824',
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
    backgroundColor: '#141824',
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
