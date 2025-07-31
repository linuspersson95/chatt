import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryProvider } from '@chatt/state';
import App from './app/app';
import '@chatt/translation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>,
);
