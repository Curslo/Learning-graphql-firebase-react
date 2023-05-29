import {initializeApp} from 'firebase/app';

import {
    getFirestore, collection, getDocs,
    addDoc
} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwmM0Fp9r_0CQhVPOOxJI_siuMXQe9s8E",
    authDomain: "firebas-9-dojo-566f1.firebaseapp.com",
    projectId: "firebas-9-dojo-566f1",
    storageBucket: "firebas-9-dojo-566f1.appspot.com",
    messagingSenderId: "439644418909",
    appId: "1:439644418909:web:380a44eb3659b7aac02eb4",
    measurementId: "G-XTH5MYC8ZW"
  };

  //init firebase App
  initializeApp(firebaseConfig);

  //init Service
const db = getFirestore();

  //Collection ref
const colRef = collection(db, 'books');

  //get collection data
getDocs(colRef)
.then((snapshot) => {
    let books = []

    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})
.catch(err => {
    console.log(err.message)
})

//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('sudmit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    tittle: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset
  });
})

//deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('sudmit', (e) => {
  e.preventDefault()
})