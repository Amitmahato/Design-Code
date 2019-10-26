import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";

const AppNavigator = createStackNavigator({
  Home: HomeScreen
});
export default createAppContainer(AppNavigator);
