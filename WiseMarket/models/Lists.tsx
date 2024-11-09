// models/List.tsx
import { QueryDocumentSnapshot } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { User } from "./User";
const db = getFirestore(app);

export class List {
  budget: number;
  creationDate: Date;
  listName: string;
  usersInList: User[];
  montoArticulos: number;
  montoLista: number;
  status: string;
  totalPrice: number;

  constructor(
    budget: number,
    creationDate: Date,
    listName: string,
    usersInList: User[],
    montoArticulos: number,
    montoLista: number,
    status: string,
    totalPrice: number
  ) {
    this.budget = budget;
    this.usersInList = usersInList
    this.creationDate = creationDate;
    this.listName = listName;
    this.montoArticulos = montoArticulos;
    this.montoLista = montoLista;
    this.status = status;
    this.totalPrice = totalPrice;
  }

  toFirestore(): {
    budget: number;
    creationDate: Date;
    listName: string;
        usersInList: User[],

    montoArticulos: number;
    montoLista: number;
    status: string;
    totalPrice: number;
  } {
    return {
      budget: this.budget,
      creationDate: this.creationDate,
      listName: this.listName,
      usersInList: this.usersInList,
      montoArticulos: this.montoArticulos,
      montoLista: this.montoLista,
      status: this.status,
      totalPrice: this.totalPrice,
    };
  }

  static fromFirestore(snapshot: QueryDocumentSnapshot): List {
    const data = snapshot.data();
    return new List(
      data.budget,
      data.creationDate.toDate(),
      data.listName,
      data.usersInList,
      data.montoArticulos,
      data.montoLista,
      data.status,
      data.totalPrice
    );
  }
}
