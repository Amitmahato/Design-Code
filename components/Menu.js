import React from "react";
import styled from "styled-components";
import {
  Animated,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";

const mapStateToProps = state => {
  return { action: state.action, name: state.name };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: name =>
      dispatch({
        type: "CLOSE_MENU",
        name: name
      })
  };
};

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight),
    statusbar: false
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.toggleMenu();
    }
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 50
      }).start();
      this.setState({ statusbar: true });
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start();
      this.setState({ statusbar: false });
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <StatusBar hidden={this.state.statusbar} />
        <Cover>
          <Image source={require("../assets/background1.jpg")} />
          <Title>{this.props.name}</Title>
          <Subtitle>Student at Pulchowk Engineering Campus</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={() => this.props.closeMenu(this.props.name)}
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
            <MenuItem key={index} {...item} />
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
  width: 100%;
  height: 100%;
  z-index: 100;
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
