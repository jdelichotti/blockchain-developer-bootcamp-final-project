## SWC-105 (Unprotected Ether Withdrawal)
The function "release payment" can only be executed by the owner of the contract. This is protected with OpenZeppelin Ownable's onlyOwner modifier.


## SWC-129 (Typographical Error)
The weakness is avoided by using a vetted library for arithmetic calculations such as **SafeMath developed by OpenZeppelin**.

## Modifiers used only for validation
All modifiers in contract(s) only validate data with require statements.
