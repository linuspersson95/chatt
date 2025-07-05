import { H1, View, XGroup, YStack, Button } from 'tamagui';
import { useTranslation } from 'react-i18next';

export function App() {
  const { t } = useTranslation();
  return (
    <View p={10}>
      <H1>{t('welcome')}</H1>
      <YStack alignItems="center">
        <XGroup p={10}>
          <XGroup.Item>
            <Button theme="green">{t('login')}</Button>
          </XGroup.Item>
          <XGroup.Item>
            <Button theme="blue">{t('createAccount')}</Button>
          </XGroup.Item>
        </XGroup>
      </YStack>
    </View>
  );
}

export default App;
