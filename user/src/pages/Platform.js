import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import Iframe from 'react-iframe'
import Page from '../components/Page';
import SelectSite from './SelectSite'
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function EcommerceShop() {
  const { t } = useTranslation();
  const load = (params) => {

  }

  useEffect(() => {
    load()
  }, [])
  return (
    <Page title=" Platform Modules | Holest">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">
            {t("Platform Modules")}
          </Typography>
          <SelectSite reload={load} />
        </Stack>
        <Iframe height="100%" overflow="hidden" frameBorder="0" url="./static/platform_modules.html" />
      </Container>
    </Page>
  );
}
