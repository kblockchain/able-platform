pragma solidity ^0.4.23;

import "./Ownable.sol";

/**
 * @title Authorizable
 * @dev Allows to authorize access to certain function calls
 */
contract Authorizable is Ownable {

    address[] authorizers;
    mapping(address => uint) authorizerIndex;

    /**
    * @dev Throws if called by any account tat is not authorized. 
    */
    modifier onlyAuthorized {
        require(authorizerIndex[msg.sender] > 0);
        _;
    }

    /**
    * @dev Contructor that authorizes the msg.sender. 
    */
    constructor() {
        authorizers.length = 2;
        authorizers[1] = msg.sender;
        authorizerIndex[msg.sender] = 1;
    }

    /**
    * @dev Function to get a specific authorizer
    * @param authorizerIndex index of the authorizer to be retrieved.
    * @return The address of the authorizer.
    */
    function getAuthorizer(uint authorizerIndex) external view returns(address) {
        return address(authorizers[authorizerIndex + 1]);
    }

    /**
    * @dev Function to check if an address is authorized
    * @param _addr the address to check if it is authorized.
    * @return boolean flag if address is authorized.
    */
    function isAuthorized(address _addr) external view returns(bool) {
        return authorizerIndex[_addr] > 0;
    }

    /**
    * @dev Function to add a new authorizer
    * @param _addr the address to add as a new authorizer.
    */
    function addAuthorized(address _addr) external onlyOwner {
        authorizerIndex[_addr] = authorizers.length;
        authorizers.length++;
        authorizers[authorizers.length - 1] = _addr;
    }
  
    /**
    * @dev Function to delete a authorizer
    * @param _addr the address to delete as a new authorizer.
    */
    function deleteAuthorized(address _addr) external onlyOwner {
        authorizerIndex[_addr] = 0;
    }

}