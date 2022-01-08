import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0xDE48fC30BA97702bd1bF17475C3A153c7D7A01E8",
);

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
  "0x5d245Ff15dE184EAf9316fC5f1Bc1BA1d3046d04",
);

(async() => {
  try {
    // Grab all the addresses of people who own our membership NFT,
    // which has a tokenId of 0
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");
    
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1 and 1000.
      const MIN_VALUE = 1;
      const MAX_VALUE = 1000;
      const randomAmount = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      // Set up the target
      const airdropTarget = {
        address,
        // Remember, we need 18 decimal places!
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await tokenModule.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of this NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();