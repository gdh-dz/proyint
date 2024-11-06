import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ListItem {
  id: string;
  name: string;
  image: string;
}

const myLists: ListItem[] = [
  { id: '1', name: 'Nombre de la lista', image: 'https://via.placeholder.com/80' },
  { id: '2', name: 'Lista', image: 'https://via.placeholder.com/80' },
  { id: '3', name: 'Lista', image: 'https://via.placeholder.com/80' },
];

const sharedLists: ListItem[] = [
  { id: '1', name: 'Lista', image: 'https://via.placeholder.com/80' },
  { id: '2', name: 'Lista', image: 'https://via.placeholder.com/80' },
  { id: '3', name: 'Lista', image: 'https://via.placeholder.com/80' },
];

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  const renderListItem = ({ item }: { item: ListItem }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <Text style={styles.listName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar lista"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* My Lists Section */}
      <Text style={styles.sectionLabel}>Mis Listas</Text>
      <FlatList
        data={myLists}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Shared Lists Section */}
      <Text style={styles.sectionLabel}>Listas compartidas</Text>
      <FlatList
        data={sharedLists}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Create New List Button */}
      <TouchableOpacity style={styles.createButton} onPress={() => router.push('/new-list')}>
        <Ionicons name="add-circle-outline" size={24} color="#2E7D32" />
        <Text style={styles.createButtonText}>Crear lista nueva</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginVertical: 10,
  },
  listContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures equal space between items
    flexWrap: 'wrap', // Allows items to wrap to the next line if necessary
  },
  listItem: {
    alignItems: 'center',
    width: 100, // Ensure consistent width
    marginBottom: 15, // Add spacing between rows
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  listName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    color: '#2E7D32',
    marginLeft: 8,
  },
});

export default HomeScreen;
