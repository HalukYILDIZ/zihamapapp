import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from "react-native";
//import MapView, { PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import firebase from "../firebase/index";
import PlanCardItem from "../components/PlanCardItem";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";

export default function PlanEkrani() {
  useFirestoreConnect([
    {
      collectionGroup: "etkinlik",
      storeAs: "etkinlik",
      orderBy: [["plan"], ["tarih"]],
    },
  ]);
  const etkinlikler = useSelector((state) => state.firestore.ordered.etkinlik);
  // console.log(etkinlikler);

  //const Item = ({ item }) => <PlanCardItem item={item} />;

  // const [loading, setLoading] = useState(false);
  // const [tableDatas, setTableDatas] = useState(false);
  // const [openMap, setOpenMap] = useState(false);

  const renderItem = ({ item }) => <PlanCardItem key={item.id} item={item} />;

  // useEffect(() => {
  //   const ref = firebase.db.collectionGroup("etkinlik").orderBy("plan");

  //   const getTableDatas = () => {
  //     setLoading(true);
  //     ref.onSnapshot((querySnapshot) => {
  //       const items = [];
  //       querySnapshot.forEach((doc) => {
  //         items.push(doc.data());
  //       });
  //       setTableDatas(items);
  //       setLoading(false);
  //     });
  //   };

  //   getTableDatas();
  // }, []);

  if (!isLoaded(etkinlikler)) {
    return (
      <View style={[styles.containeri, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={etkinlikler}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
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
  button: {
    paddingHorizontal: 5,
    margin: 10,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  screen: {
    marginHorizontal: 10,
    marginVertical: 0,
  },
  summaryAlt: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  summaryUst: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    padding: 4,
  },
  altsummaryUst: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },
  summary: {
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontSize: 16,
    flexDirection: "column",
    fontWeight: "bold",
  },
  amount: {
    color: "grey",
    fontSize: 16,
    fontStyle: "italic",
  },
  id: {
    color: "red",
    fontSize: 16,
    fontStyle: "italic",
  },
  elemenets: {
    flex: 1,
    flexDirection: "column",
  },
  map: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 300,
  },
});
