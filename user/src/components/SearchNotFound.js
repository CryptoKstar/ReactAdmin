import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  const { t } = useTranslation();
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        {t("Not found")}
      </Typography>
    </Paper>
  );
}
