import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import EtkinlikEkrani from "./EtkinlikEkrani";
import EtkinlikEkraniDetay from "./EtkinlikEkraniDetay";

const Stack = createStackNavigator();

export default function EtkinlikStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Etkinlik">
      <Stack.Screen
        name="Etkinlik"
        component={EtkinlikEkrani}
        options={{
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("EtkinlikDetay")}
              title="Info"
              color="#555"
            />
          ),
        }}
      />
      <Stack.Screen
        name="EtkinlikDetay"
        component={EtkinlikEkraniDetay}
        options={{
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Etkinlik")}
              title="Info"
              color="#555"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
