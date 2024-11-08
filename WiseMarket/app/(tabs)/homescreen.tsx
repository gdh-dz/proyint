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
  { id: '1', name: 'Lista 1', image: 'https://via.placeholder.com/80' },
  { id: '2', name: 'Lista 2', image: 'https://via.placeholder.com/80' },
  { id: '3', name: 'Lista 3', image: 'https://via.placeholder.com/80' },
];

const sharedLists: ListItem[] = [
  { id: '1', name: 'Lista C1', image: 'https://via.placeholder.com/80' },
  { id: '2', name: 'Lista C2', image: 'https://via.placeholder.com/80' },
  { id: '3', name: 'Lista C3', image: 'https://via.placeholder.com/80' },
];

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderListItem = ({ item }: { item: ListItem }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <Text style={styles.listName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar lista..."
          placeholderTextColor="#A0A0A0"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* My Lists Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Mis listas</Text>
      </View>
      <FlatList
        data={myLists}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        contentContainerStyle={styles.listContainer}
      />

      {/* Shared Lists Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Listas compartidas</Text>
      </View>
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
        <Text style={styles.createButtonText}>Crear lista</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center', // Centers the content horizontally
  },
  topSection: {
    backgroundColor: '#256847',
    paddingVertical: 20,
    width: '100%', // Ensures it spans the full width of the container
    alignItems: 'center', // Centers the content within this section
  },
  searchInput: {
    width: '95%',
    height: 40,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sectionHeader: {
    width: '100%', // Ensures labels are centered relative to the container
    alignItems: 'center', // Centers the label text
    marginVertical: 10,
  },
  sectionLabel: {
    backgroundColor: '#5F7F1E',
    color: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    borderRadius: 15,
  },
  listContainer: {
    width: '100%', // Ensure full width
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Centers items within the container
  },
  listItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 15,
  },
  listImage: {
    width: 80,
    height: 80,
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
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    color: '#2E7D32',
    marginLeft: 8,
  },
});

export default HomeScreen;
