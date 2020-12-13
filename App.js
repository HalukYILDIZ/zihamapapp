import React from "react";
import firebase from "./firebase/index";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home";
import EtkinlikStack from "./screens/EtkinlikStack";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Taşınmaz Ekle" component={HomeScreen} />
        <Tab.Screen name="Etkinlik Ekle" component={EtkinlikStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
