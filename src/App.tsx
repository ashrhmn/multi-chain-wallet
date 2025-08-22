import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./wagmi-config";
import { SolanaWalletProvider } from "./providers/solana-wallet-provider";
import { EvmWalletConnect } from "./components/evm-wallet-connect";
import { SolanaWalletConnect } from "./components/solana-wallet-connect";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [evmAddress, setEvmAddress] = useState<string | null>(null);
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <SolanaWalletProvider>
          <div className="App">
            <h1>Multi-Chain Wallet</h1>

            <div style={{ marginBottom: "2rem" }}>
              <h2>EVM Wallet</h2>
              <EvmWalletConnect onAddressChange={setEvmAddress} />
              <div>Address: {evmAddress || "Not connected"}</div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h2>Solana Wallet</h2>
              <SolanaWalletConnect onAddressChange={setSolanaAddress} />
              <div>Address: {solanaAddress || "Not connected"}</div>
            </div>
          </div>
        </SolanaWalletProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;
