import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";

const mapStateToProps = state => {
  return {
    avatar: state.avatar
  };
};

mapDispatchToProps = dispatch => {
  return {
    updateName: name => {
      dispatch({
        type: "UPDATE_NAME",
        name
      });
    },
    updateAvatar: avatar => {
      dispatch({
        type: "UPDATE_AVATAR",
        avatar
      });
    }
  };
};

class Avatar extends React.Component {
  componentDidMount() {
    this.loadState();
  }

  loadState = async () => {
    await AsyncStorage.getItem("state").then(serializedState => {
      const state = JSON.parse(serializedState);
      if (state) {
        this.props.updateName(state.name);
        this.props.updateAvatar(state.avatar);
      }
    });
  };

  render() {
    return <Image source={{ uri: this.props.avatar }} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
