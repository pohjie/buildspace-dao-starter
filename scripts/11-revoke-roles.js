import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0x5d245Ff15dE184EAf9316fC5f1Bc1BA1d3046d04",
);

(async () => {
  try {
    // Log the current roles.
    console.log(
      "👀 Roles that exist right now:",
      await tokenModule.getAllRoleMembers()
    );

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log(
      "🎉 Roles after revoking ourselves",
      await tokenModule.getAllRoleMembers()
    );
    console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");
  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  } 
})();