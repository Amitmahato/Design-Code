import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import TabNavigator from "./TabNavigator";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Section: { screen: SectionScreen }
  },
  {
    mode: "modal"
  }
);
export default createAppContainer(TabNavigator);
