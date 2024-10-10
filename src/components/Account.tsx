import { useCallback, useEffect } from "react";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSwitchAccount,
  useSwitchChain,
} from "wagmi";

export function Account() {
  //const connectors = useConnectors();
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchAccount } = useSwitchAccount();
  const { switchChain } = useSwitchChain();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formattedAddress = formatAddress(address);

  const handleSwitchAccount = useCallback(() => {
    console.info(connector);
    if (connector) {
      console.info(connector);
      switchAccount({ connector }, {
        onSuccess: () => console.log("Switched account"),
        onError: (error) => console.error(error),
        onSettled: () => console.log("Switch account settled"),
      });
    }
  }, [connector]);

  const handleSwitchChain = useCallback(() => {
    if (connector) {
      switchChain(
        { connector, chainId: 2 },
        {
          onSuccess: () => console.log("Switched chain"),
          onError: (error) => console.error(error),
          onSettled: () => console.log("Switch chain settled"),
        }
      );
    }
  }, [connector]);
  useEffect(() => {
    console.log("Account");
  }, []);
  return (
    <div className="row">
      <div className="inline">
        {ensAvatar ? (
          <img alt="ENS Avatar" className="avatar" src={ensAvatar} />
        ) : (
          <div className="avatar" />
        )}
        <div className="stack">
          {address && (
            <div className="text">
              {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
            </div>
          )}
          <div className="subtext">
            Connected to {connector?.name} Connector
          </div>
        </div>
      </div>
      <button className="button" onClick={() => disconnect()} type="button">
        Disconnect
      </button>
      <button
        className="button"
        onClick={() => handleSwitchAccount()}
        type="button"
      >
        Switch Account
      </button>
      <button
        className="button"
        onClick={() => handleSwitchChain()}
        type="button"
      >
        Switch Chain
      </button>
    </div>
  );
}

function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}
