const { ethers } = require("hardhat");

const GOVERNOR_ADDR = "0x2dAfd51fadfC8c09e681Ff731a2B723dDe5A2939";
const TOKEN_ADDR = "0x4ca29031173A81089ce961f3563f78a0a18ddC57";

async function main() {
    const owner = await ethers.getSigner();
    const governor = await ethers.getContractAt("MyGovernor",GOVERNOR_ADDR);
    const token = await ethers.getContractAt("MyToken",TOKEN_ADDR);
    
    const tx = await governor.propose(
        [TOKEN_ADDR],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, ethers.utils.parseEther("25000")])],
        "Give the owner more tokens!"
      );

      const receipt = await tx.wait();
      const event = receipt.events.find(x => x.event === 'ProposalCreated');
      const { proposalId } = event.args;

      console.log('Proposal ID : ', proposalId);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });