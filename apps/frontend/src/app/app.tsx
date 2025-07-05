import { Button } from '@chatt/ui';
import { H1, View } from 'tamagui';
import { useTranslation } from 'react-i18next';

export function App() {
  const { t } = useTranslation();
  return (
    <View p={10}>
      <H1>{t('welcome')}</H1>
      <Button text={t('btnText')} />
    </View>
  );
}

export default App;
