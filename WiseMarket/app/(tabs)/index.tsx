import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Dimensions, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const myLists = ['Lista 1', 'Lista 2', 'Lista 3']; // Datos de ejemplo para "Mis listas"
  const sharedLists = ['Lista C1', 'Lista C2']; // Datos de ejemplo para "Listas compartidas"

  // Renderiza cada elemento de la lista
  const renderListItem = (title: string) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listFrame} />
      <Text style={styles.listText}>{title}</Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#256847" />
      <SafeAreaView style={styles.container}>
        {/* Frame que contiene la barra de búsqueda */}
        <View style={styles.searchFrame}>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar lista..."
            placeholderTextColor="#A9A9A9"
          />
        </View>

        {/* Contenedor para las secciones de listas agrupadas en un frame */}
        <View style={styles.listsContainer}>
          <View style={styles.listSectionsContainer}>
            {/* Frame de "Mis listas" */}
            <View style={styles.sectionFrame}>
              <View style={styles.tagContainer}>
                <Text style={styles.sectionTag}>Mis listas</Text>
              </View>
              <FlatList
                horizontal
                data={myLists}
                renderItem={({ item }) => renderListItem(item)}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.carouselContainer}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            {/* Frame de "Listas compartidas" */}
            <View style={styles.sectionFrame}>
              <View style={styles.tagContainer}>
                <Text style={styles.sectionTag}>Listas compartidas</Text>
              </View>
              <FlatList
                horizontal
                data={sharedLists}
                renderItem={({ item }) => renderListItem(item)}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.carouselContainer}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* Botón "Crear lista" */}
          <TouchableOpacity style={styles.createListButton}>
            <Text style={styles.createListButtonText}>Crear lista</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#256847', // Fondo verde para toda la pantalla
  },
  searchFrame: {
    width: '100%',
    backgroundColor: '#256847', // Color verde para el frame de búsqueda
    paddingVertical: 20, // Espacio arriba y abajo de la searchBar
    alignItems: 'center',
    justifyContent: 'center',
  },
  listsContainer: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco para el contenedor de listas
    paddingVertical: 10, // Espacio vertical para el contenedor de listas
    alignItems: 'center', // Centrar contenido horizontalmente
  },
  searchBar: {
    width: width * 0.9, // 90% del ancho de la pantalla
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0', // Fondo gris claro para la barra de búsqueda
    color: '#000', // Color del texto de entrada
  },
  listSectionsContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Alinear al inicio
    alignItems: 'flex-start', // Alinear a la izquierda para que queden más alineados
    paddingHorizontal: 10, // Ajusta el padding horizontal según sea necesario
  },
  sectionFrame: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 20, // Aumentar el margen inferior para mayor separación
  },
  tagContainer: {
    borderRadius: 20,
    overflow: 'hidden', // Asegura que el borde redondeado se aplique correctamente
    backgroundColor: '#5F7F1E', // Verde pasto para el tag
  },
  sectionTag: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#FFF',
    fontWeight: 'medium', // Cambiar a '500' para consistencia
    textAlign: 'center',
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  listItemContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  listFrame: {
    width: 150,
    height: 100, // Ajusta la altura según sea necesario
    borderRadius: 10,
    backgroundColor: '#e0e0e0', // Fondo gris para los cuadros
    marginBottom: 5,
  },
  listText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  createListButton: {
    backgroundColor: '#fff', // Fondo blanco para el botón
    paddingVertical: 100,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5, // Acercar el botón a las listas
    alignItems: 'center',
    justifyContent: 'center',
  },
  createListButtonText: {
    color: '#256847', // Texto verde
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20, // Ajustar el lineHeight si es necesario
  },
});

export default HomeScreen;
