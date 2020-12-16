import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import EtkinlikEkrani from "./EtkinlikEkrani";
import EtkinlikEkraniDetay from "./EtkinlikEkraniDetay";
import TasinmazSecEkrani from "./TasinmazSecEkrani";
const Stack = createStackNavigator();

export default function EtkinlikStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Tasinmaz Sec">
      <Stack.Screen name="Etkinlik Sec" component={EtkinlikEkrani} />
      <Stack.Screen name="Tasinmaz Sec" component={TasinmazSecEkrani} />
      <Stack.Screen name="Etkinlik Detay" component={EtkinlikEkraniDetay} />
    </Stack.Navigator>
  );
}
