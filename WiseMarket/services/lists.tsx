// services/ListService.tsx
import {db} from "../firebaseConfig"; // Asegúrate de ajustar la ruta
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { List } from "../models/Lists";

// Función para obtener una lista por su ID
export async function getListById(listId: string): Promise<List | null> {
  const docRef = doc(db, "Lista", listId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? List.fromFirestore(docSnap) : null;
}

// Obtener usuarios asociados a una lista específica
export async function getListUsersbyListID(listId: string): Promise<any[]> {
  const usersQuery = query(collection(db, "Users"), where("listId", "==", listId));
  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map(doc => doc.data());
}

export async function getListsByUserId(userId: string): Promise<List[]> {
  const listsQuery = query(collection(db, "Lista"), where("userId", "==", userId));
  const querySnapshot = await getDocs(listsQuery);
  return querySnapshot.docs.map(doc => List.fromFirestore(doc));
}
// Obtener productos asociados a una lista específica
export async function getProductsbyListID(listId: string): Promise<any[]> {
  const productsQuery = query(collection(db, "Products"), where("listId", "==", listId));
  const querySnapshot = await getDocs(productsQuery);
  return querySnapshot.docs.map(doc => doc.data());
}

// Crear una nueva lista
export async function createList(list: List, listId: string): Promise<void> {
  await setDoc(doc(db, "Lista", listId), list.toFirestore());
}

// Eliminar una lista
export async function deleteList(listId: string): Promise<void> {
  await deleteDoc(doc(db, "Lista", listId));
}

// Modificar una lista existente
export async function modifyList(listId: string, updatedData: Partial<List>): Promise<void> {
  const docRef = doc(db, "Lista", listId);
  await updateDoc(docRef, updatedData);
}
