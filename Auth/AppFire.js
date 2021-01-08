import firebase from "firebase";
import * as firebaseConfigs from "../google-services.json";

const firebaseConfig = {
  apiKey: firebaseConfigs.client[0].api_key[0].current_key,
  authDomain: `${firebaseConfigs.project_info.project_id}.firebaseapp.com`,
  //databaseURL: 'XXXX',
  projectId: firebaseConfigs.project_info.project_id,
  //storageBucket: '',
  //messagingSenderId: 'XXXX',
  appId: firebaseConfigs.client[0].client_info.mobilesdk_app_id,
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
