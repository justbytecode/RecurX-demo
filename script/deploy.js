require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const monTokenAddress = process.env.MON_TOKEN_ADDRESS;
  if (!monTokenAddress) {
    throw new Error("Missing MON_TOKEN_ADDRESS in .env");
  }

  const PaymentGateway = await hre.ethers.getContractFactory("PaymentGateway");
  const paymentGateway = await PaymentGateway.deploy(monTokenAddress);
  await paymentGateway.waitForDeployment(); 

  console.log("PaymentGateway deployed to:", await paymentGateway.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
