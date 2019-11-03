import * as firebase from "firebase";

//Initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyCsRgKxUDhImaHOEnCRaEqeZh2pJmb1p6A",
  authDomain: "react-native-for-designe-1b8b6.firebaseapp.com",
  databaseURL: "https://react-native-for-designe-1b8b6.firebaseio.com",
  storageBucket: "gs://react-native-for-designe-1b8b6.appspot.com/"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
