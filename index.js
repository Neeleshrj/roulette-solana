const { Keypair, PublicKey } = require("@solana/web3.js");
const inquirer = require("inquirer");
const { getReturnAmt, totalAmtPaid, randomNumber } = require("./helper");
const {airDropSol,transfer,getWalletBalance} = require("./solana");

const userWallet = Keypair.generate();
  console.log(userWallet);

  const publicKey1 = new PublicKey(
    userWallet._keypair.publicKey
  ).toString();
  const secretKey1 = userWallet._keypair.secretKey;

  const treasuryWallet = Keypair.generate();

  const publicKey2 = new PublicKey(
    treasuryWallet._keypair.publicKey
  ).toString();
  const secretKey2 = treasuryWallet._keypair.secretKey;

  // const treasuryPublicKey = "D3PK2cTD22jCBzB3Xa5fWWenQFR2GBFricm5ik9WbzEY";

const userWalletInitilization = async () => {
  await airDropSol(secretKey1)
  setTimeout(async ()=> {
    await airDropSol(secretKey2)
  },6000)
  // 
}


const gameExecution = () => {
  
  var amt = 0;
  var ratio = 0;
  var returnAmt = 0;

  console.log("The max start amount to bet is 0.5 Sol");

  var questions = [
    {
      type: "input",
      name: "amt",
      message: "Amount you want to bet?",
    },
    {
      type: "input",
      name: "ratio",
      message: "Ratio of bet?",
    },
  ];

  var questions2 = [
    {
      type: "input",
      name: "guess",
      message: "Bet on a number b/w 1 to 5?",
    },
  ];

  inquirer
    .prompt(questions)
    .then((answers) => {
      amt = answers["amt"];
      ratio = answers["ratio"];
      ratio = ratio.split(":");
      console.log("You need to pay", amt, "to bet on a number");
      returnAmt = getReturnAmt(amt, ratio[1]);
    })
    .then(() => {
      console.log("If you win, you will get", returnAmt, "Sol");
      inquirer.prompt(questions2).then((answers) => {
        var rand = randomNumber(1, 5);
        console.log("Spinning the wheel.....");
        setTimeout(async () => {
          console.log("Your bet is", answers["guess"]);
          console.log("The number is", rand);
          if (rand.toString() === answers["guess"]) {
            console.log("You won!");
            await transfer(treasuryWallet,userWallet,returnAmt)
            await getWalletBalance(publicKey1)
          } else {
            console.log("You lost :(");
            await transfer(userWallet,treasuryWallet,amt)
            await getWalletBalance(publicKey1)
          }
        }, 3000);
      });
    });
};

userWalletInitilization();
gameExecution();
