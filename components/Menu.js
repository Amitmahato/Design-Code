import React from "react";
import styled from "styled-components";
import {
  Animated,
  AsyncStorage,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";

const mapStateToProps = state => {
  return { action: state.action, name: state.name };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU"
      }),
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      }),
    updateAvatar: avatar => {
      dispatch({
        type: "UPDATE_AVATAR",
        avatar
      });
    }
  };
};

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
var menuWidth = screenWidth;

if (screenWidth > 500) {
  menuWidth = 500;
}
class Menu extends React.Component {
  state = {
    width: menuWidth,
    height: screenHeight,
    top: new Animated.Value(screenHeight),
    statusbar: false
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.adaptLayout);
    this.toggleMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.toggleMenu();
    }
  }

  adaptLayout = dimensions => {
    const screenHeight = dimensions.window.height;
    const screenWidth = dimensions.window.width;
    var menuWidth = screenWidth;
    if (screenWidth > 500) {
      menuWidth = 500;
    }

    this.setState({
      top: new Animated.Value(screenHeight),
      height: screenHeight,
      width: menuWidth
    });
    this.toggleMenu();
  };
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 50
      }).start();
      this.setState({ statusbar: true });
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: this.state.height
      }).start();
      this.setState({ statusbar: false });
    }
  };

  handleMenu = index => {
    if (index == 3) {
      this.props.closeMenu();
      this.props.updateName();
      this.props.updateAvatar(
        "https://p1.f0.n0.cdn.getcloudapp.com/items/jkuyZE96/avatar-default.jpg?v=4aadcdbdffe209bbd523530a75351afd"
      );
      AsyncStorage.clear();
    }
  };
  render() {
    return (
      <AnimatedContainer
        style={{
          top: this.state.top,
          width: this.state.width,
          height: this.state.height
        }}
      >
        <StatusBar hidden={this.state.statusbar} />
        <Cover>
          <Image source={require("../assets/background1.jpg")} />
          <Title>{this.props.name}</Title>
          <Subtitle>Student at Pulchowk Engineering Campus</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={() => this.props.closeMenu()}
          style={{
            position: "absolute",
            top: 120,
            alignSelf: "center",
            zIndex: 1
          }}
        >
          <CloseView>
            <Ionicons name="ios-close" size={44} color="#546bfb" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.handleMenu(index);
              }}
            >
              <MenuItem key={index} {...item} />
            </TouchableOpacity>
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const Container = styled.View`
  position: absolute;
  background: white;
  z-index: 100;
  align-self: center;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center; /*for vertical alignment*/
  align-items: center; /*for horizontal alignment*/
  /* border-bottom-left-radius: 142px;
  border-bottom-right-radius: 142px;
  overflow: hidden; */
`;
const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  /* font-weight: bold; */
`;
const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  align-items: center;
  elevation: 5px;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;

const items = [
  {
    icon: "ios-play",
    title: "Account",
    subtitle: "settings"
  },
  {
    icon: "ios-card",
    title: "Billing",
    subtitle: "payments"
  },
  {
    icon: "ios-compass",
    title: "Learn React",
    subtitle: "start course"
  },
  {
    icon: "ios-exit",
    title: "Log Out",
    subtitle: "see you soon!"
  }
];
