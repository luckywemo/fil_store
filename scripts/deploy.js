const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const deploymentOptions = {
    gasLimit: 30000000
  };

  // Deploy FilStore
  console.log("\nDeploying FilStore...");
  const FilStore = await hre.ethers.getContractFactory("FilStore");
  const filStore = await FilStore.deploy(deployer.address, deploymentOptions);
  await filStore.waitForDeployment();
  const filStoreAddress = await filStore.getAddress();
  console.log("FilStore deployed to:", filStoreAddress);

  // Save the contract address
  console.log("\nUpdate your .env file with this value:");
  console.log(`NEXT_PUBLIC_FIL_STORE_ADDRESS=${filStoreAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 