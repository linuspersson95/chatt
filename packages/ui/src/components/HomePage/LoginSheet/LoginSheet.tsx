import { useState, useEffect } from 'react';
import { ChevronDown, X } from '@tamagui/lucide-icons';
import {
  Sheet,
  YStack,
  Input,
  H2,
  Button,
  Spinner,
  useMedia,
  Dialog,
  Fieldset,
  Label,
  XStack,
  Unspaced,
} from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@chatt/state';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginSheet({ open, onClose }: Props) {
  const { t } = useTranslation();
  const media = useMedia();
  const setUser = useAuthStore((state) => state.login);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) return;

    setTimeout(() => {
      setIsLoading(false);
      setUser(username);
      onClose();
    }, 1000);
  }, [isLoading]);

  const formContent = (
    <YStack>
      <Fieldset>
        <Label width={64} htmlFor="email">
          Epostadress
        </Label>
        <Input
          id="email"
          placeholder="e-mail"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          width="100%"
          disabled={isLoading}
        />
      </Fieldset>
      <Fieldset>
        <Label width={64} htmlFor="password">
          Lösenord
        </Label>
        <Input
          id="password"
          placeholder="Lösenord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          disabled={isLoading}
        />
      </Fieldset>
    </YStack>
  );

  if (media.gtSm) {
    return (
      <Dialog modal open={open} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay
            animation="medium"
            backgroundColor="$shadow6"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.FocusScope focusOnIdle>
            <Dialog.Content bordered elevate width={400}>
              <Dialog.Title>{t('login')}</Dialog.Title>
              {formContent}
              <XStack alignSelf="flex-end" gap="$4">
                <Button
                  theme="accent"
                  aria-label="Login"
                  onPress={() => {
                    console.log('Login med:', { username, password });
                    setIsLoading(true);
                  }}
                >
                  {isLoading ? (
                    <Spinner size="small" color="$green10" />
                  ) : (
                    t('login')
                  )}
                </Button>
              </XStack>
              <Unspaced>
                <Dialog.Close asChild>
                  <Button
                    position="absolute"
                    right="$3"
                    size="$2"
                    circular
                    icon={X}
                  />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.FocusScope>
        </Dialog.Portal>
      </Dialog>
    );
  }

  return (
    <Sheet
      open={open}
      forceRemoveScrollEnabled={open}
      onOpenChange={onClose}
      snapPoints={[66]}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      animation="medium"
      zIndex={100_000}
      modal
    >
      <Sheet.Overlay
        animation="medium"
        backgroundColor="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame p="$4" justifyContent="center" alignItems="center" gap="$5">
        <H2>{t('login')}</H2>
        {formContent}
        <Button
          theme="accent"
          aria-label="Login"
          onPress={() => {
            console.log('Login med:', { username, password });
            setIsLoading(true);
          }}
        >
          {isLoading ? <Spinner size="small" color="$green10" /> : t('login')}
        </Button>
        <Button size="$6" circular icon={ChevronDown} onPress={onClose} />
      </Sheet.Frame>
    </Sheet>
  );
}
