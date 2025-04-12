import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const FIL_CALIBRATION = {
  id: 314159,
  name: 'Filecoin Calibration',
  network: 'calibration',
  nativeCurrency: {
    decimals: 18,
    name: 'Test FIL',
    symbol: 'tFIL',
  },
  rpcUrls: {
    public: { http: ['https://api.calibration.node.glif.io/rpc/v1'] },
    default: { http: ['https://api.calibration.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    default: { name: 'Calibration Explorer', url: 'https://calibration.filscan.io' },
  },
  testnet: true,
};

export const config = createConfig(
  getDefaultConfig({
    appName: 'Fil Store',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    chains: [FIL_CALIBRATION],
    transports: {
      [FIL_CALIBRATION.id]: http(),
    },
  })
);

export const FIL_STORE_ADDRESS = process.env.NEXT_PUBLIC_FIL_STORE_ADDRESS || ''; 