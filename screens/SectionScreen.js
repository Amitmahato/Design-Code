import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native";

class SectionScreen extends React.Component {
  static navigationOptions = {
    header: null
    // title: "Section"
  };
  render() {
    return (
      <Container>
        {/* <TouchableOpacity onPress={() => this.props.navigation.push("Section")}> */}
        <Text>Section</Text>
        <Button title="Close" onPress={() => this.props.navigation.goBack()} />
        {/* </TouchableOpacity> */}
      </Container>
    );
  }
}

export default SectionScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;
