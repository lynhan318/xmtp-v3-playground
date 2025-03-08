import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import './index.css'
import App from './App.tsx'
import { createConfig, http, injected, WagmiProvider } from 'wagmi';
import { mainnet, ronin } from 'wagmi/chains';

const client = new QueryClient();

const connector = injected({
    target() {
        return {
            id: 'roninProvider',
            name: 'Ronin Provider',
            provider: window.ronin!.provider,
        }
    },
})
export const config = createConfig({
    chains: [mainnet, ronin],
    transports: {
        [mainnet.id]: http(),
        [ronin.id]: http(),
    },
    multiInjectedProviderDiscovery: false,
    connectors: [connector],
})
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <WagmiProvider config={config}>
                <App />
            </WagmiProvider>
        </QueryClientProvider>
    </StrictMode>,
)
