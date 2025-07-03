import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from '@tamagui/core';

export const config = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media,
  },
});

type OurConfig = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends OurConfig {}
}
