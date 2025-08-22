import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

type SolanaWalletConnectProps = {
  onAddressChange: (address: string | null) => void;
};

export function SolanaWalletConnect({
  onAddressChange,
}: SolanaWalletConnectProps) {
  const { publicKey, connected } = useWallet();

  useEffect(() => {
    if (connected && publicKey) {
      onAddressChange(publicKey.toString());
    } else {
      onAddressChange(null);
    }
  }, [connected, publicKey, onAddressChange]);

  return (
    <div>
      <WalletMultiButton>
        {connected ? "Disconnect Solana" : "Connect Solana"}
      </WalletMultiButton>
    </div>
  );
}
