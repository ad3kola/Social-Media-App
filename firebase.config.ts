import { initializeApp } from "firebase/app";
import {collection, doc, getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDuPCDkNjg502-rbsVEVqKE3oYPhDkAfgs",
  authDomain: "social-media-app-9b39a.firebaseapp.com",
  projectId: "social-media-app-9b39a",
  storageBucket: "social-media-app-9b39a.appspot.com",
  messagingSenderId: "243103921444",
  appId: "1:243103921444:web:7aeecb9f8df817584f2fb1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const postsCollectionRef = collection(db, 'all-posts')
export const communitiesCollectionRef = collection(db, 'all-communitiy-members')
