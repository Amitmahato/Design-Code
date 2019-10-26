import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default class SectionScreen extends React.Component {
  static navigationOptions = {
    header: null
    // title: "Section"
  };
  render() {
    const { navigation } = this.props;
    let section = navigation.getParam("section");
    return (
      <Container>
        <Cover>
          <Image source={{ uri: section.image.url }} />
          <Wrapper>
            <Logo source={{ uri: section.logo.url }} />
            <CourseTitle>{section.subtitle}</CourseTitle>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: "absolute",
                right: 10
              }}
            >
              <CloseView>
                <Ionicons
                  name="ios-close"
                  size={36}
                  style={{
                    color: "#56f"
                  }}
                />
              </CloseView>
            </TouchableOpacity>
          </Wrapper>
          <Topic>{section.title}</Topic>
          <Caption>{section.caption}</Caption>
        </Cover>
        <Content></Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  padding-top: 22px;
`;

const Cover = styled.View`
  height: 300px;
  overflow: hidden;
`;
const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.View`
  flex-direction: row;
  margin-top: 20px;
  margin-left: 20px;
`;
const Logo = styled.Image`
  width: 26px;
  height: 26px;
`;
const CourseTitle = styled.Text`
  margin-left: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 4px;
  elevation: 15px;
`;
const CloseView = styled.View`
  width: 36;
  height: 36;
  background-color: white;
  border-radius: 18;
  align-items: center;
  justify-content: center;
`;
const Topic = styled.Text`
  margin-left: 20px;
  margin-top: 10px;
  width: 170px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const Caption = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
`;

const Content = styled.View``;
