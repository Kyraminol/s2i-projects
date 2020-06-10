import React from "react";
import {GoogleContext} from "./search";
import {GoogleLogin, GoogleLogout} from "react-google-login";

class Google extends React.Component {
  static contextType = GoogleContext;

  render() {
    let user = this.context;

    if(Object.keys(user).length === 0){
      return (
        <GoogleLogin
          clientId="677208347872-r20r0a8f9at4n54vi59i47iemilm893i.apps.googleusercontent.com"
          buttonText="Sign in"
          onSuccess={(user) => {
            this.props.setLogged(user);
          }}
          onFailure={() => {}}
          cookiePolicy={'single_host_origin'}
          scope="https://www.googleapis.com/auth/books"
          isSignedIn={true}
        />
      )
    } else {
      return (
        <GoogleLogout
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Sign out"
          onLogoutSuccess={(user) => {this.props.setLogged({});}}
        />
      )
    }
  }
}

export {Google};
