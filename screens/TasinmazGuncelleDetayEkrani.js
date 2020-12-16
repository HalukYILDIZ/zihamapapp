// @refresh reset
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
//import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Dimensions,
  Alert,
} from "react-native";
import firebase from "../firebase/index";
//import * as firebase from "firebase";
//import "firebase/firestore";
import Auth from "./AuthScreen";

//const Stack = createStackNavigator();

const { width, height } = Dimensions.get("window");

export default function TasinmazGuncelleDetayEkrani({ navigation, route }) {
  const zeminId = route.params.zeminId;
  const tasinmaz = route.params.item;
  const [sahip, setSahip] = useState(tasinmaz ? tasinmaz.tasinmazsahibi : "");
  const [aciklama, setAciklama] = useState(tasinmaz ? tasinmaz.aciklama : "");
  const [id, setId] = useState(tasinmaz ? `${tasinmaz.zeminId}` : "");
  const [tel, setTel] = useState(tasinmaz ? tasinmaz.telefon : "");

  const veriekle = (id) => {
    const eklenmisVeri = {
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
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="taşınmaz id ekle"
        value={id}
        editable={false}
        onChangeText={setId}
        keyboardType="numeric"
      />
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

      <View style={styles.button}>
        <Button
          title="Taşınmaz Bilgilerini Güncelle"
          onPress={() => veriekle(id)}
        />
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
