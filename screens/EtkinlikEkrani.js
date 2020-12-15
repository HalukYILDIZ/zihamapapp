import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import firebase from "../firebase/index";

export default function etkinlikEkrani({ route, navigation }) {
  const Item = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate("EtkinlikDetay", {
          etkinlikItem: item,
          zeminId: route.params.zeminId,
        })
      }
    >
      <View style={styles.item} key={item.id}>
        <Text key={item.id} style={styles.title}>
          r{item.id}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const [loading, setLoading] = useState(false);
  const [tableDatas, setTableDatas] = useState(false);

  const renderItem = ({ item }) => <Item key={item.id} item={item} />;

  useEffect(() => {
    const ref = firebase.db
      .collection("tarla")
      .doc(`${route.params.zeminId}`)
      .collection("etkinlik");
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
        <ActivityIndicator />
        <ActivityIndicator size="large" />
        <ActivityIndicator size="small" color="#0000ff" />
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tableDatas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
});
