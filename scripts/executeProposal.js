const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

const GOVERNOR_ADDR = "0x2dAfd51fadfC8c09e681Ff731a2B723dDe5A2939";
const TOKEN_ADDR = "0x4ca29031173A81089ce961f3563f78a0a18ddC57";

async function main() {
    const owner = await ethers.getSigner();
    const governor = await ethers.getContractAt("MyGovernor",GOVERNOR_ADDR);
    const token = await ethers.getContractAt("MyToken",TOKEN_ADDR);
    
    await governor.execute(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
        keccak256(toUtf8Bytes("Give the owner more tokens!"))
      );


  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });