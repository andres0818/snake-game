import React from "react";
import { StyleSheet, View } from "react-native/types";
import { Colors } from "../styles/colors";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPause: boolean;
}

const Header = ({
  children,
  reloadGame,
  pauseGame,
  isPause,
}: HeaderProps): JSX.Element => {
  return <View style={styles.container}>{children}</View>;
};

export default Header;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary,
    borderWidth: 12,
  },
});
