import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError

// Función para iniciar sesión
export async function logIn(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario autenticado con éxito");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    
    // Type assertion for FirebaseError
    const firebaseError = error as FirebaseError; 
    
    let errorMessage;
    switch (firebaseError.code) {
      case 'auth/user-not-found':
        errorMessage = 'No hay ningún usuario con este correo electrónico.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'La contraseña es incorrecta.';
        break;
      default:
        errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
    }
    
    throw new Error(errorMessage); // Error message
  }
}

// Función para cerrar sesión
export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
    console.log("Usuario desconectado con éxito");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
}
