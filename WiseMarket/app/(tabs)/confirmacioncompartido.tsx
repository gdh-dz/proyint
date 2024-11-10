import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import { addUserToList } from '@/services/lists'; // Aquí va el servicio que agregará al usuario

const AgregarUsuarioLista: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Función para agregar al usuario a la lista
    const agregarUsuario = async () => {
      try {
        const result = await addUserToList('userId', 'listId'); // Pasa el ID del usuario y el ID de la lista
        if (result) {
          setMessage('¡Usuario agregado a la lista con éxito!');
        } else {
          setMessage('Hubo un error al agregar al usuario.');
        }
      } catch (error) {
        setMessage('Error de conexión.');
        ToastAndroid.show('Error de conexión.', ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    };

    agregarUsuario();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#34C759" />
      ) : (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
    textAlign: 'center',
  },
});

export default AgregarUsuarioLista;
