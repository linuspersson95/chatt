import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { TamaguiProvider } from 'tamagui';
import { config } from '@chatt/config';
import App from './app/app';
import '../i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <TamaguiProvider config={config}>
      <App />
    </TamaguiProvider>
  </StrictMode>
);
