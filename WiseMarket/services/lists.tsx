// services/ListService.tsx
import {db} from "../firebaseConfig"; // Asegúrate de ajustar la ruta
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { List } from "../models/Lists";

// Función para obtener una lista por su ID
export async function getListById(listId: string): Promise<List | null> {
  const docRef = doc(db, "Lista", listId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? List.fromFirestore(docSnap) : null;
}


// Obtener usuarios asociados a una lista específica
export async function getUsersInList(listId: string): Promise<any[]> {
  const listDocRef = doc(db, "Lista", listId);
  const listSnap = await getDoc(listDocRef);
  
  if (listSnap.exists()) {
    const listData = listSnap.data();
    return listData.usersInList || [];
  } 
  return [];
}

// Añadir un usuario a una lista específica
export async function addUserToList(listId: string, userId: string): Promise<void> {
  const listDocRef = doc(db, "Lista", listId);
  await updateDoc(listDocRef, {
    usersInList: arrayUnion(userId)
  });
}

// Obtener listas a las que está asociado un usuario específico
export async function getListsByUserId(userId: string): Promise<List[]> {
  const listsQuery = query(collection(db, "Lista"), where("usersInList", "array-contains", userId));
  const querySnapshot = await getDocs(listsQuery);
  return querySnapshot.docs.map(doc => List.fromFirestore(doc));
}
// Obtener solo listas donde el usuario está solo en esa lista
export async function getIndividualListsByUserId(userId: string): Promise<List[]> {
  const listsQuery = query(collection(db, "Lista"), where("usersInList", "array-contains", userId));
  const querySnapshot = await getDocs(listsQuery);
  
  const individualLists: List[] = [];
  
  querySnapshot.forEach((doc) => {
    const listData = doc.data();
    // Verifica si la lista tiene solo un usuario (el usuario logueado)
    if (listData.usersInList && listData.usersInList.length === 1) {
      individualLists.push(List.fromFirestore(doc));
    }
  });

  return individualLists;
}

export async function getCollaborativeListsByUserId(userId: string): Promise<List[]> {
  const listsQuery = query(collection(db, "Lista"), where("usersInList", "array-contains", userId));
  const querySnapshot = await getDocs(listsQuery);
  
  const collaborativeLists: List[] = [];
  
  querySnapshot.forEach((doc) => {
    const listData = doc.data();
    // Verifica si la lista tiene más de un usuario
    if (listData.usersInList && listData.usersInList.length > 1) {
      collaborativeLists.push(List.fromFirestore(doc));
    }
  });

  return collaborativeLists;
}

// Obtener usuarios asociados a una lista específica
export async function getListUsersbyListID(listId: string): Promise<any[]> {
  const usersQuery = query(collection(db, "Users"), where("listId", "==", listId));
  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map(doc => doc.data());
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
