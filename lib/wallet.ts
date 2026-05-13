import { Alchemy, Network, OwnedNft } from "alchemy-sdk";

const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

export const getNfts = async (address: string | undefined, pageSize: number, pageKey: string | undefined) => {

    // Parse output
    let numNfts = 0,
        nftList = null

    if(address)
    {
        let options:any = {
            pageSize
        }

        if(pageKey)
            options.pageKey = pageKey

        // Get all NFTs
        const nfts = await alchemy.nft.getNftsForOwner(
            address,
            options
        );

        numNfts = nfts["totalCount"]
        nftList = nfts["ownedNfts"] as unknown as OwnedNft[]
        pageKey = nfts["pageKey"]
    }

    return {numNfts, nftList, pageKey}
};