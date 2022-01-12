const web3 = require("@solana/web3.js");

const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);

// const userWallet = web3.Keypair.generate();
// console.log(userWallet);

// const publicKey = new web3.PublicKey(userWallet._keypair.publicKey).toString();
// const secretKey = userWallet._keypair.secretKey;

module.exports = {
    airDropSol: async (secretKey) => {
        try {
          const walletKeyPair = await web3.Keypair.fromSecretKey(secretKey);
        //   console.log(`-- Airdropping 2 SOL --`);
          const fromAirDropSignature = await connection.requestAirdrop(
            new web3.PublicKey(walletKeyPair.publicKey),
            2 * web3.LAMPORTS_PER_SOL
          );
          await connection.confirmTransaction(fromAirDropSignature);
        } catch (err) {
          console.log(err);
        }
      },

      transfer: async(from,to,transferAmt) => {
        try{
            const transaction = new web3.Transaction().add(
                web3.SystemProgram.transfer({
                  fromPubkey: new web3.PublicKey(from.publicKey.toString()),
                  toPubkey: new web3.PublicKey(to.publicKey.toString()),
                  lamports: transferAmt*web3.LAMPORTS_PER_SOL,
                })
              );
              const signature = await web3.sendAndConfirmTransaction(
                connection,
                transaction,
                [from]
              );
              console.log("Signature is ", signature);
              return signature;
        }catch(err){
            console.log(err);
        }
    },

    getWalletBalance: async (pubk)=>{
        try{
            const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
            const balance=await connection.getBalance(new web3.PublicKey(pubk));
            console.log("Account balance is",balance/web3.LAMPORTS_PER_SOL);
        }catch(err){
            console.log(err);
        }
    }
}

