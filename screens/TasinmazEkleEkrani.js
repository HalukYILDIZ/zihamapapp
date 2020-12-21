// @refresh reset
import React, { useState, useEffect } from "react";
//import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Dimensions,
  Alert,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
//import firebase from "../firebase/index";
import * as firebase from "firebase";
import "firebase/firestore";
//import Auth from "./AuthScreen";

//const Stack = createStackNavigator();

const { width, height } = Dimensions.get("window");

export default function TasinmazEkleEkrani({ route }) {
  const zeminId = route.params.zeminId ? route.params.zeminId : null;
  const tasinmaz = route.params.item ? route.params.item : null;

  const [sahip, setSahip] = useState(tasinmaz ? tasinmaz.tasinmazsahibi : "");
  const [aciklama, setAciklama] = useState(tasinmaz ? tasinmaz.aciklama : "");
  const [id, setId] = useState(tasinmaz ? `${tasinmaz.zeminId}` : "");
  const [tel, setTel] = useState(tasinmaz ? tasinmaz.telefon : "");

  const veriekle = (id, veri) => {
    eklenmisVeri = {
      ...veri,
      tasinmazsahibi: sahip,
      aciklama: aciklama,
      telefon: tel,
    };
    firebase
      .firestore() //firebase.db
      .collection("tarla")
      .doc(id)
      .set(eklenmisVeri)
      .then(function () {
        Alert.alert("Başarılı", "Taşınmaz kaydı başarıyla gerçekleşti.");
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
        <Button title="Taşınmaz Ekle" onPress={() => getApi(id)} />
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
    // padding: 30,
    marginTop: 0,
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
