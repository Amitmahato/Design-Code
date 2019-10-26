import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";

const initialState = {
  action: "",
  name: "User"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_MENU":
      return { action: "closeMenu", name: action.name };
    case "OPEN_MENU":
      return { action: "openMenu", name: action.name };
    case "UPDATE_NAME":
      return { name: action.name };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = props => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default App;
