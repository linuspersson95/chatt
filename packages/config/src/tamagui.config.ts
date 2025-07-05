import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui, type CreateTamaguiConfig } from 'tamagui';

export const config = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    space: {
      ...defaultConfig.tokens.space,
      sm: 4,
    },
  },
});

type OurConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends OurConfig {}
}
