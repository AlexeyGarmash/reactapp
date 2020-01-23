import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyA2sH-Ay6SK-xLkpbgTw5MiZUNJLrta0Gw",
    authDomain: "tifuapp-7ab3a.firebaseapp.com",
    databaseURL: "https://tifuapp-7ab3a.firebaseio.com",
    projectId: "tifuapp-7ab3a",
    storageBucket: "tifuapp-7ab3a.appspot.com",
    messagingSenderId: "552041417947",
    appId: "1:552041417947:web:6e90e209ae8617b28210fe"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase