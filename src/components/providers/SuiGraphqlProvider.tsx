// import { SuiGraphQLClient } from '@mysten/sui/graphql';
// import { graphql } from '@mysten/sui/graphql/schemas/latest';
// import { ApolloProvider } from '@apollo/client';


// const chainIdentifierQuery = graphql(`
// 	query {
// 		chainIdentifier
// 	}
// `);

// async function getChainIdentifier() {
// 	const result = await gqlClient.query({
// 		query: chainIdentifierQuery,
// 	});

// 	return result.data?.chainIdentifier;
// }
// export function SuiGraphqlProvider({ children }: { children: React.ReactNode }) {
//   const gqlClient = new SuiGraphQLClient({
//     url: 'https://sui-testnet.mystenlabs.com/graphql',
//   });

//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// }
