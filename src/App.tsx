import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { ConnectWallet } from './components/ConnectWallet';
import { config } from './wagmi';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    console.log('WagmiProvider')
  }, [])
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
