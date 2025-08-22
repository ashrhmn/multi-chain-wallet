import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";

type EvmWalletConnectProps = {
  onAddressChange: (address: string | null) => void;
};

export function EvmWalletConnect({ onAddressChange }: EvmWalletConnectProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const metaMaskConnector = connectors.find(
      (connector) =>
        connector.name.toLowerCase().includes("metamask") ||
        connector.id === "metaMask",
    );

    if (metaMaskConnector) {
      connect({ connector: metaMaskConnector });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onAddressChange(null);
  };

  useEffect(() => {
    if (isConnected && address) {
      onAddressChange(address);
    } else {
      onAddressChange(null);
    }
  }, [isConnected, address, onAddressChange]);

  return (
    <div>
      {isConnected ? (
        <button onClick={handleDisconnect}>Disconnect EVM</button>
      ) : (
        <button onClick={handleConnect}>Connect EVM</button>
      )}
    </div>
  );
}
