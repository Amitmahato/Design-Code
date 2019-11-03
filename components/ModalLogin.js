import React from "react";
import styled from "styled-components";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { BlurView } from "expo-blur";
import Success from "./Success";
import Loading from "./Loading";

export default class ModalLogin extends React.Component {
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
    isSuccessfull: false,
    isLoading: false
  };

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

  handleLogin = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false, isSuccessfull: true });
    }, 2000);
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  render() {
    return (
      <Container>
        <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
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
        <Modal>
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
        </Modal>
        <Success isActive={this.state.isSuccessfull} />
        <Loading isActive={this.state.isLoading} />
      </Container>
    );
  }
}

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
const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  align-items: center;
`;
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
