## Access Control Design Patterns
The application inherits the OpenZeppelin "Ownable" contract so that the sensitive functions of the application can only be accessed by the Owner of the contract.

## Inheritance and Interfaces
The application inherits 3 contracts from OpenZeppelin: Ownable.sol, SafeMath.sol and ReentrancyGuard.sol.
In addition it's using the SafeMath library to perform the bet's calculations.

## Optimizing Gas
### Expensive operations in a loop
In every function that uses a Loop logic I'm avoiding to update an unncesary stage variables.

### Reduce the number of loops
The combination of structs and mapping prevents me from having to go through the "n" bets to identify the Array I have to process.
