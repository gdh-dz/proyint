// WiseMarket/app/(tabs)/signup.tsx
import { createUser } from "@/services/userservices";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from "react-native";

export default function SignupScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!email || !password || !name || !phone) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    
    setLoading(true);
    try {
      const user = await createUser(email, password, name, phone);
      Alert.alert("Success", `User ${user.name} created successfully!`);
    } catch (error) {
      Alert.alert("Error", "Failed to create user. Please try again.");
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/SignUp3.png')} // Verifica que la ruta sea correcta
        style={styles.backgroundImage}
        resizeMode="cover" // Asegura que la imagen cubra todo el contenedor
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title={loading ? "Registering..." : "Register"} onPress={handleRegister} disabled={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Alinear el contenido en el centro horizontalmente
    backgroundColor: "transparent", // Cambia a transparente para que se vea la imagen de fondo
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 1, // Ajusta la opacidad según sea necesario
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    zIndex: 1, // Asegúrate de que el contenido esté por encima de la imagen
    width: '100%', // Asegura que el contenedor ocupe todo el ancho
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000", // Asegúrate de que el texto sea visible
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
