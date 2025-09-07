import { Alchemy, Network } from "alchemy-sdk";

const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
};

export const alchemy = new Alchemy(settings);
