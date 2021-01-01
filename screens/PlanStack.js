import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PlanEkrani from "./PlanEkrani";
import EtkinlikEkraniDetay from "./EtkinlikEkraniDetay";
const Stack = createStackNavigator();

export default function PlanStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Plan Ekranı">
      <Stack.Screen name="Plan Ekranı" component={PlanEkrani} />
      <Stack.Screen name="Etkinlik Detay" component={EtkinlikEkraniDetay} />
    </Stack.Navigator>
  );
}
