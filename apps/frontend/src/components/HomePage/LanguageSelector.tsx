import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';
import { useDialogStore } from '../../global-state';

type Languages = {
  languageCode: string;
  language: string;
  flagCode: 'SE' | 'GB';
};

const languages: Languages[] = [
  { languageCode: 'sv', language: 'svenska', flagCode: 'SE' },
  { languageCode: 'en', language: 'engelska', flagCode: 'GB' },
];

export default function LanguageSelectorDialog() {
  const isOpen = useDialogStore((state) => state.dialog.languageSelector);
  const closeDialog = useDialogStore((state) => state.setDialogClose);

  const { i18n } = useTranslation();

  const [newLanguage, setNewLanguage] = useState<string>(i18n.language);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setNewLanguage(event.target.value);
  };

  const handleSubmit = () => {
    if (newLanguage !== i18n.language) {
      i18n.changeLanguage(newLanguage);
    }
    closeDialog('languageSelector');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeDialog('languageSelector')}
      aria-labelledby="language-selector-dialog-title"
      aria-describedby="language-selector-dialog-description"
    >
      <DialogTitle id="language-selector-dialog-title">Välj språk</DialogTitle>
      <DialogContent>
        <DialogContentText id="language-selector-dialog-description">
          Här kan du välja vilket språk du vill att sidan och chattarna ska vara
          på
        </DialogContentText>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="language-selector-dialog-select-label">
            Språk
          </InputLabel>
          <Select
            labelId="language-selector-dialog-select-label"
            id="language-selector-dialog-select"
            value={newLanguage}
            onChange={handleChange}
            input={<OutlinedInput label="Språk" />}
          >
            {languages.map((languageItem) => (
              <MenuItem
                key={languageItem.languageCode}
                value={languageItem.languageCode}
              >
                {languageItem.language}
                <Flag
                  size={32}
                  code={languageItem.flagCode}
                  style={{ marginRight: 8 }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={() => closeDialog('languageSelector')}>
            Avbryt
          </Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
