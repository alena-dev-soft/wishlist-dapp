# Wishlist dApp

A decentralized wishlist application built on Ethereum (Sepolia testnet). Wishes are stored on-chain, making them permanent, transparent, and tamper-proof. The contract owner can add, fulfill, and delete wishes via a clean React UI.

## Features

- **Connect wallet** — MetaMask integration via ethers.js
- **Add wishes** — anyone connected can write a wish to the blockchain
- **Fulfill wishes** — owner can mark a wish as completed
- **Delete wishes** — owner can remove a wish from the list
- **Owner badge** — the contract deployer is identified and gets management controls
- **Timestamps** — each wish records its creation date on-chain

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Blockchain | Ethereum Sepolia testnet |
| Web3 library | ethers.js v6 |
| Wallet | MetaMask (EIP-1193) |

## Smart Contract

Deployed on **Sepolia** at:

```
0x90AC79Fc5558A534e8A641960d9E157e22d0F5eF
```

ABI summary:

```solidity
function addWish(string memory _name) public
function fulfillWish(uint _index) public
function deleteWish(uint _index) public
function getWishes() public view returns (tuple(string name, bool isFullfilled, uint256 createdAt)[])
function getWish(uint256 _index) public view returns (tuple(string name, bool isFullfilled, uint256 createdAt))
function owner() public view returns (address)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MetaMask](https://metamask.io/) browser extension
- Sepolia testnet ETH (free from a [faucet](https://sepoliafaucet.com/))

### Install & Run

```bash
cd wishlist-dapp
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. Open the app and click **Connect MetaMask**
2. Approve the connection in MetaMask and switch to **Sepolia** network
3. Type a wish in the input field and press **Add** (or hit Enter)
4. Confirm the transaction in MetaMask — your wish appears once the block is mined
5. If you are the contract owner, **Complete** and **Delete** buttons appear on each wish

## Project Structure

```
wishlist-dapp/
├── src/
│   ├── App.tsx          # Main UI component
│   ├── useWishlist.ts   # Custom hook — all contract interactions
│   ├── contract.ts      # Contract address and ABI
│   └── main.tsx         # React entry point
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.ts
└── package.json
```

## License

MIT
