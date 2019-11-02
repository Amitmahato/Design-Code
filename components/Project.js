import React from "react";
import styled from "styled-components";
import {
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class Project extends React.Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    paddingTop: new Animated.Value(0),
    opacity: 0
  };

  openCard = () => {
    Animated.spring(this.state.cardWidth, { toValue: screenWidth }).start();
    Animated.spring(this.state.cardHeight, { toValue: screenHeight }).start();
    Animated.spring(this.state.paddingTop, { toValue: 44 }).start();
    // StatusBar.setHidden(true);
    this.setState({ opacity: 1 });
  };
  closeCard = () => {
    Animated.spring(this.state.cardWidth, { toValue: 315 }).start();
    Animated.spring(this.state.cardHeight, { toValue: 460 }).start();
    Animated.spring(this.state.paddingTop, { toValue: 0 }).start();
    // StatusBar.setHidden(false);
    this.setState({ opacity: 0 });
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer
          style={{
            elevation: 20,
            width: this.state.cardWidth,
            height: this.state.cardHeight,
            paddingTop: this.state.paddingTop
          }}
        >
          <Cover>
            <Image source={this.props.image} />
            <Title>{this.props.title}</Title>
            <TouchableOpacity
              onPress={this.closeCard}
              style={{
                position: "absolute",
                top: 20,
                right: 20
              }}
            >
              <CloseView style={{ opacity: this.state.opacity }}>
                <Ionicons
                  name="ios-close"
                  size={36}
                  style={{
                    color: "#56f"
                  }}
                />
              </CloseView>
            </TouchableOpacity>
            <Author>by {this.props.author}</Author>
          </Cover>
          <Text>{this.props.text}</Text>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
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

//Create animated component for applying animated values on it
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
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

const CloseView = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: white;
  justify-content: center;
  align-items: center;
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
