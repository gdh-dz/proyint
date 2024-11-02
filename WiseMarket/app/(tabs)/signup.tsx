// WiseMarket/app/(tabs)/signup.tsx
import { createUser } from "@/services/userservices";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";

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
        resizeMode="cover"
      />
      <View style={styles.outerFrame}>
        <TouchableOpacity style={styles.switchButton}>
          <Text style={styles.switchButtonText}>Log In / Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <View style={styles.inputContainer}>
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
        </View>
        <Button title={loading ? "Registering..." : "Registrar"} onPress={handleRegister} disabled={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 1,

  },
  outerFrame: {
    // margin: 0,
    paddingVertical: 25,  // Padding de 100 px arriba y abajo
    paddingHorizontal: 75,
  
    backgroundColor: "rgba(37, 104, 71, .9)", // Fondo ligero para visibilidad
    borderRadius: 20,
    alignItems: "center",
},

  switchButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FFF",
    marginBottom: 41,
  },
  switchButtonText: {
    fontSize: 16,
    color: "#5F7F1E",
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "regular",
    textAlign: "center",
    marginBottom: 41,
    color: "#FFFF",
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
    borderColor: "#ccc",
    borderWidth: 1,


  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10, // Cambié a 10 para más espacio interno
    marginBottom: 16,
    backgroundColor: "#fff",
    width: '100%', // Establece el ancho al 100% del contenedor
},

});

