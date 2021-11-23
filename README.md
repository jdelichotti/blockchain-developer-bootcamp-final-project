# Final Project - Soccer Bet Application

## Deployed version url:

https://final-project-jsur.vercel.app

## How to run this project locally:

### Prerequisites



### Contracts


### Frontend


### How to populate locally deployed contract with listings


## Screencast link



## Public Ethereum wallet for certification:



## Project description

This application allows to create a bet event over a soccer game. There two kindo of users:
Sponsor: These people, once the bet event is published, make some deposit on the specific event to create interest from gamblers. In exchange, the sponsors will receive a fee for each bet that the gamblers add into the event. These fees are share between all the sponsor depending on the amount of eth they deposit at the begginng.

Gambler: Each Gambler is able to make a bet on three types of outputs: Local Wins, Visitor Wins or Drawn. Once the Bet it over, the app divides the amount of eth generate by the Sponsor and the Gambler who loss


Notes:
- Currently the Owner of the App is able to create an event and release the payment.
- The result of the bet must be perfomed by an oracle. On this versionm, the owner of the app is responsabile of provide the result
- It is requiered at least two sponsors to allows gamblers make their bets

## Simple workflow

1. Enter service web site.
2. The owner of the contratct must login with Metamask.
3. Navigate to "Create Bet" and create a bet filling the Local and Vistitos Team.
4. Go to "Bet Administration" and check that the Bet is available and the initial state is "Bet Funding"
5. Change the Metamask Account to simulate a Sponsor.
6. Go to "Bets" section and Click on "Add liquidity" to add some ETH into the bet.
7. Repeat Steps 5 and 6 to simulate another Sponsor. Once the bet has two Sponsor the Bet state changes to "Open"
8. On the same section "Bets" change the Metamask Account to simulate Gamblers. Make differents types of bets (Local Wins/Vistor Wins / Drawn)
9. Once al the gamblers make their bet, the Owner must go to the "Bet Adminitration" section.
10. "Close" the Bet to stop receiving bets from gamblers.
11. "Define the result" of the bet (in future this must be done using an oracle).
12. "Release payments" to the sponsors and winners.
13. There is an option to review the "Details" of the bet.


## Directory structure

- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

## Environment variables (not needed for running project locally)

```
ROPSTEN_INFURA_PROJECT_ID=
ROPSTEN_MNEMONIC=
```

## TODO features

- Tenant payments tracking
- Tenant removal
- Fund withdrawal
