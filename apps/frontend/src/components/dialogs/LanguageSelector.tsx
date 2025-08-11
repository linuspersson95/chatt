import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';
import { useDialogStore } from '@frontend/state';
import type { SupportedLanguages } from '@chatt/types';

type Languages = {
  languageCode: SupportedLanguages;
  language: 'Svenska' | 'English' | 'Español' | 'Türkçe' | 'हिंदी';
  flagCode: 'SE' | 'GB' | 'ES' | 'TR' | 'IN';
};

const languages: Languages[] = [
  { languageCode: 'sv', language: 'Svenska', flagCode: 'SE' },
  { languageCode: 'en', language: 'English', flagCode: 'GB' },
  { languageCode: 'es', language: 'Español', flagCode: 'ES' },
  { languageCode: 'tr', language: 'Türkçe', flagCode: 'TR' },
  { languageCode: 'hi', language: 'हिंदी', flagCode: 'IN' },
];

export default function LanguageSelectorDialog() {
  const isOpen = useDialogStore((state) => state.dialog.languageSelector);
  const closeDialog = useDialogStore((state) => state.setDialogClose);

  const { i18n, t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeDialog('languageSelector')}
      aria-labelledby="language-selector-dialog-title"
      aria-describedby="language-selector-dialog-description"
    >
      <DialogTitle id="language-selector-dialog-title">
        {t('languageDialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="language-selector-dialog-description">
          {t('languageDialog.description')}
        </DialogContentText>
        <Stack direction="row" spacing={1} mt={1}>
          {languages.map(({ flagCode, language, languageCode }) => (
            <Chip
              sx={{ p: 0.5 }}
              key={languageCode}
              icon={<Flag code={flagCode} height={16} alt={`${flagCode}`} />}
              label={language}
              variant={languageCode === i18n.language ? 'filled' : 'outlined'}
              clickable={languageCode !== i18n.language}
              onClick={() => i18n.changeLanguage(languageCode)}
            />
          ))}
        </Stack>
        <DialogActions>
          <Button onClick={() => closeDialog('languageSelector')}>Stäng</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
