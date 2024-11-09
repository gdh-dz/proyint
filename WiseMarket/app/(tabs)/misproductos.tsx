import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProductScreen: React.FC = () => {
  const router = useRouter();
  const products = Array(15).fill({ name: 'Producto', imageUrl: 'https://via.placeholder.com/60' });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto"
          placeholderTextColor="#999"
        />
      </View>

      {/* Product List */}
      <Text style={styles.sectionTitle}>Tus productos</Text>
      <ScrollView contentContainerStyle={styles.productsGrid}>
        {products.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Add New Product Button */}
      <TouchableOpacity 
        style={styles.newProductButton} 
        onPress={() => router.push('/agregarproducto')} // Navigate to IconSelectionScreen
      >
        <MaterialIcons name="add-circle-outline" size={48} color="#2E7D32" />
        <Text style={styles.newProductText}>Nuevo producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  newProductButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  newProductText: {
    color: '#2E7D32',
    fontSize: 16,
    marginTop: 5,
  },
});

export default ProductScreen;
