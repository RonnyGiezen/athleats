import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

/**
 * Safe area, to keep the screen inside IOS or Android top or bottom bars
 */
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
