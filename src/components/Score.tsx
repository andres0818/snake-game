import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../styles/colors";

const Score = ({ score }) => {
  return <Text style={styles.container}>{score}</Text>;
};

export default Score;

const styles = StyleSheet.create({
  container: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
