import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

// bundleDrop module is actually the ERC-1155 contract
const bundleDrop = sdk.getBundleDropModule(
  "0xDE48fC30BA97702bd1bF17475C3A153c7D7A01E8",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Patrons of Science portrait",
        description: "This NFT will give you access to PoSDAO!",
        image: readFileSync("scripts/assets/tesla.jpeg"),
      },
    ]);

    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("Failed to create the new NFT", error);
  }
})()