import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import {
  getFirebase,
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { firestoreReducer, createFirestoreInstance } from "redux-firestore";

//import { AppLoading } from "expo";

//import firebase from "./firebase/index";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TasinmazStack from "./screens/TasinmazStack";
import EtkinlikStack from "./screens/EtkinlikStack";
import PlanEkrani from "./screens/PlanEkrani";
import HaritaEkrani from "./screens/HaritaEkrani";
import TakvimEkrani from "./screens/TakvimEkrani";
import { Ionicons } from "@expo/vector-icons";

//import tarlaReducer from './store/reducers/tarla';
//import etkinlikReducer from './store/reducers/etkinlik';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk.withExtraArgument({ getFirebase }))
);
const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
};
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAAJcxKjP0D3v7cOwTKhZr_o9fl1PIotJk",
    authDomain: "zihatim.firebaseapp.com",
    databaseURL:
      "https://zihatim-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zihatim",
    storageBucket: "zihatim.appspot.com",
    messagingSenderId: "302815205710",
    appId: "1:302815205710:web:ee4b946cb97cdef721a61f",
    measurementId: "G-M8B1QJ9DN6",
  });
} else {
  firebase.app();
}
firebase.firestore();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ActionSheetProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Taşınmaz Ekle") {
                    iconName = focused
                      ? "ios-location"
                      : "ios-location-outline";
                  } else if (route.name === "Etkinlik Ekle") {
                    iconName = focused
                      ? "ios-add-circle"
                      : "ios-add-circle-outline";
                  } else if (route.name === "Plan Sayfası") {
                    iconName = focused
                      ? "ios-bookmarks"
                      : "ios-bookmarks-outline";
                  } else if (route.name === "Harita Sayfası") {
                    iconName = focused ? "ios-map" : "ios-map-outline";
                  } else if (route.name === "Takvim Sayfası") {
                    iconName = focused
                      ? "ios-calendar"
                      : "ios-calendar-outline";
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
              <Tab.Screen name="Harita Sayfası" component={HaritaEkrani} />
              <Tab.Screen name="Taşınmaz Ekle" component={TasinmazStack} />
              <Tab.Screen name="Etkinlik Ekle" component={EtkinlikStack} />
              <Tab.Screen name="Plan Sayfası" component={PlanEkrani} />
              <Tab.Screen name="Takvim Sayfası" component={TakvimEkrani} />
            </Tab.Navigator>
          </NavigationContainer>
        </ActionSheetProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
