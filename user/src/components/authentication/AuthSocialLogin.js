import { Stack, Divider, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import configData from "../../config.json";
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AuthSocialLogin() {
  const history = useHistory();
  const [AlertMessage, setAlertMessage] = useState("success");
  const [AlertType, setAlertType] = useState("success");
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const responseGoogle = async (response) => {
    if (response['googleId']) {
      const user_data = response.profileObj;
      const Email = user_data.email;
      const GoogleID = user_data.googleId;
      await axios.post(configData.API_URL + 'login', {
        Email: Email,
        Password: GoogleID,
      })
        .then(response => {
          if (response.data.error) {
            setAlertMessage(response.data.status);
            setAlertType("error");
            setOpen(true);
          }
          else {
            const user_data = response.data.user;
            const authToken = response.data.authToken;
            sessionStorage.UserData = JSON.stringify(user_data);
            sessionStorage.AccessToken = JSON.stringify(authToken);
            history.push('/app');
          }
        })
        .catch(error => {
          console.log('There was an error!', error);
        });
    }
    else {
      setAlertMessage("Users closed Google Register Window!");
      setAlertType("error");
      setOpen(true);

    }
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  const Google_clientId = "180936120305-895qb9cp2p40thhjphk2jk2vs0rcj8hh.apps.googleusercontent.com";
  return (
    <>
      <Stack direction="row" spacing={4}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={AlertType} sx={{ width: '100%' }}>
            {AlertMessage}
          </Alert>
        </Snackbar>
        <GoogleLoginButton className = "GoogleLoginButton">
          <GoogleLogin
            className="GoogleLogin"
            clientId={Google_clientId}
            buttonText="Sign In Google"
            style = {{backgroundColor : "rgb(33 43 54)"}}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            icon={false}
            cookiePolicy={'single_host_origin'}
          />
        </GoogleLoginButton>
        <FacebookLoginButton>
          <FacebookLogin
            className="FacebookLogin"
            appId="562118384400275"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            textButton="Sign In FaceBook"
          />
        </FacebookLoginButton>
        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button> */}
        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>
         */}
        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
