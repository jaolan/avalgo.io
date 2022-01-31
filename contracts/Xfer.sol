// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
// use openzeppelin Ownable template
// where methods w/ onlyOwner can only be called by owner
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Xfer is Ownable {
    constructor() payable {}

    receive() external payable {}
    
    // AVGO token addr
    address public constant AVGO_ADDR = 0xF626801360eEEe6CDa320f7E6109343ed3Aed492;

    // when you can withdraw is saved in lockTime
    mapping(address => uint) public lockTime;

    // send avax to contract
    function sendEther(address payable recipient) external payable onlyOwner {
        (bool success,) = recipient.call{ value: msg.value }("");
        require(success, "Send failed!");
    }

    // get smart contract avax balance
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    // withdraw x amt of avax - limit withdraw amt per call
    // 
    // Function can be called once every 1 min per user and is locked after every call
    function withdrawMoney(uint256 amount) public {
         // check that the now time is > the time saved in the lock time mapping
        require(block.timestamp > lockTime[msg.sender], "lock time has not expired");

        // Check if user owns an AVGO NFT. This is necessary to withdraw!
        ERC721 t = ERC721(AVGO_ADDR);
        require(t.balanceOf(msg.sender) > 0, "You must own an AVGO NFT to participate");

        // no more lock time, try withdrawing
        require(amount > 0, "Withdraw amount must be greater than 0");
        require(amount <= 0.5 ether, "Cannot withdraw more than 0.5 AVAX");
        address payable to = payable(msg.sender);
        to.transfer(amount);

         // user withdrew, set a lock for 1 min
        lockTime[msg.sender] = block.timestamp + 1 minutes;
    }

}
