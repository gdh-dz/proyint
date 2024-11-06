import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconSelectionScreen: React.FC = () => {
  const [productName, setProductName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [supermarket, setSupermarket] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [userList, setUserList] = React.useState('');

  const handleAddProduct = () => {
   
    console.log('Producto agregado:', { productName, category, supermarket, price, userList });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escoge un ícono</Text>

      {/* Icon Selection */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconCircle}>
                  <Image source={{ uri: 'http://clipartmag.com/images/animated-vegetables-cliparts-37.jpg' }} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
                  <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/014/151/429/original/milk-cheese-and-yogurt-icon-cartoon-style-vector.jpg' }} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
                  <Image source={{ uri: 'https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-carne-dibujada-mano_23-2150610000.jpg' }} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
                  <Image source={{ uri: 'https://img.freepik.com/vector-premium/productos-higiene-personal-caras-lindas-mascara-medica-desinfectante-proteger-contra-conjunto-ilustraciones-dibujos-animados-virus-o-coronavirus-divertido-jabon-animado-botella-champu-concepto-bano_74855-24969.jpg?w=2000' }} style={styles.iconImage} />
        </TouchableOpacity>
      </View>

      {/* Product Details Input Rectangle */}
      <View style={styles.detailsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoría"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Supermercado"
          value={supermarket}
          onChangeText={setSupermarket}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Lista del usuario"
          value={userList}
          onChangeText={setUserList}
        />
      </View>

      {/* Add Product Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Agregar Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  addButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IconSelectionScreen;