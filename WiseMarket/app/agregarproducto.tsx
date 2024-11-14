import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const IconSelectionScreen: React.FC = () => {
  const [productName, setProductName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [supermarket, setSupermarket] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [userList, setUserList] = React.useState('');
  const [selectedIcon, setSelectedIcon] = React.useState<string | null>(null);

  const handleAddProduct = () => {
    console.log('Product Info:', { productName, category, supermarket, price, userList, selectedIcon }); // Log the product info

    // Validation
    if (!productName || !category || !supermarket || !price || !userList || !selectedIcon) {
      alert('Faltan datos. Por favor, completa todos los campos antes de agregar el producto.');
    } else {
      console.log('Producto agregado:', { productName, category, supermarket, price, userList, selectedIcon });

      // Success alert
      alert('¡Agregado a tus productos!');
      
      // Clears the form after adding the product
      setProductName('');
      setCategory('');
      setSupermarket('');
      setPrice('');
      setUserList('');
      setSelectedIcon(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escoge un ícono</Text>

      {/* Icon Selection */}
      <View style={styles.iconContainer}>
        <TouchableOpacity 
          style={[styles.iconCircle, selectedIcon === 'vegetable' && styles.selectedIcon]} // Apply style if selected
          onPress={() => setSelectedIcon('vegetable')}
        >
          <Image source={{ uri: 'http://clipartmag.com/images/animated-vegetables-cliparts-37.jpg' }} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.iconCircle, selectedIcon === 'dairy' && styles.selectedIcon]} // Apply style if selected
          onPress={() => setSelectedIcon('dairy')}
        >
          <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/014/151/429/original/milk-cheese-and-yogurt-icon-cartoon-style-vector.jpg' }} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.iconCircle, selectedIcon === 'meat' && styles.selectedIcon]} // Apply style if selected
          onPress={() => setSelectedIcon('meat')}
        >
          <Image source={{ uri: 'https://img.freepik.com/vector-gratis/ilustracion-dibujos-animados-carne-dibujada-mano_23-2150610000.jpg' }} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.iconCircle, selectedIcon === 'hygiene' && styles.selectedIcon]} // Apply style if selected
          onPress={() => setSelectedIcon('hygiene')}
        >
          <Image source={{ uri: 'https://img.freepik.com/vector-premium/productos-higiene-personal-caras-lindas-mascara-medica-desinfectante-proteger-contra-conjunto-ilustraciones-dibujos-animados-virus-o-coronavirus-divertido-jabon-animado-botella-champu-concepto-bano_74855-24969.jpg?w=2000' }} style={styles.iconImage} />
        </TouchableOpacity>
      </View>

      {/* Product Details Input */}
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
  selectedIcon: {
    borderColor: '#2E7D32',
    borderWidth: 2,
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