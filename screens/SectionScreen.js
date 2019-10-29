import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  WebView,
  Dimensions,
  Linking,
  ScrollView
} from "react-native";
import Markdown from "react-native-showdown";

const screenWidth = Dimensions.get("window").width;

export default class SectionScreen extends React.Component {
  static navigationOptions = {
    header: null
    // title: "Section"
  };
  render() {
    const { navigation } = this.props;
    let section = navigation.getParam("section");
    return (
      <ScrollView>
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
          <Content>
            {/* <WebView
            source={{ html: section.content + htmlStyles }}
            scalesPageToFit={true}
            scrollEnabled={false}
            ref="webview"
            onNavigationStateChange={event => {
              this.refs.webview.stopLoading();
              if (event.url != "about:blank") {
                Linking.openURL(event.url);
              }
            }}
          /> */}
            {console.log(section.content)}
            <Markdown
              body={section.content}
              pureCSS={htmlStyles}
              scalesPageToFit={false}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
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

const Content = styled.View`
  height: 1000px;
  padding: 10px;
  overflow: hidden;
`;
const img = require("../assets/background1.jpg");

const htmlContent = `
  <h2>This is a title</h2>
  <p>This is a <a href="http://mamit.com.np">link.</a></p>
  <Img src=${img}/>
`;

const htmlStyles = `
    *{
      margin:0;
      padding:0;
      font-family:-apple-system, Roboto;
      font-size: 17px;
      font-weight: normal;
      color: #3c4560;
      line-height: 24px;
    }

    img{
      width:100%;
      height:100%;
      border-radius:10px;
      margin-top:20px;
      box-shadow:5px 5px 10px black;
    }

    h2 {
      font-size:20px;
      font-weight:600;
      text-transform:uppercase;
      color:#b8bece;
      margin-top:50px;
    }

    p{
      margin-top:20px;
    }

    a{
      text-decoration:none;
      color:#4775f2;
      font-weight:600;
    }

    strong{
      font-weight:700;
    }

    pre{
      padding:20px;
      background:#212c4f;
      overflow:hidden;
      word-wrap:break-word;
      border-radius:10px;
      margin-top:20px;
    }

    code{
      color:white;
    }
`;
