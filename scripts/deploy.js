// scripts/deploy.js

// Import required Hardhat tools
const { ethers } = require("hardhat");

async function main() {
    // Get the deployer from the Hardhat network (the first account by default)
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the Security contract first
    console.log("Deploying Security contract...");
    const Security = await ethers.getContractFactory("Security");  // Fetch the contract factory for 'Security'
    const security = await Security.deploy();  // Deploy the contract
    await security.deployed();  // Wait until deployment is completed
    console.log("Security contract deployed to:", security.address);

    // Deploy the MultiSigWallet contract, passing the Security contract address as a parameter
    console.log("Deploying MultiSigWallet contract...");
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWalletFactory");  // Fetch the contract factory for 'MultiSigWallet'
    const multiSigWallet = await MultiSigWallet.deploy(security.address);  // Pass the Security contract's address
    await multiSigWallet.deployed();  // Wait until deployment is completed
    console.log("MultiSigWallet contract deployed to:", multiSigWallet.address);

    // Deploy the BiometricStorage contract
    console.log("Deploying BiometricStorage contract...");
    const BiometricStorage = await ethers.getContractFactory("BiometricStorage");  // Fetch the contract factory for 'BiometricStorage'
    const biometricStorage = await BiometricStorage.deploy();  // Deploy the contract
    await biometricStorage.deployed();  // Wait until deployment is completed
    console.log("BiometricStorage contract deployed to:", biometricStorage.address);

    // Optionally, you can deploy other contracts or perform interactions here
}

// Execute the main function and handle errors
main()
    .then(() => process.exit(0))  // Exit the process on success
    .catch((error) => {
        console.error("Error during deployment:", error);  // Log the error if deployment fails
        process.exit(1);  // Exit with failure status
    });
