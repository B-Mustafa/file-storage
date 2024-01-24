import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB0RIpmar0RFgnmm-vCkgvUNsBfg1Hi-DM",
    authDomain: "file-storage-4691b.firebaseapp.com",
    projectId: "file-storage-4691b",
    storageBucket: "file-storage-4691b.appspot.com",
    messagingSenderId: "46056907197",
    appId: "1:46056907197:web:039678c037e7cd849eb2d4",
    measurementId: "G-02QEPL86HL"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };