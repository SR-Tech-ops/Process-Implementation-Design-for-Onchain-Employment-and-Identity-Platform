// hardhat.config.js
require("@nomiclabs/hardhat-ethers");

module.exports = {
    solidity: "0.4.25",  // Match the Solidity version used in your contracts
    networks: {
        hardhat: {
            chainId: 31337, // Default Hardhat local network
        },
        basesepolia: {
            url: `https://sepolia.base.org`,  // Replace with your Infura URL or Alchemy URL
            accounts: [``],  // Private key of the deployer (ensure it is stored safely)
        },
    },
    etherscan: {
        apiKey: "YOUR_ETHERSCAN_API_KEY"  // Optional, for contract verification
    }
};
