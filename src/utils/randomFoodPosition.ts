import React from "react";
import { Coordinate } from "../types/types";

const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  };
};

export default randomFoodPosition;
