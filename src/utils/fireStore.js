import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export const addDocuments = async (collectionName, data) => {
  try {
    console.log(`📌 Attempting to add document to ${collectionName} with data:`, data);
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("✅ Document added with ID:", docRef.id);
  } catch (error) {
    console.error("❌ Error adding document: ", error);
  }
};

// Function to fetch all documents from a collection
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

// Function to delete a document by ID
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log("Document deleted from Firestore!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

