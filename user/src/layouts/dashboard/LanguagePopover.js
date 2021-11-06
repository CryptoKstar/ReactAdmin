import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import { useTranslation } from 'react-i18next';

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/gb.png'
  },
  {
    value: 'sb',
    label: 'Serbia',
    icon: '/static/icons/rs.png'
  },
];

export default function LanguagePopover() {
  const { i18n } = useTranslation();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  // const [index, setindex] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const languagechange = (params) => {
    setOpen(false);
    i18n.changeLanguage(params)
    if (params === "en") {
      sessionStorage.index = 0
    } else {
      sessionStorage.index = 1
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <img src={LANGS[sessionStorage.index ? sessionStorage.index : 0].icon} alt={LANGS[0].label} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={(e) => languagechange(option.value)}
              // onChange = {}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
