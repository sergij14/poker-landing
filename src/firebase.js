import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyApOh3BWWmatvxoqWKCF0qJ-DsLdy8xCvo",
  authDomain: "app-mima-landing.firebaseapp.com",
  projectId: "app-mima-landing",
  storageBucket: "app-mima-landing.appspot.com",
  messagingSenderId: "77540184557",
  appId: "1:77540184557:web:9b0d89ddc7e725392497e4",
};

if (!firebase.apps.length) firebase.initializeApp(config);

export const firestore = firebase.firestore();

export const createCustomerDoc = async (data, errTxt) => {
  const customerRef = firestore.doc(`customers/${data.email.toLowerCase()}`);
  const snapShot = await customerRef.get();

  if (!snapShot.exists) {
    const { first_name, last_name, email, username } = data;
    const createdAt = new Date();
    try {
      await customerRef.set({
        "First Name": first_name,
        "Last Name": last_name,
        Username: username,
        Email: email,
        "Created At": createdAt,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    throw new Error(errTxt);
  }
  return customerRef;
};
