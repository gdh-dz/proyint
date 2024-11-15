import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Category } from '../models/Category';
import { getCategorys } from '../services/categorias';
import { addProducto } from '@/services/Products';

const IconSelectionScreen: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [productimageURL, setProductImageURL] = useState('');
  const [price, setPrice] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Carga las categorías desde Firebase al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      const categoryList = await getCategorys();
      setCategories(categoryList);
    };
    loadCategories();
  }, []);

  // Manejador para agregar el producto
  const handleAddProduct = async () => {
    console.log('Product Info:', { productName, productimageURL, price, selectedIcon });

    if (!productName || !selectedIcon || !productimageURL || !price) {
      Alert.alert('Error', 'Faltan datos. Por favor, completa todos los campos antes de agregar el producto.');
      return;
    }

    try {
      await addProducto(productName, category, productimageURL, parseFloat(price));
      Alert.alert('Éxito', '¡Producto agregado exitosamente!');

      // Limpia los campos del formulario después de agregar el producto
      setProductName('');
      setCategory('');
      setPrice('');
      setProductImageURL('');
      setSelectedIcon(null);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      Alert.alert('Error', 'Hubo un problema al agregar el producto. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escoge un ícono</Text>

      {/* Selección de íconos */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.iconContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.nombre}
              style={[styles.iconCircle, selectedIcon === category.nombre && styles.selectedIcon]}
              onPress={() => {
                if (selectedIcon !== category.nombre) {
                  setSelectedIcon(category.nombre);
                  setProductImageURL(category.iconURL);
                  setCategory(category.nombre);
                  console.log(category)
                  console.log(productimageURL)
                  console.log(selectedIcon)
                }
              }}
            >
              <Image source={{ uri: category.iconURL }} style={styles.iconImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Detalles del producto */}
      <View style={styles.detailsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>

      {/* Botón para agregar producto */}
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
  scrollContainer: {
    width: '100%',
    marginBottom: 20,
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
