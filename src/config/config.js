import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia,
  mintSepoliaTestnet
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'f21ba93c569f505fdb70b70e22ab2fb7',
  chains: [sepolia,mintSepoliaTestnet],
  ssr: true, 

});