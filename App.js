import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/ldcl3ayg0mhx",
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer 93f3808c25c1f5bdb95476ca8576c6eaa12b5587efb956efb242ceead7cb3840`
  }
});

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
    case "OPEN_LOGIN":
      return { action: "openLogin" };
    case "CLOSE_LOGIN":
      return { action: "closeLogin" };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = props => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApolloProvider>
);

export default App;
