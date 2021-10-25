import { Stack, Divider, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import configData from "../../config.json";
import axios from 'axios'

export default function AuthSocialRegister() {
  const history = useHistory();

  const responseGoogle = async (response) => {
    if (response['googleId']) {
      const user_data = response.profileObj;
      const Email = user_data.email;
      const Name = user_data.givenName + user_data.familyName;
      const GoogleID = user_data.googleId;
      await axios.post(configData.API_URL + 'register', {
        name: Name,
        email: Email,
        password: GoogleID,
        confirmpassword: GoogleID
      })
        .then(response => {
          if (response.statusText === "Created") {
            if (response.data.status) {
              alert(response.data.status)
            }
            else {
              alert("success");
              history.push('/login');
            }
          }
        })
        .catch(error => {
          console.log('There was an error!', error);
        });
    }
    else {
      alert("failed")
    }
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  const Google_clientId = "180936120305-895qb9cp2p40thhjphk2jk2vs0rcj8hh.apps.googleusercontent.com";
  return (
    <>
      <Stack direction="row" spacing={4}>
        <GoogleLoginButton>
          <GoogleLogin
            className="GoogleLogin"
            clientId={Google_clientId}
            buttonText="Sign up Google"
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
            textButton="Sign up FaceBook"
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
