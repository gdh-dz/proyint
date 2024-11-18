import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Pressable, TextInput, ToastAndroid } from 'react-native';
import { CameraView } from 'expo-camera';
import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import { getListById } from '@/services/lists';

const EscanearCodigo: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false); // New state for input focus

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const decodeBase64 = (data: string) => {
    try {
      return atob(data);
    } catch (error) {
      console.error("Error decoding Base64:", error);
      return null;
    }
  };

  const hanldeShareList = (listId: string) => {
    console.log("SharingList With ID:", listId);
    router.replace(`/(tabs)/confirmaciondecompartido?id=${listId}`);
    //router.replace(`confirmacioncompartido?id=${listId}?id=${listId}`);
  };

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    await processCode(data);
  };

  const processCode = async (data: string) => {
    const decodedData = decodeBase64(data);
    if (decodedData) {
      const listId = String(decodedData);
      await fetchListId(listId);
    } else {
      ToastAndroid.show('Error decoding code.', ToastAndroid.LONG);
    }
  };

  const handleManualCodeSubmit = async () => {
    if (manualCode) {
      await processCode(manualCode);
      setManualCode('');
    } else {
      ToastAndroid.show('Please enter a valid code.', ToastAndroid.SHORT);
    }
  };

  const fetchListId = async (quizId: string) => {
    const list = await getListById(quizId);

    if (list == null) {
      console.error("Error fetching exercise by ID:");
      ToastAndroid.show('Exercise not found.', ToastAndroid.LONG);
    } else if (list) {
      console.log("list found:", list);
      hanldeShareList(quizId); // Navigate to quiz if found
      ToastAndroid.show(`list found: ${list.listName}`, ToastAndroid.LONG);
    } else {
      ToastAndroid.show('No list found with this ID.', ToastAndroid.LONG);
    }
  };


  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (!hasPermission) {
    return <Text>Camera access not granted</Text>;
  }

  return (
    <View style={styles.escanearCodigo}>

      <View style={styles.escanearCodigoChild} />
      <Pressable style={styles.vector} onPress={() => router.back()}>

      </Pressable>
      <Text style={styles.fotografaElCdigo}>Fotografía el código QR</Text>

      <View style={styles.roundedRectangle}>
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

      </View>

      <View style={styles.manualCodeContainer}>
        <Text style={styles.manualCodeText}>Ingrese el código manualmente:</Text>
        <TextInput
          placeholder="Ingrese el código del quiz aquí"
          value={manualCode}
          onChangeText={setManualCode}
          onFocus={() => setIsInputFocused(true)} // Set focus state to true on focus
          onBlur={() => setIsInputFocused(false)} // Set focus state to false on blur
          style={styles.manualInput}
        />
        <Pressable style={styles.submitButton} onPress={handleManualCodeSubmit}>
          <Text style={styles.submitButtonText}>Enviar Código</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  escanearCodigo: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageIcon: {
    width: '110%',
    height: 220,
    position: 'absolute',
    top: 42,
    resizeMode: 'contain',
  },
  escanearCodigoChild: {
    position: 'absolute',
    top: 160,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
  },
  vector: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: 30,
    height: 30,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fotografaElCdigo: {
    fontSize: 24,
    color: '#fff',
    position: 'absolute',
    top: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '70%',
  },
  roundedRectangle: {
    width: '85%',
    height: '55%',
    position: 'absolute',
    top: '25%',
    borderRadius: 40,
    backgroundColor: '#f3fff3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualInput: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#5F7F1E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  manualCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  manualCodeText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
});

export default EscanearCodigo;
