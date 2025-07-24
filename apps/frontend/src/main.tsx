import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { TamaguiProvider } from 'tamagui';
import { config } from '@chatt/config';
import { QueryProvider } from '@chatt/state';
import App from './app/app';
import '@chatt/translation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <TamaguiProvider config={config}>
      <QueryProvider>
        <App />
      </QueryProvider>
    </TamaguiProvider>
  </StrictMode>,
);
