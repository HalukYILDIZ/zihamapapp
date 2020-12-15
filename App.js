import React from "react";
import firebase from "./firebase/index";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home";
import EtkinlikStack from "./screens/EtkinlikStack";

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
      <Tab.Navigator>
        <Tab.Screen name="Etkinlik Ekle" component={EtkinlikStack} />
        <Tab.Screen name="Taşınmaz Ekle" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
