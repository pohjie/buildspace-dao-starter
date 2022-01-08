import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
  "0x5d245Ff15dE184EAf9316fC5f1Bc1BA1d3046d04"
);

(async() => {
  try {
    // What's the max supply you want to set?
    const amount = 1_000;
    // We use the util function from "ethers" to convert the amount
    // to have 18 decimals (which is the standard for ERC20 tokens).
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    // Print out how many of our tokens are out there now!
    console.log(
      "✅ There is now",
      ethers.utils.formatUnits(totalSupply, 18),
      "$ALT_CURRENT in circulation",
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();