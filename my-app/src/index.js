import React from "react";
import App from "./App";
import { createRoot } from 'react-dom/client';
import Keycloak from 'keycloak-js';
import { TokenContext } from './TokenContext';
import { useState } from "react";


let myToken = "";
let jwtToken = 'your_jwt_token';


const ssoConfig = {
    url: "https://dev.loginproxy.gov.bc.ca/auth",//process.env.REACT_APP_SSO_HOST,
    realm: "standard",//process.env.REACT_APP_SSO_REALM,
    clientId: "trans-action-3979"//process.env.REACT_APP_SSO_CLIENT
  };
  
  
  
  const keycloak = new Keycloak(ssoConfig);
  
  keycloak.onAuthSuccess = () => {
    getKeycloakUserInfo();
  };
  
  keycloak.onAuthRefreshSuccess = () => {
    getKeycloakUserInfo();
  };
  
  function getKeycloakUserInfo() {

    keycloak.loadUserInfo().then((data) => {
      myToken = keycloak.token;
      
      jwtToken = myToken;
      console.log(jwtToken);
      console.log("bruce test 1");

    }).catch(
        (e) => {
            console.log("bruce test error: " + e);
        }
    )
    ;
  }
  
  var initOptions = {
    onLoad: 'login-required',
    checkLoginIframe: false,
    pkceMethod: 'S256'
  };

  keycloak
    .init(initOptions)
    .then((authenticated) => {
      if (authenticated) {
        const container = document.getElementById('root');
        const root = createRoot(container); // createRoot(container!) if you use TypeScript
        console.log("bruce test 2");

        root.render(
            <TokenContext.Provider value={jwtToken}>
                <App />
            </TokenContext.Provider>,
        );
      }
    })
    .catch(() => {
      alert('failed to initialize');
    });

