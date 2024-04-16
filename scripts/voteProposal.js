const { ethers } = require("hardhat");

const GOVERNOR_ADDR = "0x2dAfd51fadfC8c09e681Ff731a2B723dDe5A2939";
const TOKEN_ADDR = "";

// Retrieved from createProposal
const PROPOSAL_ID = ethers.BigNumber.from("94005356302834718885224167885363925057740186836743011197926520738076084274426");

async function main() {
    const governor = await ethers.getContractAt("MyGovernor",GOVERNOR_ADDR);
    
    const tx = await governor.castVote(PROPOSAL_ID, 1);      
    const receipt = await tx.wait();
    const voteCastEvent = receipt.events.find(x => x.event === 'VoteCast');

    console.log('VOTER : ', voteCastEvent.args.voter);
    console.log('WEIGHT : ', voteCastEvent.args.weight.toString());
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });