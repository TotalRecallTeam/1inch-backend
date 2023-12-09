import { ethers } from "ethers";
import { FusionSDK, NetworkEnum } from "@1inch/fusion-sdk";
import dotenv from "dotenv";

dotenv.config();

function isSupportedChain(chain_id) {
  if (chain_id == NetworkEnum.ARBITRUM) {
    return true;
  }
  return false;
}

async function getQuote(sdk, from_token_address, to_token_address, amount) {
  const params = {
    fromTokenAddress: from_token_address,
    toTokenAddress: to_token_address,
    amount: amount,
  };

  const quote = await sdk.getQuote(params);

  return quote;
}

async function placeOrder(sdk, quote, wallet_address) {
  const params = {
    fromTokenAddress: quote.params.fromTokenAddress,
    toTokenAddress: quote.params.toTokenAddress,
    amount: quote.params.amount,
    walletAddress: wallet_address,
  };

  sdk.placeOrder(params).then(console.log);
}

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

  await placeOrder(one_inch_sdk, quote, wallet_address);
}

main();
