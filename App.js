// @refresh reset
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Dimensions,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
const { width, height } = Dimensions.get("window");
import App from "./App2";

export default function AuthScreen() {
  const [email, setEmail] = useState("zihatim06@gmail.com");
  const [pass, setPass] = useState("Ankarada06");

  const [login, setLogin] = useState(false);

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyAAJcxKjP0D3v7cOwTKhZr_o9fl1PIotJk",
      authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
      projectId: "zihatim",
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) {
        console.log("girildi");
        // console.log(auth.email);
        setLogin(true);
      } else {
        console.log("olmadı");
        setLogin(false);
      }
    });
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        Alert.alert("Çıkış Başarılı", "Tekrar Giriş Yapın.");
      })
      .catch((error) => {
        // An error happened.
        Alert.alert("Çıkış Başarısız", "Çıkış yaparken bir hata oluştu.");
      });
  };

  const kayitol = () => {
    console.log("kayıtol butonuna basıldı");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((user) => {
        console.log("kayıtoldu");
        Alert.alert("Kayıt Başarılı", "  Hoşgeldiniz.");
        // Signed in
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert("Kayıt Başarısız", `${errorMessage}`);
      });
  };
  const girisyap = () => {
    console.log("girisyap butonuna basıldı");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((user) => {
        console.log(user);
        Alert.alert("Giriş Başarılı", `${email}`);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert("Giriş Başarısız", `${errorMessage}`);
        console.log(errorMessage);
      });
  };

  if (login) {
    return <App signOut={signOut} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail Adresi"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button title="Giriş Yap" onPress={girisyap} />
      </View>
      <View style={styles.button}>
        <Button title="Kayıt Ol" onPress={kayitol} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    marginTop: 10,
    width: width - 40,
    padding: 10,
    fontSize: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "grey",
  },
  button: {
    margin: 10,
    width: width - 50,
  },
});
