import firebase from "firebase";
import { FIREBASE_CONFIG, FIRESTORE_COLLECTION } from "./constants";

export const initFirebase = () => {
  // Initialize Firebase
  firebase.initializeApp(FIREBASE_CONFIG);
  firebase.analytics();
  window.firestore = firebase.firestore();
  window.addToFirestore = async ({
    id,
    params,
  }: {
    id: string;
    params: any;
  }) => {
    const existingId = await window.getFromFirestore(id);

    if (existingId) {
      return window.firestore
        .collection(FIRESTORE_COLLECTION)
        .doc(id)
        .update(params)
        .then(function () {
          return id;
        })
        .catch(function (error: any) {
          console.error("Error adding document: ", error);
          return null;
        });
    }
    return window.firestore
      .collection(FIRESTORE_COLLECTION)
      .doc(id)
      .set(params)
      .then(function () {
        return id;
      })
      .catch(function (error: any) {
        console.error("Error adding document: ", error);
        return null;
      });
  };
  window.getFromFirestore = (id: string) => {
    var docRef = firebase.firestore().collection(FIRESTORE_COLLECTION).doc(id);
    return docRef
      .get()
      .then(function (doc: any) {
        if (doc.exists) {
          return doc.data();
        } else {
          // doc.data() will be undefined in this case

          return null;
        }
      })
      .catch(function (error: any) {
        return null;
      });
  };
};
