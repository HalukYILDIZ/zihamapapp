import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import firebase from "../firebase/index";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
const { width, height } = Dimensions.get("window");
const Item = ({ zeminId }) => (
  <TouchableOpacity
    key={zeminId}
    onPress={() => navigation.navigate("EtkinlikDetay", { zeminId: zeminId })}
  >
    <View style={styles.item}>
      <Text style={styles.title}>{zeminId}</Text>
    </View>
  </TouchableOpacity>
);

export default function etkinlikEkrani({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [tarih, setTarih] = useState("01-01-2021");
  const [saat, setSaat] = useState("08.00-10.00");
  const [islem, setIslem] = useState("ilaçlama");
  const [alan, setAlan] = useState("");
  const [plan, setPlan] = useState("Planlandı");
  const [medya, setMedya] = useState(
    "https://www.youtube.com/watch?v=94425VHLPFk"
  );

  const renderItem = ({ item }) => <Item zeminId={item.zeminId} />;

  const eklentiYaz = (zeminId, data) => {
    firebase.db
      .collection("tarla")
      .doc(`${zeminId}`)
      .collection("etkinlik")
      .doc(`${zeminId}-${tarih}-${saat}`)
      .set(data)
      .then(function () {
        Alert.alert("Başarılı", "Etkinlik kaydı başarıyla gerçekleşti.");
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  // useEffect(() => {
  //   setLoading(true);
  //   let snapshot = firebase.db
  //     .collection("tarla")
  //     .doc(`${route.params.zeminId}`)
  //     .collection("coordinates")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.id, " => ", doc.data());
  //         console.log("******************************************");
  //       });
  //     });

  //   //setTableDatas(items);
  //   setLoading(false);
  // }, []);

  if (loading) {
    return (
      <View style={[styles.containeri, styles.horizontal]}>
        <ActivityIndicator />
        <ActivityIndicator size="large" />
        <ActivityIndicator size="small" color="#0000ff" />
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={`${route.params.zeminId}`}
          editable={false}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="tarih"
          value={tarih}
          onChangeText={setTarih}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="saat aralığı"
          value={saat}
          onChangeText={setSaat}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="işlem türü"
          value={islem}
          onChangeText={setIslem}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="ilaçlanan alan m2"
          value={alan}
          onChangeText={setAlan}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="planlandı/tamamlandı"
          value={plan}
          onChangeText={setPlan}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="medya"
          value={medya}
          onChangeText={setMedya}
          keyboardType="default"
        />
        <View style={styles.button}>
          <Button
            title="Etkinlik Ekle"
            onPress={() =>
              eklentiYaz(route.params.zeminId, {
                id: `${route.params.zeminId}-${tarih}-${saat}`,
                tarih: tarih,
                saat: saat,
                islem: islem,
                ilaclananalan: alan,
                plan: plan,
                medya: medya,
              })
            }
          />
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
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
  item: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  containeri: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
