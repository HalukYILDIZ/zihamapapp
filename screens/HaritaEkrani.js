import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { useActionSheet } from "@expo/react-native-action-sheet";
import CustomActionButton from "../components/CustomActionButton";
import firebase from "../firebase/index";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function HaritaEkrani() {
  const mapRef = useRef(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const [mapId, setMapId] = useState([]);

  const [planlandi, setPlanlandi] = useState([]);
  const [tamamlandi, setTamamlandi] = useState([]);
  const [tableDatas, setTableDatas] = useState([]);
  const [tumalanlar, setTumalanlar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapStyle, setMapStyle] = useState("terrain");

  useEffect(() => {
    const ref = firebase.db.collection("tarla");
    const refZeminId = firebase.db.collectionGroup("etkinlik");
    const getZeminId = () => {
      setLoading(true);
      refZeminId.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setPlanlandi(
          items
            .filter((etkinlik) => {
              return etkinlik.plan == "Planlandı";
            })
            .map((etkinlik) => {
              return etkinlik.zeminId;
            })
        );
        setTamamlandi(
          items
            .filter((etkinlik) => {
              return etkinlik.plan == "Tamamlandı";
            })
            .map((etkinlik) => {
              return etkinlik.zeminId;
            })
        );
        setTumalanlar(
          items.map((etkinlik) => {
            return etkinlik.zeminId;
          })
        );
        //console.log(items);

        setLoading(false);
      });
    };
    const getTableDatas = () => {
      setLoading(true);
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setTableDatas(
          items.map(
            ({ zeminId, mahalleAd, adaNo, parselNo, coordinates, alan }) => {
              return {
                mahalleAd: mahalleAd,
                adaNo: adaNo,
                parselNo: parselNo,
                zeminId: zeminId,
                alan: alan,
                coordinates: coordinates.map(({ lat, lng }) => {
                  return { latitude: lat, longitude: lng };
                }),
              };
            }
          )
        );

        setLoading(false);
      });
    };
    getTableDatas();
    getZeminId();
  }, []);

  const onMapChooseHandler = () => {
    showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          "Planlanan Alanlar",
          "Tamamlanan Alanlar",
          "Tüm ALanlar",
        ],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setMapId(planlandi);
        } else if (buttonIndex === 2) {
          setMapId(tamamlandi);
        } else if (buttonIndex === 3) {
          setMapId(tumalanlar);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={false}
        showsCompass={true}
        showsScale={true}
        ref={mapRef}
        showsMyLocationButton={true}
        mapType={mapStyle}
        initialRegion={{
          latitude: 39.0,
          longitude: 32.0,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
        }}
        style={styles.map}
      >
        {/* <Polygon
          key={"1"}
          coordinates={[
            { latitude: 39.8, longitude: 32.8 },
            { latitude: 50.8, longitude: 22.8 },
            { latitude: 22.8, longitude: 40.8 },
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
            "#B24112",
            "#E5845C",
            "#238C23",
            "#7F0000",
          ]}
          fillColor="rgba(250,150,150,0.5)"
          strokeWidth={1}
        /> */}
        {tableDatas.map(
          (tarla) =>
            mapId.includes(Number(tarla.zeminId)) && (
              <Polygon
                key={tarla.zeminId}
                coordinates={tarla.coordinates}
                strokeColor="green" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                  "#7F0000",
                  "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
                  "#B24112",
                  "#E5845C",
                  "#238C23",
                  "#7F0000",
                ]}
                fillColor="rgba(175,245,66,0.4)"
                strokeWidth={1}
              />
            )
        )}
      </MapView>
      <CustomActionButton
        onPress={() => {}}
        onPause={() => setMapStyle("satellite")}
        onPlay={() => setMapStyle("hybrid")}
        onStop={() => setMapStyle("terrain")}
        // onFollow={onFollowLocation}
        position="left"
        color={Colors.primary}
        withOption={true}
        // isFollow={isFollowUserHeading}
      />

      <CustomActionButton
        onPress={onMapChooseHandler}
        position="center"
        color={Colors.tintColor}
        withOption={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
  },
});