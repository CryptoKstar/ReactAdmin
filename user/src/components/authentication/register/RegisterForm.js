import * as Yup from 'yup';
import axios from 'axios'
import { forwardRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useHistory } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import configData from "../../../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function RegisterForm() {
  const history = useHistory();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("success");
  const [AlertType, setAlertType] = useState("success");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t('Too Short!'))
      .max(50, t('Too Long!'))
      .required(t('First name required')),
    lastName: Yup.string().min(2, t('Too Short!')).max(50, t('Too Long!')).required(t('Last name required')),
    email: Yup.string().email('Email must be a valid email address').required(t('Email is required')),
    password: Yup.string().required(t('Password is required')),
    confirmpassword: Yup.string().required(t('ConfrimPassword is required'))
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, e) => {
      await axios.post(configData.API_URL + 'register', {
        Name: values.firstName + values.lastName,
        Email: values.email,
        Password: values.password,
        Confirmpassword: values.confirmpassword
      })
        .then(response => {
          if (response.statusText === "Created") {
            if (response.data.status) {
              setAlertMessage(response.data.status);
              setAlertType("error");
              setOpen(true);
            }
            else {
              axios.post(configData.API_URL + 'login', {
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
          }
        })
        .catch(error => {
          console.log('There was an error!', error);
        });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={AlertType} sx={{ width: '100%' }}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label={t("First name")}
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label={t("Last name")}
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
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
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            autoComplete="current-confirmpassword"
            type={showconfirmpassword ? 'text' : 'password'}
            label={t("Password")}
            {...getFieldProps('confirmpassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setshowconfirmpassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmpassword && errors.confirmpassword)}
            helperText={touched.confirmpassword && errors.confirmpassword}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t("Register")}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
