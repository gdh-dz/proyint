// services/userService.ts
import { User } from "@/models/User";
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {app} from "../firebaseConfig"; // Asegúrate de ajustar la ruta

// Inicializa Firebase Authentication y Firestore usando la instancia de la app
const auth = getAuth(app); // Usa la instancia de Firebase App
const firestore = getFirestore(app); // Usa la instancia de Firebase App

export async function createUser(email: string, password: string, name: string): Promise<{ uid: string; email: string; name: string }> {
  try {
    // Crear usuario en Firebase Authentication
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Crear instancia de usuario y subir a Firestore}
    try{
    const newUser = new User(email, name);
    const userDocRef = doc(firestore, "users", uid);
    await setDoc(userDocRef, newUser.toFirestore());
    }catch(error){
        throw new Error(`Error registering user: ${error}`); // Lanza un error más específico

    }

    return { uid, email, name };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(`Error creating user: ${error}`); // Lanza un error más específico
  }
}
//GetListsByUserID
//LogOut
//SignIn

