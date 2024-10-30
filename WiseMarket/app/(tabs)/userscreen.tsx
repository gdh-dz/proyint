import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>Ajustes</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Notificaciones</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Modo oscuro</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={(value) => setDarkModeEnabled(value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkModeEnabled ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.profileTitle}>Tu perfil</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Text>✏️</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://example.com/avatar.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Nombre Apellidos</Text>
      </View>

      <View style={styles.listsContainer}>
        <View style={styles.listItem}>
          <Image
            source={{ uri: 'https://example.com/list1.png' }}
            style={styles.listImage}
          />
          <Text>Lista 1</Text>
        </View>
        <View style={styles.listItem}>
          <Image
            source={{ uri: 'https://example.com/list2.png' }}
            style={styles.listImage}
          />
          <Text>Lista 2</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  settings: {
    width: '100%',
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  listItem: {
    alignItems: 'center',
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#6b8e23',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
