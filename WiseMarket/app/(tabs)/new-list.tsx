import { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const CrearNuevaLista = () => {
  const [nombreLista, setNombreLista] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [presupuesto, setPresupuesto] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(0);


  const toggleSwitch = () => setIsShared(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear nueva lista</Text>
      
      <Text style={styles.label}>Nombre de la lista</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe aquí"
        value={nombreLista}
        onChangeText={setNombreLista}
      />

      <Text style={styles.label}>Lista compartida</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, isShared && styles.activeLabel]}>Sí</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isShared ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isShared}
        />
        <Text style={[styles.switchLabel, !isShared && styles.activeLabel]}>No</Text>
      </View>

      <ScrollView contentContainerStyle={styles.iconContainer}>
        {[...Array(12)].map((_, index) => (
          <View key={index} style={styles.iconWrapper}>
            <Image source={{ uri: '../../assets/images/favicon.png' }} style={styles.icon} />
            <Text style={styles.iconLabel}>Producto</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Nuevo producto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.nextButtonText}>Siguiente</Text>
      </TouchableOpacity>

      {/* Start Modal View*/}
      <SafeAreaProvider>
        <SafeAreaView>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
          }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={styles.container}>
                  <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backText}
                      onPress={() => {setModalVisible(!modalVisible)}}
                    >{"X"}</Text>
                  </TouchableOpacity>

                  <Text style={styles.label}>Escoge icono</Text>
                  <ScrollView horizontal contentContainerStyle={styles.iconContainer}>
                    {[...Array(6)].map((_, index) => (
                      <TouchableOpacity 
                        key={index} 
                        style={[
                          styles.iconButton, 
                          selectedIcon === index && styles.iconButtonSelected
                        ]}
                        onPress={() => setSelectedIcon(index)}
                      >
                        <Text style={styles.iconText}>Lista {index + 1}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  
                  <Text style={styles.label}>Selecciona el presupuesto de la lista:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="$"
                    keyboardType="numeric"
                    value={presupuesto}
                    onChangeText={setPresupuesto}
                  />

                  <TouchableOpacity style={styles.createButton}>
                    <Text style={styles.createButtonText}>Crear lista</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
      {/* End Modal View */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#6c757d',
    marginVertical: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#6c757d',
    marginHorizontal: 10,
  },
  activeLabel: {
    color: '#4CAF50',
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  addButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  nextButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'red',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 24,
    color: '#4CAF50',
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginHorizontal: 5,
  },
  iconButtonSelected: {
    backgroundColor: '#3e8e41',
  },
  iconText: {
    fontSize: 16,
    color: '#fff',
  },
  createButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CrearNuevaLista;