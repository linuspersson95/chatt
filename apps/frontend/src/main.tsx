import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { defaultConfig } from '@tamagui/config/v4';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const config = createTamagui(defaultConfig);

type Config = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Config {}
}

root.render(
  <StrictMode>
    <TamaguiProvider config={config}>
      <App />
    </TamaguiProvider>
  </StrictMode>
);
