// models/Category.tsx
import { QueryDocumentSnapshot } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export class Category {
  nombre: string;
  listId: string;  // ID de la lista a la que pertenece la categoría

  constructor(nombre: string, listId: string) {
    this.nombre = nombre;
    this.listId = listId;
  }

  toFirestore(): { nombre: string; listId: string } {
    return {
      nombre: this.nombre,
      listId: this.listId,
    };
  }

  static fromFirestore(snapshot: QueryDocumentSnapshot): Category {
    const data = snapshot.data();
    return new Category(data.nombre, data.listId);
  }
}
