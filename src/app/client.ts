import { createThirdwebClient } from "thirdweb";

const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;

if (!clientID) {
  throw new Error("Please set NEXT_PUBLIC_CLIENT_ID in your .env file");
}

export const client = createThirdwebClient({
  clientId: clientID,
});
