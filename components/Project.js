import React from "react";
import styled from "styled-components";

export default class Project extends React.Component {
  render() {
    return (
      <Container style={{ elevation: 20 }}>
        <Cover>
          <Image source={this.props.image} />
          <Title>{this.props.title}</Title>
          <Author>by {this.props.author}</Author>
        </Cover>
        <Text>{this.props.text}</Text>
      </Container>
    );
  }
}

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 15px;
  background: white;
  overflow: hidden;
`;

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;
