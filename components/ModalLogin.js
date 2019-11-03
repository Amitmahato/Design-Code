import React from "react";
import styled from "styled-components";
import {
  Alert,
  Animated,
  AsyncStorage,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { BlurView } from "expo-blur";
import { connect } from "react-redux";

import Success from "./Success";
import Loading from "./Loading";
import firebase from "./Firebase";

const screenHeight = Dimensions.get("window").height;

mapStateToProps = state => {
  return { action: state.action };
};

mapDispatchToProps = dispatch => {
  return {
    closeLogin: () => {
      dispatch({
        type: "CLOSE_LOGIN"
      });
    },
    updateName: name => {
      dispatch({
        type: "UPDATE_NAME",
        name
      });
    }
  };
};

class ModalLogin extends React.Component {
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
    isSuccessfull: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  };

  componentDidMount() {
    this.retrieveName();
  }

  componentDidUpdate() {
    if (this.props.action === "openLogin") {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0
      }).start();
      Animated.spring(this.state.scale, { toValue: 1 }).start();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 0
      }).start();
    }

    if (this.props.action === "closeLogin") {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight,
          duration: 0
        }).start();
        Animated.spring(this.state.scale, { toValue: 1.3 }).start();
      }, 500);
      Animated.timing(this.state.translateY, {
        toValue: 1000,
        duration: 500
      }).start();
    }
  }

  focusEmail = () => {
    this.setState({
      iconEmail: require("../assets/icon-email-animated.gif"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  focusPassword = () => {
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password-animated.gif")
    });
  };

  storeName = async name => {
    try {
      await AsyncStorage.setItem("name", name);
    } catch (error) {}
  };

  retrieveName = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name != null) {
        this.props.updateName(name);
        console.log(name);
      }
    } catch (error) {}
  };

  handleLogin = () => {
    this.setState({ isLoading: true });

    const email = this.state.email;
    const password = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        Alert.alert("Error", error.message);
        this.setState({ isLoading: false });
      })
      .then(response => {
        // console.log(response);

        if (response) {
          this.setState({ isLoading: false, isSuccessfull: true });

          this.storeName(response.user.email);
          this.props.updateName(response.user.email);

          setTimeout(() => {
            this.props.closeLogin();
          }, 1000);
        }
      });
  };

  tapBackground = () => {
    Keyboard.dismiss();
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password.png")
    });
    this.props.closeLogin();
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="dark"
            intensity={150}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
          />
        </TouchableWithoutFeedback>
        <AnimatedModal
          style={{
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Logo source={require("../assets/logo-dc.png")} />
          <Text>Start Learning. Access Pro Content.</Text>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            onFocus={this.focusEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            onFocus={this.focusPassword}
          />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.iconPassword} />
          <TouchableOpacity onPress={this.handleLogin}>
            <Button style={{ elevation: 5 }}>
              <ButtonText>Login</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
        <Success isActive={this.state.isSuccessfull} />
        <Loading isActive={this.state.isLoading} />
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalLogin);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  align-items: center;
`;
const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;
const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 150px;
  text-align: center;
  color: #b8bece;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  height: 44px;
  width: 295px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`;

const Button = styled.View`
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background: #5263ff;
  border-radius: 10px;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;
const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 31px;
`;
