import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {useTranslation} from "react-i18next";


const GoogleContext = React.createContext({});


function Google(props) {
  const [t,] = useTranslation();
  return (
    <GoogleComponent {...props} t={t}/>
  )
}

class GoogleComponent extends React.Component {
  static contextType = GoogleContext;

  render() {
    let user = this.context;
    let t = this.props.t;

    if(Object.keys(user).length === 0){
      return (
        <GoogleLogin
          clientId="677208347872-r20r0a8f9at4n54vi59i47iemilm893i.apps.googleusercontent.com"
          buttonText={t("google-signin")}
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
          clientId="677208347872-r20r0a8f9at4n54vi59i47iemilm893i.apps.googleusercontent.com"
          buttonText={t("google-signout")}
          onLogoutSuccess={(user) => {this.props.setLogged({});}}
        />
      )
    }
  }
}

export { Google, GoogleContext };
export default GoogleContext;
