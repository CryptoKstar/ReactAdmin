// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
// import { fetchUtils } from 'react-admin';
// import configData from "config.json";
// import jsonServerProvider from 'ra-data-json-server';
// // ----------------------------------------------------------------------

// const httpClient = (url, options = {}) => {
//   if (!options.headers) {
//       options.headers = new Headers({ Accept: 'application/json' });
//   }
//   const token = JSON.parse(sessionStorage.AccessToken).Token;
//   options.headers.set('Authorization', `${token}`);
//   return fetchUtils.fetchJson(url, options);
// };

// const dataProvider = jsonServerProvider(configData.API_URL + 'api', httpClient);

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
