import { Container, Typography } from '@mui/material';
import Iframe from 'react-iframe'
// components
import Page from '../components/Page';


// ----------------------------------------------------------------------

export default function EcommerceShop() {

  return (
    <Page title=" Platform Modules | Holest">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Platform Modules
        </Typography>
        <Iframe height="100%" overflow="hidden" frameBorder="0" url="./static/platform_modules.html" />
      </Container>
    </Page>
  );
}
