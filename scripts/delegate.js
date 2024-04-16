const { ethers } = require("hardhat");

const TOKEN_ADDR = "0x4ca29031173A81089ce961f3563f78a0a18ddC57";

async function main() {
    const owner = await ethers.getSigner();
    const token = await ethers.getContractAt("MyToken",TOKEN_ADDR);

    await token.delegate(owner.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });