import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from "react-redux";
import store from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff8f00"
    },
    secondary: {
      main: "#7e57c2",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
