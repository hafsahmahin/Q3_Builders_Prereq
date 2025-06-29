import { Transaction, SystemProgram, Connection, Keypair, 
    LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from 
    "@solana/web3.js"
    import wallet from "./dev-wallet.json";

    // Import our dev wallet keypair from the wallet file  

    const from = Keypair.fromSecretKey(new Uint8Array(wallet));  

    // Define our Turbin3 public key  
const to = new  PublicKey("EDcSc7TqbzfHU8YApbJm3FQzGdiyr4wKSUFp9xgujKtV"); 
//And create a devnet connection:  
//Create a Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com");  
//Now we're going to create a transaction using @solana/web3.js to transfer 0.1 SOL from our dev wallet to our Turbin3 wallet address on the Solana devenet. Here's how we do that:  

(async () => {  
try {  
const transaction = new Transaction().add(  
SystemProgram.transfer({  
fromPubkey: from.publicKey,  
toPubkey: to,  
lamports: LAMPORTS_PER_SOL/100,  
})  
);  
transaction.recentBlockhash = (await  
connection.getLatestBlockhash('confirmed')).blockhash; 
transaction.feePayer = from.publicKey;  
// Sign transaction, broadcast, and confirm  
const signature = await sendAndConfirmTransaction(  
connection,  
transaction,  
[from]  
);  
console.log(`Success! Check out your TX here:  
https://explorer.solana.com/tx/${signature}?cluster=devnet`); 
} catch(e) {  
console.error(`Oops, something went wrong: ${e}`)  
}  
})();