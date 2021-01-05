import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Alert } from "react-native";
import PlanEkrani from "./PlanEkrani";
import EtkinlikEkraniDetay from "./EtkinlikEkraniDetay";

import * as firebase from "firebase";
const Stack = createStackNavigator();

export default function PlanStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Plan Ekranı">
      <Stack.Screen
        name="Plan Ekranı"
        component={PlanEkrani}
        options={{
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    // Sign-out successful.
                    Alert.alert("Çıkış Başarılı", "Tekrar Giriş Yapın.");
                  })
                  .catch((error) => {
                    // An error happened.
                    Alert.alert(
                      "Çıkış Başarısız",
                      "Çıkış yaparken bir hata oluştu."
                    );
                  })
              }
              title="Çıkış"
              color="red"
            />
          ),
        }}
      />
      <Stack.Screen name="Etkinlik Detay" component={EtkinlikEkraniDetay} />
    </Stack.Navigator>
  );
}
