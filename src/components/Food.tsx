import React from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../styles/colors";

const Food = ({ x, y, randomFood }): JSX.Element => {
  return (
    <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>
      {randomFood}
    </Text>
  );
};

export default Food;

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 7,
    position: "absolute",
  },
});
