// WiseMarket/app/(tabs)/login.tsx
import { loginUser } from "@/services/userservices";
import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email && !phone) {
      Alert.alert("Error", "Por favor, ingresa tu correo o teléfono.");
      return;
    }
    if (!password) {
      Alert.alert("Error", "La contraseña es requerida.");
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser(email || phone, password); // Cambia a tu servicio de login
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión. Inténtalo de nuevo.");
      console.error("Error en el inicio de sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/SignUp3.png')}
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
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#A8A8A8"
          />
          <Text style={styles.orText}>ó</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#A8A8A8"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#A8A8A8"
          />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, { opacity: loading ? 0.6 : 1 }]}
          onPress={loading ? undefined : handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Text>
        </TouchableOpacity>
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
  },
  outerFrame: {
    width: '85%',
    maxWidth: 310,
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: "rgba(37, 104, 71, .9)",
    borderRadius: 20,
    alignItems: "center",
  },
  switchButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#5F7F1E",
    paddingHorizontal: 15,
    marginBottom: 41,
  },
  switchButtonText: {
    fontSize: 16,
    color: "#FFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 41,
    color: "#FFFF",
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: 5,
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: '#5F7F1E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'medium',
  },
});
