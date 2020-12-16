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
  TouchableOpacity,
} from "react-native";
import firebase from "../firebase/index";

export default function TasinmazSecEkrani({ navigation }) {
  const Item = ({ zeminId, item }) => (
    <TouchableOpacity
      key={zeminId}
      onPress={() => navigation.navigate("Etkinlik Sec", { zeminId: zeminId })}
    >
      <View style={styles.screen}>
        <View style={styles.summary}>
          <View style={styles.summaryUst}>
            <View style={styles.summaryAlt}>
              <View style={styles.elements}>
                <Text style={styles.summaryText}>
                  Id: <Text style={styles.id}>{item.zeminId}</Text>
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
                Pafta: <Text style={styles.amount}>{item.pafta}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.altsummaryUst}>
            <View style={styles.summaryAlt}>
              <View style={styles.elements}>
                <Text style={styles.summaryText}>
                  Taşınmaz Sahibi:
                  <Text style={styles.amount}>{item.tasinmazsahibi}</Text>
                </Text>
              </View>
              <Text style={styles.summaryText}>
                Telefon: <Text style={styles.amount}>{item.telefon}</Text>
              </Text>
              <Text style={styles.summaryText}>
                Açıklama: <Text style={styles.amount}>{item.aciklama}</Text>
              </Text>
              <Text style={styles.summaryText}>
                Alan: <Text style={styles.amount}>{item.alan}m2</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
});
