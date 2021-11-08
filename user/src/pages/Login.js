import Iframe from 'react-iframe'
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocialLogin from '../components/authentication/AuthSocialLogin';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import axios from 'axios'

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function Login() {
  const { t , i18n } = useTranslation();
  const load = async (params) => {
    await axios.get('https://apps.holest.com/iploc.php?ip=auto', {}).then(res => {
      const country_name = res.data.CountryName;
      const language = res.data.CountryCode2;
      sessionStorage.language = language;
      if (country_name === "Serbia" || country_name === "BiH" || country_name === "Montenegro") {
        i18n.changeLanguage('sb');
      }
      else {
        i18n.changeLanguage('en');
      }
    })
  }

  useEffect(() => {
    load();
  // eslint-disable-next-line
  }, [])
  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        {t("Don’t have an account?")} &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          {t("Get started")}
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            {t("Hi, Welcome Back")}
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Iframe height="50px" overflow="hidden" frameBorder="0" url="./static/landing_top.html" />
          </Stack>
          <AuthSocialLogin />

          <LoginForm />
          <Iframe height="50px" overflow="hidden" frameBorder="0" url="./static/landing_bottom.html" />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {t("Don’t have an account?")}&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                {t("Get started")}
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
