import { NetworkEnum } from "@1inch/fusion-sdk";

export function isSupportedChain(chain_id) {
  if (chain_id == NetworkEnum.ARBITRUM) {
    return true;
  }
  return false;
}

export async function getQuote(
  one_inch,
  from_token_address,
  to_token_address,
  amount
) {
  const params = {
    fromTokenAddress: from_token_address,
    toTokenAddress: to_token_address,
    amount: amount,
  };

  const quote = await one_inch.getQuote(params);

  return quote;
}

export async function placeOrder(one_inch, quote, wallet_address) {
  const params = {
    fromTokenAddress: quote.params.fromTokenAddress,
    toTokenAddress: quote.params.toTokenAddress,
    amount: quote.params.amount,
    walletAddress: wallet_address,
  };

  const response = await one_inch.placeOrder(params);

  return response;
}
