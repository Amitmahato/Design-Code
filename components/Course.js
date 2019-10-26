import React from "react";
import styled from "styled-components";

const Course = props => (
  <Container>
    <Cover>
      <Image source={props.image} />
      <Logo source={props.logo} resizeMode="contain" />
      <CourseInfo>
        <Subtitle>{props.subtitle}</Subtitle>
        <Title>{props.title}</Title>
      </CourseInfo>
    </Cover>
    <Content>
      <Avatar source={props.avatar} />
      <Wrapper>
        <Caption>{props.caption}</Caption>
        <Instructor>Taught by {props.author}</Instructor>
      </Wrapper>
    </Content>
  </Container>
);

export default Course;

const Container = styled.View`
  background: white;
  width: 315px;
  min-height: 320px;
  border-radius: 14px;
  margin-left: 20px;
  margin-bottom: 20px;
  elevation: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;
const Cover = styled.View`
  width: 100%;
  height: 250px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  align-items: center;
`;
const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Logo = styled.Image`
  position: absolute;
  top: 10px;
  width: 60px;
  height: 60px;
`;

const CourseInfo = styled.View`
  width: 60%;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;
const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
`;
const Title = styled.Text`
  margin-top: 10px;
  color: white;
  font-size: 20px;
  font-weight: 600;
`;
const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 10px;
`;
const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
const Wrapper = styled.View`
  margin-left: 15px;
  width: 225px;
`;
const Caption = styled.Text`
  color: #555;
`;
const Instructor = styled.Text`
  margin-top: 5px;
  color: #ccc;
`;
