import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import TasinmazEkleEkrani from "./TasinmazEkleEkrani";
//import TasinmazGuncelleDetayEkrani from "./TasinmazGuncelleDetayEkrani";

import TasinmazGüncelleEkrani from "./TasinmazGüncelleEkrani";
const Stack = createStackNavigator();

export default function TasinmazStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Tasınmaz Güncelle">
      <Stack.Screen
        name="Tasınmaz Güncelle"
        component={TasinmazGüncelleEkrani}
        options={{
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() =>
                navigation.navigate("Tasınmaz Ekle", {
                  zeminId: null,
                  item: null,
                })
              }
              title="Yeni Kayıt"
              color="green"
            />
          ),
        }}
      />
      <Stack.Screen name="Tasınmaz Ekle" component={TasinmazEkleEkrani} />
    </Stack.Navigator>
  );
}
