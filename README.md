# FilStore - NFT Marketplace on Filecoin

FilStore is a decentralized marketplace built on Filecoin that allows users to create, buy, and sell both regular products and NFTs. The platform combines traditional e-commerce functionality with NFT capabilities.

## Features

- **Product Management**
  - Create products with name, description, price, and images
  - Support for both regular products and NFTs
  - Product ownership tracking

- **NFT Integration**
  - Mint NFTs for products
  - Transfer NFT ownership upon purchase
  - Store metadata and image URIs

- **User Features**
  - Purchase products with cryptocurrency
  - View owned products
  - Track purchase history

## Smart Contract

The project's core is the `FilStore.sol` smart contract which implements:

- ERC721 standard for NFTs
- Product creation and management
- Purchase functionality
- Ownership tracking
- Withdrawal capabilities

### Contract Functions

- `createProduct`: Create a new product (can be NFT or regular)
- `purchaseProduct`: Buy a product
- `withdraw`: Owner can withdraw collected funds
- `getUserProducts`: View products owned by a user
- `getProduct`: Get product details

## Technical Stack

- **Smart Contract**
  - Solidity ^0.8.20
  - OpenZeppelin Contracts
  - Hardhat for development

- **Frontend**
  - Next.js
  - Chakra UI
  - Wagmi for Web3 integration
  - Viem for Ethereum interaction

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file with:
```
CALIBRATION_RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key
```

3. Compile contracts:
```bash
npx hardhat compile
```

4. Deploy to Calibration Network:
```bash
npm run deploy
```

## Network Support

Currently deployed on Filecoin Calibration Network for testing.

## License

MIT License
