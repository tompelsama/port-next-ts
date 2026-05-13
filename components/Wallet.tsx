"use client"

import { getNfts } from '@/lib/wallet'
import { OwnedNft } from 'alchemy-sdk'
import { useEffect, useState, useRef } from 'react'
import { PacmanLoader } from 'react-spinners'

type NftProp = {
    numNfts: number,
    nftList: OwnedNft[] | null,
    pageKey: string | undefined
}

const perPage = 8;

export default function WalletComponent({ }) {
    const [walletAddress, setWalletAddress] = useState(
        process.env.NEXT_PUBLIC_WALLET_ADDRESS
    )
    let [totalPerPage, setTotalPerPage] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [nfts, setNfts] = useState<OwnedNft[]>([])
    const [page, setPage] = useState<string | undefined>()
    const [error, setError] = useState<string | null>(null)
    const [firstLoading, setfirstLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [lastPage, setLastPage] = useState(true)

    const input = useRef<any>(null)

    const fetchNfts = async () => {
        setError(null)
        setLoading(true)
        try {
            const { numNfts, nftList, pageKey }:NftProp = await getNfts(walletAddress, perPage, page)

            setTotal(numNfts)

            if(nftList)
            {
                setTotalPerPage(totalPerPage += nftList.length)
                nftList.forEach((data) =>  
                {
                    setNfts((nfts:any) => [...nfts, data])
                })
            }

            if(!pageKey)
                setLastPage(true)
            else
                setLastPage(false)
            
            setPage(pageKey)
        } catch (e) {
            setNfts([])
            // setError(e as Error)
            setError('Something wrong when fetching the data from your wallet. Please try again.')
        }
        setLoading(false)
    }

    const updateWallet = (e: any) => 
    {
        e.preventDefault();

        const inputValue = input.current.value
        setWalletAddress(inputValue)
    }

    useEffect(() => {
        fetchNfts()
        setfirstLoading(false)
    }, [walletAddress])
    
    return (
        <div className='wallet-section'>
            <form className='wallet-form' onSubmit={updateWallet}>
                <div className='wallet-form-control'>
                    <label className='' htmlFor='wallet-address'>Wallet address</label>
                    <input
                        ref={input}
                        id='wallet-address'
                        type='text'
                        defaultValue={walletAddress}
                        placeholder='Enter a wallet address here to view NFTs'
                    />
                    <button className="wallet-form-btn">Submit</button>
                </div>
            </form>

            {(!firstLoading && total > 0) ? <div className="nft-total">Total: {`${totalPerPage} / ${total}`}</div> : ''}

            <div className='nfts-grid'>

                {!firstLoading && nfts.map((nft) => {
                    return (
                        <div
                        key={`${nft.contract.address}/${nft.tokenId}`}
                        className='nft-card'
                        >
                            <div className="nft-image-holder">
                                <img
                                    className='nft-image'
                                    src={nft.image?.thumbnailUrl || '/images/image-placeholder.jpg'}
                                    alt={nft.name}
                                />
                            </div>
                            <div className="nft-desc">
                                <p className='nft-name'>{nft.contract.name}</p>
                                <p className='nft-collection-name'>{nft.name}</p>
                            </div>
                        </div>
                    )
                })}

                {loading && <div className="loader">
                    <PacmanLoader color={"#011627"} />
                </div>}
                
            </div>

            {(!firstLoading && !lastPage) ? <div className="nft-load-more">
                <button onClick={() => {fetchNfts()}}>
                    Load more
                </button>
            </div> : ''}

            {error && (
            <div className='flex flex-col items-center mt-8'>
                <p className='text-red-700'>
                    {error}
                </p>
            </div>
            )}
        </div>
        
    )
}