import { useState } from 'react';
import { H1, View, XGroup, YStack, Button } from 'tamagui';
import { useTranslation } from 'react-i18next';
import LoginSheet from './LoginSheet/LoginSheet';

export default function HomePage() {
  const { t } = useTranslation();

  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  return (
    <View padding={10}>
      <H1>{t('welcome')}</H1>
      <YStack alignItems="center">
        <XGroup padding={10}>
          <XGroup.Item>
            <Button theme="green" onPress={() => setLoginOpen(true)}>
              {t('login')}
            </Button>
          </XGroup.Item>
          <XGroup.Item>
            <Button theme="blue">{t('createAccount')}</Button>
          </XGroup.Item>
        </XGroup>
      </YStack>
      <LoginSheet open={loginOpen} onClose={() => setLoginOpen(false)} />
    </View>
  );
}
