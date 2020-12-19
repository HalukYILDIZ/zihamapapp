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

export default function PlanEkrani() {
  const Item = ({ item }) => (
    <PlanCardItem item={item} />
    // <View style={styles.screen}>
    //   <View
    //     style={{
    //       ...styles.summary,
    //       backgroundColor: item.plan == "Tamamlandı" ? "pink" : "white",
    //     }}
    //   >
    //     <View style={styles.summaryUst}>
    //       <View style={styles.summaryAlt}>
    //         <View style={styles.elements}>
    //           <Text style={styles.summaryText}>
    //             Tarih: <Text style={styles.id}>{item.tarih}</Text>
    //           </Text>
    //         </View>

    //         <Text style={styles.summaryText}>
    //           Saat: <Text style={styles.amount}>{item.saat}</Text>
    //         </Text>
    //       </View>
    //       <View style={styles.summaryAlt}>
    //         <View style={styles.elements}>
    //           <Text style={styles.summaryText}>
    //             İşlem: <Text style={styles.amount}>{item.islem}</Text>
    //           </Text>
    //         </View>
    //         <Text style={styles.summaryText}>
    //           Alan:
    //           <Text style={styles.amount}>{item.ilaclananalan}m2</Text>
    //         </Text>
    //       </View>
    //     </View>
    //     <View style={styles.altsummaryUst}>
    //       <View style={styles.summaryAlt}>
    //         <View style={styles.elements}>
    //           <Text style={styles.summaryText}>
    //             Id:
    //             <Text style={styles.amount}>{item.id}</Text>
    //           </Text>
    //         </View>
    //         <Text style={styles.summaryText}>
    //           Medya:
    //           <Text style={styles.amount}>{item.medya ? "var" : "yok"}</Text>
    //         </Text>
    //         <Text style={styles.summaryText}>
    //           işlem: <Text style={styles.amount}>{item.islem}</Text>
    //         </Text>
    //         <Text style={styles.summaryText}>
    //           planlandı/tamamlandı:
    //           <Text style={styles.amount}>{item.plan}</Text>
    //         </Text>
    //         <Text style={styles.summaryText}>
    //           zeminId:
    //           <Text style={styles.amount}>{item.zeminId}</Text>
    //         </Text>
    //       </View>
    //       <Button
    //         title="Harita Göster"
    //         onPress={() => {
    //           setOpenMap(!openMap);
    //         }}
    //       />
    //     </View>
    //     {openMap && (
    //       <MapView
    //         provider={PROVIDER_GOOGLE}
    //         showsUserLocation={true}
    //         followsUserLocation={false}
    //         showsCompass={true}
    //         showsScale={true}
    //         //ref={mapRef}
    //         showsMyLocationButton={true}
    //         mapType="hybrid"
    //         initialRegion={{
    //           latitude: item.coordinates[0].lat,
    //           longitude: item.coordinates[0].lng,
    //           latitudeDelta: 0.02,
    //           longitudeDelta: 0.02,
    //         }}
    //         style={styles.map}
    //       >
    //         <Polygon
    //           key={item.id}
    //           coordinates={item.coordinates.map(({ lat, lng }) => {
    //             return { latitude: lat, longitude: lng };
    //           })}
    //           strokeColor="green" // fallback for when `strokeColors` is not supported by the map-provider
    //           strokeColors={[
    //             "#7F0000",
    //             "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
    //             "#B24112",
    //             "#E5845C",
    //             "#238C23",
    //             "#7F0000",
    //           ]}
    //           fillColor="rgba(175,245,66,0.4)"
    //           strokeWidth={1}
    //         />
    //       </MapView>
    //     )}
    //   </View>
    // </View>
  );

  const [loading, setLoading] = useState(false);
  const [tableDatas, setTableDatas] = useState(false);
  // const [openMap, setOpenMap] = useState(false);

  const renderItem = ({ item }) => <Item key={item.id} item={item} />;

  useEffect(() => {
    const ref = firebase.db.collectionGroup("etkinlik").orderBy("plan");

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