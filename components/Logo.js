import React from "react";
import styled from "styled-components";

const Logo = props => (
  <Container>
    <Image source={props.image} resizeMode="contain" />
    <Text>{props.text}</Text>
  </Container>
);

export default Logo;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 60px;
  background: white;
  border-radius: 14px;
  padding: 12px 16px 12px;
  margin: 10px 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  elevation: 5px;
`;
const Image = styled.Image`
  width: 36px;
  height: 36px;
`;
const Text = styled.Text`
  margin-left: 10px;
  font-size: 17px;
  font-weight: 600;
`;
