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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "../firebase/index";
import InputSpinner from "react-native-input-spinner";

const { width, height } = Dimensions.get("window");
// const Item = ({ zeminId }) => (
//   <TouchableOpacity
//     key={zeminId}
//     onPress={() => navigation.navigate("EtkinlikDetay", { zeminId: zeminId })}
//   >
//     <View style={styles.item}>
//       <Text style={styles.title}>{zeminId}</Text>
//     </View>
//   </TouchableOpacity>
// );

export default function etkinlikEkrani({ route }) {
  const etkinlik = route.params.etkinlikItem;
  const [loading, setLoading] = useState(false);
  const [tarih, setTarih] = useState(
    etkinlik ? new Date(Number(etkinlik.id)) : new Date()
  );
  //const [saat, setSaat] = useState(etkinlik ? etkinlik.saat : new Date());
  const [islem, setIslem] = useState(
    etkinlik ? etkinlik.islem : "Süne İlaçlama"
  );
  const [alan, setAlan] = useState(etkinlik ? etkinlik.ilaclananalan : 0);
  const [plan, setPlan] = useState(etkinlik ? etkinlik.plan : "Planlandı");
  const [medya, setMedya] = useState(etkinlik ? etkinlik.medya : "");

  //const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || tarih;
    setShow(Platform.OS === "ios");
    setTarih(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const dateUTCConverter = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  };

  const renderItem = ({ item }) => <Item zeminId={item.zeminId} />;

  const eklentiYaz = (zeminId, data) => {
    firebase.db
      .collection("tarla")
      .doc(`${zeminId}`)
      .collection("etkinlik")
      .doc(
        route.params.etkinlikId ? route.params.etkinlikId : `${tarih.getTime()}`
      )
      .set(data)
      .then(function () {
        Alert.alert("Başarılı", "Etkinlik kaydı başarıyla gerçekleşti.");
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

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
    <SafeAreaView style={styles.containerUst}>
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            title="Etkinlik Ekle"
            onPress={() =>
              eklentiYaz(route.params.zeminId, {
                zeminId: route.params.zeminId,
                id: route.params.etkinlikId
                  ? route.params.etkinlikId
                  : `${tarih.getTime()}`,
                TimeStamp: tarih,
                tarih: `${tarih.toISOString().split("T")[0]}`,
                saat: `${dateUTCConverter(tarih)
                  .toISOString()
                  .split("T")[1]
                  .slice(0, 5)}`,
                islem: islem,
                ilaclananalan: alan,
                plan: plan,
                medya: medya,
                coordinates: route.params.coordinates,
                mahalleAd: route.params.mahalleAd,
              })
            }
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder={`${route.params.zeminId}`}
          editable={false}
          keyboardType="numeric"
          fontSize={26}
          backgroundColor="lightgrey"
        />
        <TextInput
          style={styles.input}
          placeholder="medya"
          value={medya}
          onChangeText={setMedya}
          keyboardType="default"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonDate}>
            <Button onPress={showDatepicker} title="Tarih Seç!" color="green" />
          </View>
          <View style={styles.buttonDate}>
            <Button onPress={showTimepicker} title="Saat Seç!" color="green" />
          </View>
          <TextInput
            style={{ ...styles.input, width: width - 250 }}
            placeholder="tarih"
            value={`${tarih.toISOString().split("T")[0]}  ${dateUTCConverter(
              tarih
            )
              .toISOString()
              .split("T")[1]
              .slice(0, 5)}`}
            editable={false}
            onChangeText={setTarih}
            keyboardType="numeric"
            fontSize={16}
            backgroundColor="lightgrey"
          />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={tarih}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Picker
          selectedValue={islem}
          style={{
            width: width - 40,
            height: 20,
            //alignSelf: "flex-start",
            flex: 1,
          }}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => setIslem(itemValue)}
        >
          <Picker.Item label="İlaçlama" value="İlaçlama" />
          <Picker.Item label="Süne İlaçlama" value="Süne İlaçlama" />
          <Picker.Item label="Kanola İlaçlama" value="Kanola İlaçlama" />
          <Picker.Item label="Mantar İlaçlama" value="Mantar İlaçlama" />
          <Picker.Item label="Sinek İlaçlama" value="Sinek İlaçlama" />
          <Picker.Item label="Mısır İlaçlama" value="Mısır İlaçlama" />
          <Picker.Item label="Soğan İlaçlama" value="Soğan İlaçlama" />
        </Picker>
        <InputSpinner
          max={1000000}
          min={0}
          step={10000}
          colorMax={"#f04048"}
          colorMin={"#40c5f4"}
          value={alan}
          fontSize={20}
          width={width - 40}
          onChange={(num) => {
            setAlan(num);
          }}
        />
        <Picker
          selectedValue={plan}
          style={{
            width: width - 40,
            height: 20,
            // alignSelf: "flex-start",
            flex: 1,
          }}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => setPlan(itemValue)}
        >
          <Picker.Item label="Planlandı" value="Planlandı" />
          <Picker.Item label="Tamamlandı" value="Tamamlandı" />
        </Picker>
        {/* <StatusBar style="auto" /> */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerUst: {
    backgroundColor: "#fff",
    alignItems: "baseline",
    justifyContent: "flex-start",
    padding: 10,
  },

  container: {
    backgroundColor: "#fff",
    // alignItems: "baseline",
    justifyContent: "flex-start",
    padding: 10,
  },
  containeralt: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
    // marginTop: 20,
    //paddingTop: 30,
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
    justifyContent: "space-between",
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
    fontSize: 20,
  },
  picker: {
    width: width,
    height: 20,
  },
  button: {
    margin: 10,
    width: width - 50,
    color: "red",
  },
  buttonDate: {
    margin: 10,
    width: 80,
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
