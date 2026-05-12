import { useState } from "react";
import { ethers } from "ethers";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract";

interface WishItem {
    name: string;
    isFullfilled: boolean;
    createdAt: bigint;
}

export function useWishlist() {
    const[account, setAccount] = useState<string>("");
    const [owner, setOwner] = useState<string>("");
    const[wishes, setWishes] = useState<WishItem[]>([]);
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    async function connect(){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        await loadWishes(provider);
        await loadOwner(provider);
    }

    async function loadOwner(provider:ethers.BrowserProvider) {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const o = await contract.owner();
        setOwner(o.toLowerCase());
    }

    async function loadWishes(provider:ethers.BrowserProvider) {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const result = await contract.getWishes();
        setWishes(result.map((w: WishItem) => ({
            name: w.name,
            isFullfilled: w.isFullfilled,
            createdAt: w.createdAt
        })));
    }

    async function addWish(name:string) {
        try {
            setError("");
            setLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            const tx = await contract.addWish(name);
            tx.wait();
            await new Promise(resolve => setTimeout(resolve, 5000));
            await loadWishes(provider);
        } catch(e: any) {
            setError(e?.reason || "Transaction failed");
        } finally {
            setLoading(false);
        }
    }

    async function fulfillWish(index: number){
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            const tx = await contract.fulfillWish(index);
            await tx.wait();
            await new Promise(resolve => setTimeout(resolve, 5000));
            await loadWishes(provider);
        } catch(e: any) {
            setError(e?.reason || "Transaction failed");
        } finally {
            setLoading(false);
        }
    }

    async function deleteWish(index: number){
        try{
            setError("");
            setLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            const tx = await contract.deleteWish(index);
            await tx.wait(); 
            await new Promise(resolve => setTimeout(resolve, 5000));
            await loadWishes(provider);
        } catch(e: any) {
            setError(e?.reason || "Transaction failed");
        } finally {
            setLoading(false);
        }
    }

    const isOwner = account.toLowerCase() === owner;

  return { account, wishes, loading, error, isOwner, connect, addWish, fulfillWish, deleteWish };
}


