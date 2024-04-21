import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/js/bootstrap.bundle.min";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
        <App style={{backgroundImage: "linear-gradient(#c1b6eb52, #f7e7e6)"}}/>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
