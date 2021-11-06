import { Link as RouterLink } from 'react-router-dom';
import Iframe from 'react-iframe'
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocialRegister from '../components/authentication/AuthSocialRegister';
import { useTranslation } from 'react-i18next';

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

export default function Register() {
  const { t } = useTranslation();

  return (
    <RootStyle title="Register | Minimal-UI">
      <AuthLayout>
        {t("Already have an account?")} &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          {t("Login")}
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            {t("Manage the job more effectively with Minimal")}
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Iframe height="50px" overflow="hidden" frameBorder="0" url="./static/landing_top.html" />
          </Box>
          <AuthSocialRegister />
          <RegisterForm />
          <Iframe height="50px" overflow="hidden" frameBorder="0" url="./static/landing_bottom.html" />
          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              {t("Already have an account?")}&nbsp;
              <Link to="/login" component={RouterLink}>
                {t("Login")}
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
