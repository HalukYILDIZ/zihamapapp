import React from "react";
import firebase from "./firebase/index";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TasinmazStack from "./screens/TasinmazStack";
import EtkinlikStack from "./screens/EtkinlikStack";
import PlanEkrani from "./screens/PlanEkrani";
import { Ionicons } from "@expo/vector-icons";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Taşınmaz Ekle") {
              iconName = focused ? "ios-map" : "ios-map-outline";
            } else if (route.name === "Etkinlik Ekle") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
            } else if (route.name === "Plan Sayfası") {
              iconName = focused
                ? "ios-notifications-circle-sharp"
                : "ios-notifications-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Taşınmaz Ekle" component={TasinmazStack} />
        <Tab.Screen name="Etkinlik Ekle" component={EtkinlikStack} />
        <Tab.Screen name="Plan Sayfası" component={PlanEkrani} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
