// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
// use openzeppelin Ownable template
// where methods w/ onlyOwner can only be called by owner
import "@openzeppelin/contracts/access/Ownable.sol";

contract Xfer {
    constructor() payable {}

    receive() external payable {}

    // send avax to contract
    function sendEther(address payable recipient) external payable{
        (bool success,) = recipient.call{ value: msg.value }("");
        require(success, "Send failed!");
    }

    // get smart contract avax balance
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    // @@@ Proof of concept for platform. Do not deploy to mainnet @@@
    // withdraw x amt of avax - limit withdraw amt per call
    function withdrawMoney(uint256 amount) public {
        require(amount > 0, "Withdraw amount must be greater than 0");
        require(amount <= 0.5 ether, "Cannot withdraw more than 0.5 AVAX");
        address payable to = payable(msg.sender);
        to.transfer(amount);
    }

}
