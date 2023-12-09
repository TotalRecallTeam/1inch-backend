import { ethers } from "ethers";
import { dotenv } from "dotenv";
import { FusionSDK, NetworkEnum } from "@1inch/fusion-sdk";
import { getQuote, placeOrder } from "./one_inch_utils";

dotenv.config();

async function main() {
  const one_inch_api_key = process.env.ONE_INCH_API_KEY;
  const wallet_address = process.env.WALLET_ADDRESS;
  const wallet_pk = process.env.WALLET_PRIVATE_KEY;
  const rpc_url = process.env.ARBITRUM_RPC_URL;

  const provider = new ethers.providers.JsonRpcProvider(rpc_url);

  const blockchainProvider = new ethers.Wallet(wallet_pk, provider);

  const one_inch_sdk = new FusionSDK({
    url: "https://api.1inch.dev/fusion",
    network: NetworkEnum.ARBITRUM,
    blockchainProvider: blockchainProvider,
    authKey: one_inch_api_key,
  });

  const from_token_address = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"; // WETH
  const to_token_address = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"; // USDC
  const amount = "1000000000000000000";

  const quote = await getQuote(
    one_inch_sdk,
    from_token_address,
    to_token_address,
    amount
  );

  const order = await placeOrder(one_inch_sdk, quote, wallet_address);

  console.log(order);
}

main();
