// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD9yiI1azyAdOcynxYPqRwOkVDMG9iBgoI',
  authDomain: 'findone-0.firebaseapp.com',
  projectId: 'findone-0',
  storageBucket: 'findone-0.appspot.com',
  messagingSenderId: '759377741734',
  appId: '1:759377741734:web:08463ac18fac32776db167',
  measurementId: 'G-RFHC3X8GFH'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
