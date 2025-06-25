const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const monTokenAddress = process.env.MON_TOKEN_ADDRESS;
  const PaymentGateway = await hre.ethers.getContractFactory("PaymentGateway");
  const paymentGateway = await PaymentGateway.deploy(monTokenAddress);

  await paymentGateway.deployed();
  console.log("PaymentGateway deployed to:", paymentGateway.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});