import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://php.loc/api/",
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
