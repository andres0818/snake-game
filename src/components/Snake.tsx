import React, { Fragment } from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
interface SnakePropos {
  snake: Coordinate[];
}

const Snake = ({ snake }: SnakePropos): JSX.Element => {
  return (
    <Fragment>
      {snake.map((segment: any, index: number) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };

        return <View key={index} style={[styles.snake, segmentStyle]} />;
      })}
    </Fragment>
  );
};

export default Snake;

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: "absolute",
  },
});
