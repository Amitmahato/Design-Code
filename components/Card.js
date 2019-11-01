import React from "react";
import styled from "styled-components";

const Card = props => (
  <Container style={{ elevation: 10 }}>
    <Cover>
      <Image source={{ uri: props.image.url }} />
      <Title>{props.title}</Title>
    </Cover>
    <Content>
      <Logo source={{ uri: props.logo.url }} />
      <Wrapper>
        <Caption>{props.caption}</Caption>
        <Subtitle>{props.subtitle.toUpperCase()}</Subtitle>
      </Wrapper>
    </Content>
  </Container>
);

export default Card;

const Container = styled.View`
  background: white;
  width: 315px;
  height: 280px;
  border-radius: 14px;
  margin: 20px;
  margin-left: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;
const Cover = styled.View`
  width: 100%;
  height: 200px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 170px;
  margin-top: 20px;
  margin-left: 20px;
`;

const Content = styled.View`
  height: 80px;
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.View`
  margin-left: 20px;
`;
const Logo = styled.Image`
  width: 60px;
  height: 60px;
`;
const Caption = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: bold;
`;
const Subtitle = styled.Text`
  color: #b8bece;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 4px;
`;
