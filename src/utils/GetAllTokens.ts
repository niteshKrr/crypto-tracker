import { Alchemy, Network } from 'alchemy-sdk';

export const getAllMyTokens = async (address: string, chain: Network) => {
	const config = {
		apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
		network: chain,
	};
	const alchemy = new Alchemy(config);

	// Get token balances
	const balances = await alchemy.core.getTokenBalances(address);

	// Remove tokens with zero balance
	const nonZeroBalances = balances.tokenBalances.filter((token) => {
		return token.tokenBalance !== '0';
	});

	console.log('hello world');
	// Counter for SNo of final output
	let i = 1;

	// Loop through all tokens with non-zero balance
	let tokenList = [];
	for (let token of nonZeroBalances) {
		// Get balance of token
		let balance = token.tokenBalance || 0;
		// Get metadata of token
		const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

		// Compute token balance in human-readable format
		balance = Number(balance) / Math.pow(10, metadata.decimals || 0);
		balance = balance.toFixed(2);

		// console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
		tokenList.push({ name: metadata.name, balance, symbol: metadata.symbol });

		// Print name, balance, and symbol of token
	}
	return tokenList;
};
