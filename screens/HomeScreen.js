import React, { Component } from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import Avatar from "../components/Avatar";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }
  }
`;

const mapStatesToProps = state => {
  return { action: state.action, name: state.name };
};

const mapDispatchToProps = dispatch => {
  return {
    openMenu: name => {
      dispatch({
        type: "OPEN_MENU",
        name: name
      });
    }
  };
};
class HomeScreen extends Component {
  state = {
    scale: new Animated.Value(1),
    borderradius: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  static navigationOptions = {
    header: null
  };
  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.toggleMenu();
    }
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.scale, {
        toValue: 0.9
      }).start();
      Animated.timing(this.state.borderradius, {
        toValue: 10,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.timing(this.state.opacity, {
        toValue: 0.5,
        duration: 300,
        easing: Easing.in()
      }).start();
    }
    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 500,
        easing: Easing.in()
      }).start();
      Animated.timing(this.state.borderradius, {
        toValue: 0,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
    }
  };

  render() {
    return (
      <RootView>
        <StatusBar barStyle="dark-content" />
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            borderRadius: this.state.borderradius,
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TitleBar>
                <TouchableOpacity
                  onPress={() => this.props.openMenu(this.props.name)}
                  style={{
                    position: "absolute",
                    marginLeft: 15
                  }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome back,</Title>
                <Name>{this.props.name}</Name>
                <NotificationIcon style={{ position: "absolute", right: 20 }} />
              </TitleBar>
              <ScrollView
                style={{ marginTop: 20 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <Subtitle>Continue Learning</Subtitle>
              <Query query={CardsQuery}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Message>Loading...</Message>;
                  }
                  if (error) {
                    return <Message>Error!</Message>;
                  }
                  return (
                    <ScrollView
                      horizontal="true"
                      style={{ paddingBottom: 30 }}
                      showsHorizontalScrollIndicator={false}
                    >
                      {data.cardsCollection.items.map((card, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            // this.props.navigation.navigate("Section");
                            this.props.navigation.push("Section", {
                              section: card
                            });
                          }}
                        >
                          <Card {...card} />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  );
                }}
              </Query>
              <Subtitle>Related Courses</Subtitle>
              {courses.map((course, index) => (
                <Course key={index} {...course} />
              ))}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(HomeScreen);

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const RootView = styled.View`
  background: black;
  flex: 1;
`;
const Container = styled.View`
  background: #f0f3f5;
  padding-top: 25px;
  flex: 1;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const TitleBar = styled.View`
  width: 100%;
  height: 75px;
  padding-left: 80px;
  justify-content: center;
  /* elevation: 10px; */
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

//static data
const logos = [
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma"
  },
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X"
  },
  {
    image: require("../assets/logo-invision.png"),
    text: "Invision"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch"
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio"
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift"
  },
  {
    image: require("../assets/logo-vue.png"),
    text: "Vue"
  },
  {
    image: require("../assets/logo-xcode.png"),
    text: "X-Code"
  },
  {
    image: require("../assets/logo-xd.png"),
    text: "XD"
  }
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design and interactive prototype"
  },
  {
    title: "React for Designers",
    subtitle: "12 sections",
    image: require("../assets/background5.jpg"),
    logo: require("../assets/logo-react.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Learn to design and code a React site"
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Create powerful design and code components for your app"
  },
  {
    title: "Design System in Figma",
    subtitle: "10 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool"
  }
];
