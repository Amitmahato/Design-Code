import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    name: state.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      })
  };
};

class Avatar extends React.Component {
  state = {
    photo:
      "https://p1.f0.n0.cdn.getcloudapp.com/items/jkuyZE96/avatar-default.jpg?v=4aadcdbdffe209bbd523530a75351afd"
  };
  componentDidMount() {
    fetch(
      "https://uifaces.co/api?limit=1&provider[]=8&emotion[]=happiness&gender[]=male&from_age=21&to_age=21&random",
      {
        headers: new Headers({
          "X-API-KEY": "3dd0dd75e8b3fa3d493ed8bd6181ed"
        })
      }
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          photo: response[0].photo,
          name: response[0].name
        });
        this.props.updateName(this.state.name);
      });
  }
  render() {
    return <Image source={{ uri: this.state.photo }} />;
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
