// services/authService.ts
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";


// Función para iniciar sesión
export async function logIn(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario autenticado con éxito");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}

// Función para cerrar sesión
export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
    console.log("Usuario desconectado con éxito");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}
/*
 // components/LoginScreen.tsx

 // Este es un componente de React Native para la pantalla de inicio de sesión. 
 // Permite al usuario iniciar y cerrar sesión en Firebase utilizando las funciones de autenticación.

 import React, { useState } from "react";
 import { View, TextInput, Button, Text, Alert } from "react-native";
 import { logIn, logOut } from "../services/authService";

 // Definición del componente de pantalla de inicio de sesión
 export default function LoginScreen() {
   // Variables de estado para almacenar el correo electrónico y la contraseña
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // Función para manejar el inicio de sesión
   const handleLogin = async () => {
     try {
       // Intenta iniciar sesión con las credenciales proporcionadas
       await logIn(email, password);
       Alert.alert("Inicio de sesión exitoso"); // Muestra un mensaje de éxito
     } catch (error) {
       // Si ocurre un error, muestra un mensaje de error
       Alert.alert("Error al iniciar sesión", error.message);
     }
   };

   // Función para manejar el cierre de sesión
   const handleLogout = async () => {
     try {
       // Intenta cerrar la sesión del usuario
       await logOut();
       Alert.alert("Cierre de sesión exitoso"); // Muestra un mensaje de éxito
     } catch (error) {
       // Si ocurre un error, muestra un mensaje de error
       Alert.alert("Error al cerrar sesión", error.message);
     }
   };*/