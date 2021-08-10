//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract USC is
    Initializable,
    ContextUpgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    //If you want to use these specifiy them this way
    using SafeMathUpgradeable for uint256;
    using AddressUpgradeable for address;

    //Values for variables initialized are effectively considered immutable with respect to upgrades
    //Therefore compiler will throw " Error: Contract `USC` is not upgrade safe" if we set
    //string private _name = "Leon";

    string private constant _name = "Leon";
    string private constant _surname = "Africa";
    uint8 private constant _decimals = 7;

    //If you want a variable to be upgrablde declare it like this 1st
    string public _upgrade_var;

    //Upgradable Smart Contracts cannot have constructors this function acts as a constructor
    function initialize() public initializer {
        //Ensures that the owner is the deployer of the smart contract otherwise the deployer is address(0)
        __Ownable_init_unchained();

        //Ensures that the smart contract is initially in an unpaused state
        __Pausable_init_unchained();

        //The value for this variable can be upgraded
        _upgrade_var = "ValueOne";
    }

    function name() public pure returns (string memory) {
        return _name;
    }

    function surname() public pure returns (string memory) {
        return _surname;
    }

    function decimals() public pure returns (uint8) {
        return _decimals;
    }

    function upgrade_var() public view returns (string memory) {
        return _upgrade_var;
    }
}
