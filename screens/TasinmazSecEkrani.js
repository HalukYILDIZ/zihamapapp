import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  Button,
} from "react-native";
import firebase from "../firebase/index";

//import CardItem from "../components/CardItem";

export default function TasinmazSecEkrani({ navigation }) {
  const Item = ({ zeminId, item }) => (
    // <TouchableOpacity
    //   key={zeminId}
    //   onPress={() => navigation.navigate("Etkinlik", { zeminId: zeminId })}
    // >
    //   <View style={styles.item}>
    //     <Text style={styles.title}>{zeminId}</Text>
    //   </View>
    // </TouchableOpacity>
    <View style={styles.screen}>
      <View style={styles.summary}>
        <View style={styles.summaryAlt}>
          <View style={styles.elements}>
            <Text style={styles.summaryText}>
              Id: <Text style={styles.amount}>{item.zeminId}</Text>
            </Text>
          </View>
          <Text style={styles.summaryText}>
            İlçe: <Text style={styles.amount}>{item.ilceAd}</Text>
          </Text>
          <Text style={styles.summaryText}>
            Mahalle: <Text style={styles.amount}>{item.mahalleAd}</Text>
          </Text>
        </View>
        <View style={styles.summaryAlt}>
          <View style={styles.elements}>
            <Text style={styles.summaryText}>
              Ada: <Text style={styles.amount}>{item.adaNo}</Text>
            </Text>
          </View>
          <Text style={styles.summaryText}>
            Parsel: <Text style={styles.amount}>{item.parselNo}</Text>
          </Text>
          <Text style={styles.summaryText}>
            Alan: <Text style={styles.amount}>{item.alan}m2</Text>
          </Text>
        </View>
        <View>
          <Button
            color="red"
            title="Seç"
            onPress={() =>
              navigation.navigate("Etkinlik", { zeminId: zeminId })
            }
          />
        </View>
      </View>
    </View>
  );

  const [loading, setLoading] = useState(false);
  const [tableDatas, setTableDatas] = useState(false);

  const renderItem = ({ item }) => (
    <Item key={item.zeminId} zeminId={item.zeminId} item={item} />
  );

  useEffect(() => {
    const ref = firebase.db.collection("tarla");
    const getTableDatas = () => {
      setLoading(true);
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setTableDatas(items);
        setLoading(false);
      });
    };
    getTableDatas();
  }, []);

  if (loading) {
    return (
      <View style={[styles.containeri, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tableDatas}
        renderItem={renderItem}
        keyExtractor={(item) => item.pafta}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
  screen: {
    marginHorizontal: 10,
    marginVertical: 0,
  },
  summaryAlt: {
    flexDirection: "column",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 14,
    flexDirection: "column",
  },
  amount: {
    color: "blue",
  },
  elemenets: {
    flex: 1,
    flexDirection: "column",
  },
});
