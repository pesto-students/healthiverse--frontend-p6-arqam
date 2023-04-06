import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const rootElement = document.getElementById('root');

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
  }
});



const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
    </PersistGate>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
