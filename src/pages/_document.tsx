import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta
					property="og:title"
					content="Dashboard for all your crypto tokens"
					key="crypto tracker"
				/>
				<meta charSet="UTF-8" />
				<meta
					name="description"
					content="Dashboard for all your crypto tokens"
				/>
				<meta
					name="keywords"
					content="crypto, cryptoss, dashboard, crypto dashboard, cryptocurrencies, blockchain, arbitrium, deependu, Deependu Jha, Nitesh, Nitesh Kumar, Ethereum, Polygon, Solana, optimism"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
