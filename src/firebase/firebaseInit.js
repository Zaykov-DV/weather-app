import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBACtdhImVNbbXb7tvUnARTP4p-I2TQj_A",
    authDomain: "weather-app-1fa02.firebaseapp.com",
    projectId: "weather-app-1fa02",
    storageBucket: "weather-app-1fa02.appspot.com",
    messagingSenderId: "777328459015",
    appId: "1:777328459015:web:5bfeb8671851cae9a799a2"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()