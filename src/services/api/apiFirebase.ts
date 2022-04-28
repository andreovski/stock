import { db } from "../firebase"

import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore"

export const get = async (collectionProp) => {
  const collectionRef = collection(db, collectionProp)
  const data = await getDocs(collectionRef)

  if (!data) return null

  return data.docs.map((i) => i.data())
}

export const post = async (collectionProp, data) => {
  const collectionRef = collection(db, collectionProp)

  try {
    await addDoc(collectionRef, data)
  } catch (err) {
    throw new Error(err)
  }
}

export const put = async (collectionProp, id, data) => {
  const docRef = doc(db, collectionProp, id)

  await updateDoc(docRef, data)
}

export const deleted = async (collectionProp, id) => {
  const docRef = doc(db, collectionProp, id)

  await deleteDoc(docRef)
}
