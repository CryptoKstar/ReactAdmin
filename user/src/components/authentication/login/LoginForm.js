import * as Yup from 'yup';
import axios from 'axios'
import { useState, forwardRef } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import configData from "../../../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function LoginForm() {
  const { t } = useTranslation();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("success");
  const [AlertType, setAlertType] = useState("success");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(t('Email must be a valid email address')).required(t('Email is required')),
    password: Yup.string().required(t('Password is required'))
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await axios.post(configData.API_URL + 'login', {
        Email: values.email,
        Password: values.password
      })
        .then(response => {
          if (response.data.error) {
            setAlertMessage(response.data.error);
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
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={AlertType} sx={{ width: '100%' }}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            style = {{back : 'white'}}
            label={t("Email address")}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label={t("Password")}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label={t("Remember me")}
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            {t("Forgot password?")}
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {t("Login")}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
