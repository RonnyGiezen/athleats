import React from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";

/**
 *
 * @returns A loading container for the loading spinner
 */
const LoadingContainer = () => {
  return (
    <SpinnerContainer>
      <Loading size={50} animating={true} color={Colors.blue300} />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export { LoadingContainer };
