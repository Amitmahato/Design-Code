import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const MenuItem = props => (
  <Container>
    <IconView>
      <Ionicons name={props.icon} size={24} color="#546bfb" />
    </IconView>
    <Content>
      <Title>{props.title}</Title>
      <Subtitle>{props.subtitle}</Subtitle>
    </Content>
  </Container>
);

export default MenuItem;

const Container = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;
const IconView = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;
const Content = styled.View`
  padding-left: 10px;
`;
const Title = styled.Text`
  font-size: 20px;
  color: #3c4560;
`;
const Subtitle = styled.Text`
  font-size: 13px;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.2);
`;
