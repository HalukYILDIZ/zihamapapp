// @refresh reset
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Dimensions,
  Alert,
} from "react-native";
import firebase from "./firebase/index";
//import * as firebase from "firebase";
//import "firebase/firestore";
import Auth from "./screens/AuthScreen";

const Stack = createStackNavigator();

const { width, height } = Dimensions.get("window");

export default function Home() {
  const [sahip, setSahip] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [id, setId] = useState("");
  const [tel, setTel] = useState("");

  //   useEffect(() => {
  //     var firebaseConfig = {
  //       apiKey: "AIzaSyAAJcxKjP0D3v7cOwTKhZr_o9fl1PIotJk",
  //       authDomain: "zihatim.firebaseapp.com",
  //       databaseURL:
  //         "https://zihatim-default-rtdb.europe-west1.firebasedatabase.app",
  //       projectId: "zihatim",
  //       storageBucket: "zihatim.appspot.com",
  //       messagingSenderId: "302815205710",
  //       appId: "1:302815205710:web:ee4b946cb97cdef721a61f",
  //       measurementId: "G-M8B1QJ9DN6",
  //     };
  //     if (!firebase.apps.length) {
  //       firebase.initializeApp(firebaseConfig);
  //     } else {
  //       firebase.app(); // if already initialized, use that one
  //     }
  //     dbh = firebase.firestore();

  //     firebase.auth().onAuthStateChanged((auth) => {
  //       if (auth) {
  //         console.log("girildi");
  //       } else {
  //         console.log("auth sağlanamadı");
  //         return <Auth />;
  //       }
  //     });
  //   }, []);

  const veriekle = (id, veri) => {
    eklenmisVeri = {
      ...veri,
      tasinmazsahibi: sahip,
      aciklama: aciklama,
      telefon: tel,
    };
    firebase.db
      .collection("tarla")
      .doc(id)
      .set(eklenmisVeri)
      .then(function () {
        Alert.alert("Başarılı", "Taşınmaz kaydı başarıyla gerçekleşti.");
        setAciklama("");
        setTel("");
        setId("");
        setSahip("");
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const getApi = (tasinmazid) => {
    const sendRequest = async (tasinmazid) => {
      const response = await fetch(
        `https://cbsservis.tkgm.gov.tr/megsiswebapi.v3/api/zemin/${tasinmazid}`,
        {
          method: "GET",
          headers: {},
        }
      );
      const responseData = await response.json();
      const coordinates = responseData.geometry.coordinates;
      const [arraylist] = coordinates;
      const locations = arraylist.map(([lng, lat]) => ({ lng, lat }));
      const tarlaVerisiProperties = responseData.properties;
      const tarlaVerisi = { ...tarlaVerisiProperties, coordinates: locations };
      veriekle(tasinmazid, tarlaVerisi);
    };
    sendRequest(tasinmazid);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="taşınmaz sahibi ismi"
        value={sahip}
        onChangeText={setSahip}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="taşınmaz sahibi telefonu"
        value={tel}
        onChangeText={setTel}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="açıklama"
        value={aciklama}
        onChangeText={setAciklama}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="taşınmaz id ekle"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <View style={styles.button}>
        <Button title="Taşınmaz No Ekle" onPress={() => getApi(id)} />
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
    color: "red",
  },
});
