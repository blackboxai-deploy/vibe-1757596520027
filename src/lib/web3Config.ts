import { createConfig, http } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

const projectId = 'demo-project-id' // In production, use real WalletConnect project ID

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism, base],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'LineGram - Web3 Social Commerce',
        description: 'Decentralized messaging and shopping platform',
        url: 'https://linegram.app',
        icons: ['https://linegram.app/icon.png']
      }
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})

// Popular token contracts for different chains
export const TOKENS = {
  [mainnet.id]: {
    USDC: '0xA0b86a33E6Ef3D05c1F4e7A65d0a5e7d4D0a2e2e',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
  [polygon.id]: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  },
}

// NFT Marketplace contract addresses (mock for demo)
export const CONTRACTS = {
  MARKETPLACE: '0x1234567890123456789012345678901234567890',
  NFT_COLLECTION: '0x0987654321098765432109876543210987654321',
  PAYMENT_PROCESSOR: '0x1111222233334444555566667777888899990000',
}

// Common token decimals
export const TOKEN_DECIMALS = {
  ETH: 18,
  USDC: 6,
  USDT: 6,
  DAI: 18,
}