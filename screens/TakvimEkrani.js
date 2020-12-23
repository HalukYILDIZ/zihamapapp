import React, { Component, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import firebase from "../firebase/index";
const testIDs = require("../testIDs");
LocaleConfig.locales["tr"] = {
  monthNames: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthNamesShort: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haz.",
    "Tem.",
    "Ağus.",
    "Eylül",
    "Ekim",
    "Kasım",
    "Ara.",
  ],
  dayNames: [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ],
  dayNamesShort: ["Paz.", "Pazt.", "Salı", "Çar.", "Per.", "Cuma", "Cumt."],
  today: "Bugün",
};
LocaleConfig.defaultLocale = "tr";

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = { items: {} };

  componentDidMount() {
    const refZeminId = firebase.db
      .collectionGroup("etkinlik")
      .orderBy("plan")
      .orderBy("tarih")
      .orderBy("saat");
    const getZeminId = () => {
      refZeminId.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });

        items.forEach((element) => {
          if (!this.state.items[element.tarih]) {
            this.state.items[element.tarih] = [];
          }
          this.state.items[element.tarih].push({
            name: `${element.saat}  ${element.mahalleAd} mah. ${element.islem}  ${element.ilaclananalan}m2  id:${element.id}`,
            height: 60,
          });
        });
      });
    };

    getZeminId();
  }

  render() {
    return (
      <Agenda
        minDate={"2020-12-01"}
        firstDay={1}
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        //loadItemsForMonth={this.loadItems.bind(this)}
        selected={"2021-06-03"}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        //markingType={"period"}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{
        //   calendarBackground: "red",
        //   agendaKnobColor: "green",
        // }}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  //   loadItems(day) {
  //     setTimeout(() => {
  //       for (let i = -15; i < 85; i++) {
  //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //         const strTime = this.timeToString(time);
  //         if (!this.state.items[strTime]) {
  //           this.state.items[strTime] = [];
  //           const numItems = Math.floor(Math.random() * 3 + 1);
  //           for (let j = 0; j < numItems; j++) {
  //             this.state.items[strTime].push({
  //               name: "Item for " + strTime + " #" + j,
  //               height: Math.max(50, Math.floor(Math.random() * 150)),
  //             });
  //           }
  //         }
  //       }
  //       const newItems = {};
  //       Object.keys(this.state.items).forEach((key) => {
  //         newItems[key] = this.state.items[key];
  //       });
  //       this.setState({
  //         items: newItems,
  //       });
  //     }, 1000);
  //   }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
