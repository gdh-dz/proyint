import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfileScreen: React.FC = () => {
  const [name, setName] = React.useState<string>('Nombre Apellidos');
  const [email, setEmail] = React.useState<string>('correo@gmail.com');
  const [phone, setPhone] = React.useState<string>('+52 00 0000 0000');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edita tu perfil</Text>

      {/* Profile Image */}
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.profileImage}
      />

      {/* Name Field */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre Apellidos"
      />

      {/* Email Field */}
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="correo@gmail.com"
      />
      <TouchableOpacity>
        <Text style={styles.changePasswordText}>cambiar contraseña</Text>
      </TouchableOpacity>

      {/* Phone Field */}
      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="+52 00 0000 0000"
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar información</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 15,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#2E7D32',
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  changePasswordText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'right',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
