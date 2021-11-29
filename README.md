# Final Project - SMARTBET

## Deployed version url:

https://ecstatic-jennings-d355b5.netlify.app/

## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- `git checkout master`

### Contracts

- Run `npm install` in project root to install Truffle build and smart contract dependencies
- Run local testnet in port `7545` with an Ethereum client, e.g. Ganache
- `truffle migrate --network development`
- `truffle console --network development`
- Run tests in Truffle console: `test`

### Frontend
- `cd dapp-smartbet`
- `npm run dev`
- Open `http://localhost:3000`

## Screencast link

https://loom.com/share/37254a33142a4b25af5aca3cc97d066a

## Public Ethereum wallet for certification:

`0x765644db490907f073B32C46Cc2470B40b849701`

## Project description

The dapp allows you to create new bets on soccer matches where the winners win the accumulated jackpot.
The application has two types of profiles:

Sponsors: People who, once the betting event has been created, provide liquidity to attract the interest of bettors at the beginning of the event. In return, the sponsors receive a commission for each bet (transaction) made by the bettors. The more bettors, the higher your profit.

Bettors: They place their bets by entering the result they think will happen in the match (Local Win, Visitor Win or Tie) and the amount of ETH they wish to bet. At the end of the bet, all winners share the prize proportionally between their bets and the sum of all bettors who won.

Finally, smartcontract keeps a commission on each transaction to cover its operating expenses (gas).


## Simple workflow

1. The owner of the contract generates a new bet by entering the two teams that are facing each other (the bet starts in a "bet Funding" status).
2. The sponsors add liquidity to the bet. Once the minimum number of Sponsors is reached (set to 2) the bet goes to "Open" status so that bettors can place their bets.
3. The bettors place their bets for the different results of the match (Local Win, Visitor Win or Tie).
4. When the closing time of the bet is reached, the application does not allow new bets to be placed. (Currently the bet is closed by the owner of the contract). The bet goes to "Closed" status.
5. The dapp reads information from an oracle to get the result of the match (currently the owner enters the result). Once the event is triggered, the application calculates the money taken by each participant (sponsors, gambler & dapp). The bet moves to "Releaase Payments" status.
6. The contract owner releases the payments and the bet is finished.


## Directory structure

- `dapp-smartbet`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.


## TODO features

- The closing bet event it could be implemented using the ethereum-alarm-clock project. (https://www.ethereum-alarm-clock.com/)
- Defining the bet results:Obtaining the outcome of the match can be achieved by using an Oracle or through a DAO scheme where consensus is reached between the various parties involved.
