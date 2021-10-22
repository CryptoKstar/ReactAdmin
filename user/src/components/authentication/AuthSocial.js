// import { Icon } from '@iconify/react';
// import googleFill from '@iconify/icons-eva/google-fill';
// import twitterFill from '@iconify/icons-eva/twitter-fill';
// import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    if (response['googleId']) {
      alert("success")
      navigate('/app', { replace: true });
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
            buttonText="Sign In Google"
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
