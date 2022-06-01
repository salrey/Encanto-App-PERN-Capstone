import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//cometChat Dependencies
import * as CONSTANTS from './Constants/Constants';
import { CometChat } from '@cometchat-pro/chat';



// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';


const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(CONSTANTS.APP_REGION).build();
CometChat.init(CONSTANTS.APP_ID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <React.Fragment>
          <CssBaseline enableColorScheme>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CssBaseline>
        </React.Fragment>
      </React.StrictMode>
    );
  },
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
