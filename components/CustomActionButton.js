import React from "react";
import { StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomActionButton = (props) => {
  return (
    <ActionButton
      buttonColor={props.color}
      position={props.position}
      onPress={props.onPress}
    >
      {/* {props.withOption && props.isFollow && (
        <ActionButton.Item
          buttonColor="magenta"
          title="do not Follow"
          onPress={props.onFollow}
        >
          <Entypo name="direction" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )} */}
      {/* {props.withOption && !props.isFollow && (
        <ActionButton.Item
          buttonColor="magenta"
          title="Follow"
          onPress={props.onFollow}
        >
          <Entypo name="direction" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )} */}
      {props.withOption && (
        <ActionButton.Item
          buttonColor="rgba(231,76,60,1)"
          title="Arazi"
          onPress={props.onStop}
        >
          <Entypo name="controller-stop" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )}
      {props.withOption && (
        <ActionButton.Item
          buttonColor="#3498db"
          title="Uydu"
          onPress={props.onPause}
        >
          <Entypo name="controller-paus" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )}
      {props.withOption && (
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="Etiketli Uydu"
          onPress={props.onPlay}
        >
          <Entypo name="controller-play" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      )}
    </ActionButton>
  );
};

export default CustomActionButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
