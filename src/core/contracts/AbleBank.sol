contract Token {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply; 
    
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;
    
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


contract AbleBank is Ownable, Authorizable
{
    using SafeMath for uint;
    
    // ABLE user
    struct ableUser {
        uint ableUserListPointer; // needed to delete a "ableUser"
        bytes32[] ableAccountKeys; // AbleUser has many "ableAccount"s
        mapping(bytes32 => uint) ableAccountKeyPointers;
        //AbleUser properties
        bytes32 userName;
    }
    
    mapping(address => ableUser) private ableUsers;
    address[] private ableUserList;

    // ABLE free account
    struct ableAccount
    {
        uint ableAccountListPointer; // needed to delete a "ableAccount"
        address ableUserKey; // ableAccount has exactly one "ableUser"    

        // ableAccount properties
        string accountInfo;
        bytes32 password;
        string accountType;
        mapping(address => uint) token;
        address[] tokenList;
    }
    
    mapping(bytes32 => ableAccount) private ableAccounts;
    bytes32[] private ableAccountList;
    uint private totalBankAccounts;
    
    mapping (address => mapping (bytes32 => bool)) public matchingList; //mapping of user accounts to mapping of order hashes to booleans (true = submitted by user, equivalent to offchain signature)
    mapping (address => mapping (bytes32 => uint)) public matchingFills; //mapping of user accounts to mapping of order hashes to uints (amount of order that has been filled)

    

    /* -------- Constructor -------- */
    /**
    * @dev Function to contruct AbleBank
    */
    function AbleBank() public
    {
        totalBankAccounts = 0; 
    }


    /* -------- Events -------- */

    // General banking
    event AbleUserRegistered_Successful(address userAddress, bytes32 userName);
    event AbleAccountOpened_Successful(address userAddress, bytes32 accountNumber, string accountType);
    event AbleDeposit(address token, address userAddress, uint amount, uint balance);
    event AbleWithdraw(address token, address userAddress, uint amount, uint balance);
    event AbleTransfer(address token, bytes32 from, bytes32 to, uint amount, uint balance);
    

    /* -------- Modifiers -------- */



    /* -------- Management functions -------- */

    /**
    * @dev Function to get the number of AbleUser
    * @return uint ableUserCount.
    */
    function getAbleUserCount() onlyOwner onlyAuthorized public view returns(uint ableUserCount) 
    {
        return ableUserList.length;
    }
    
    /**
    * @dev Function to get the number of AbleAccount
    * @return uint ableAccountCount.
    */
    function getAbleAccountCount() onlyOwner onlyAuthorized public view returns(uint ableAccountCount)
    {
        return ableAccountList.length;
    }
    
    /**
    * @dev Function to check if _userAddress exist
    * @param _userAddress the address to check if it exist.
    * @return boolean flag if _userAddress exist.
    */
    function isAbleUser(address _userAddress) onlyOwner onlyAuthorized public view returns(bool isIndeed) 
    {
        if(ableUserList.length==0) return false;
        return ableUserList[ableUsers[_userAddress].ableUserListPointer]==_userAddress;
    }
    
    /**
    * @dev Function to check if _accountNumber exist
    * @param _accountNumber the bytes32 to check if it exist.
    * @return boolean flag if _accountNumber exist.
    */
    function isAbleAccount(bytes32 _accountNumber) onlyOwner onlyAuthorized public view returns(bool isIndeed) 
    {
        if(ableAccountList.length==0) return false;
        return ableAccountList[ableAccounts[_accountNumber].ableAccountListPointer]==_accountNumber;
    }
	
	/**
    * @dev Function to get _userAddress using index 
    * @param row the row to get _userAddress.
    * @return address the _userAddress.
    */
    function getAbleUserAtIndex(uint row) onlyOwner onlyAuthorized public view returns(address _userAddress) 
    {
        if(ableUserList.length==0) throw;
        return ableUserList[row];
    }
	
	/**
    * @dev Function to get the number of ableAccount which depend on _userAddress
    * @param _userAddress the address to find the number of ableAccount which depend on _userAddress.
    * @return uint the number of ableAccount which depend on _userAddress.
    */
    function getAbleUserAbleAccountCount(address _userAddress) onlyOwner onlyAuthorized public view returns(uint ableAccountCount) 
    {
        if(!isAbleUser(_userAddress)) throw;
        return ableUsers[_userAddress].ableAccountKeys.length;
    }
    
    /**
    * @dev Function to get _accountNumber using index of ableUsers included in _userAddress
    * @param _userAddress the address to get _accountNumber.
    * @param row the row to get _accountNumber.
    * @return bytes32 the _accountNumber.
    */
    function getAbleUserAbleAccountAtIndex(address _userAddress, uint row) onlyOwner onlyAuthorized public view returns(bytes32 _accountNumber) 
    {
        if(!isAbleUser(_userAddress)) throw;
        return ableUsers[_userAddress].ableAccountKeys[row];
    }
    
    /**
    * @dev Function to get ableAccount properties using _accountNumber
    * @param _accountNumber the bytes32 to get ableAccount properties.
    * @return address _userAddress_, bytes32 _accountNumber_, string _accountInfo_, string _accountType_, uint _numToken_.
    */
    function getAbleAccount(bytes32 _accountNumber) onlyOwner onlyAuthorized public view returns(address _userAddress_, bytes32 _accountNumber_, string _accountInfo_, string _accountType_, uint _numToken_) 
    {
        if(!isAbleAccount(_accountNumber)) throw;
        
        address owner = ableAccounts[_accountNumber].ableUserKey;
        string accountInfo = ableAccounts[_accountNumber].accountInfo;
        string accountType = ableAccounts[_accountNumber].accountType;
        uint numToken = ableAccounts[_accountNumber].tokenList.length;
        
        return (owner, _accountNumber, accountInfo, accountType, numToken);
    }
    
    /**
    * @dev Function to get ableAccount properties using _accountNumber
    * @param _accountNumber the bytes32 to get ableAccount properties.
    * @param row the row to get _accountNumber.
    * @return bytes32 _accountNumber_, address _tokenName_, uint _balance_.
    */
    function getAbleAccountTokenBalance(bytes32 _accountNumber, uint row) onlyOwner onlyAuthorized public view returns(bytes32 _accountNumber_, address _tokenName_, uint _balance_) 
    {
        if(!isAbleAccount(_accountNumber)) throw;
        
        address _token = ableAccounts[_accountNumber].tokenList[row];
        uint balance = ableAccounts[_accountNumber].token[_token];
        
        return (_accountNumber, _token, balance);
    }
    
	
    /* -------- General bank account functions -------- */

    /**
    * @dev Function to register ableUser
    * @param _userName the bytes32 to insert userName.
    * @return boolean flag if register success.
    */
    function registerAbleUser(bytes32 _userName) public returns (bool isIndeed) 
    {
        if(isAbleUser(msg.sender)) throw; // duplicate user prohibited
        ableUsers[msg.sender].ableUserListPointer = ableUserList.push(msg.sender)-1;
        ableUsers[msg.sender].userName = _userName;
        
        AbleUserRegistered_Successful(msg.sender, _userName);
        return true;
    }
    
    /**
    * @dev Function to open free ableAccount
    * @param _accountNumber the bytes32 to add new ableAccount.
    * @param _password the bytes32 to set password.
    * @return boolean flag if open success.
    */
    function openAbleAccount(bytes32 _accountNumber, bytes32 _password) public returns (bool isIndeed) 
    {
        if(!isAbleUser(msg.sender)) throw; // require ableUser
        if(isAbleAccount(_accountNumber)) throw; // duplicate account prohibited
        
        ableAccounts[_accountNumber].ableAccountListPointer = ableAccountList.push(_accountNumber)-1;
        ableAccounts[_accountNumber].ableUserKey = msg.sender;
        ableAccounts[_accountNumber].password = _password;
        ableAccounts[_accountNumber].accountInfo = "Default free ABLE account";
        ableAccounts[_accountNumber].accountType = "Free";
        //Ethereum is default 0
        ableAccounts[_accountNumber].token[address(0)] = 0;
        ableAccounts[_accountNumber].tokenList.push(address(0));

        // We also maintain a list of "ableAccount" that refer to the "ableUser", so ... 
        ableUsers[msg.sender].ableAccountKeyPointers[_accountNumber] = ableUsers[msg.sender].ableAccountKeys.push(_accountNumber)-1;
        AbleAccountOpened_Successful(msg.sender, _accountNumber, "Free");
        return true;
    }
    
    /**
    * @dev Function to get balanceOf _accountNumber
    * @param _token the bytes32 to get balance.
    * @param _accountNumber the bytes32 to get balance.
    * @return address _token_, uint _balance_.
    */
    function balanceOf(address _token, bytes32 _accountNumber) public view returns(address _token_, uint _balance_) 
    {
        if(!isAbleUser(msg.sender)) throw;
        if(!isAbleAccount(_accountNumber)) throw;
        if(ableAccounts[_accountNumber].ableUserKey!=msg.sender) throw;
        
        uint balance = ableAccounts[_accountNumber].token[_token];
        
        return (_token, balance);
    }


    /* -------- Deposit functions -------- */
    
    /**
    * @dev Function to deposit ethereum to _accountNumber
    * @param _accountNumber the bytes32 to deposit.
    * @return boolean flag if open success.
    */
    function deposit(bytes32 _accountNumber) payable public returns (bool isIndeed) {
        if(msg.value==0) throw;
        if(!isAbleUser(msg.sender)) throw;
        if(!isAbleAccount(_accountNumber)) throw;
        if(ableAccounts[_accountNumber].ableUserKey!=msg.sender) throw;
        
        ableAccounts[_accountNumber].token[address(0)] = ableAccounts[_accountNumber].token[address(0)].safeAdd(msg.value);
        AbleDeposit(address(0), msg.sender, msg.value, ableAccounts[_accountNumber].token[address(0)]);
        
        return true;
    }
    
    /**
    * @dev Function to deposit token to _accountNumber
    * @param _accountNumber the bytes32 to deposit.
    * @param _token the address to set token address.
    * @param _amount the uint to set amount.
    * @return boolean flag if open success.
    */
    function depositToken(bytes32 _accountNumber, address _token, uint _amount) public returns (bool isIndeed) {
        //remember to call Token(address).approve(this, amount) or this contract will not be able to do the transfer on your behalf.
        if(_token==address(0)) throw;
        if(_amount==0) throw;
        if(!Token(_token).transferFrom(msg.sender, this, _amount)) throw;
        if(!isAbleUser(msg.sender)) throw;
        if(!isAbleAccount(_accountNumber)) throw;
        if(ableAccounts[_accountNumber].ableUserKey!=msg.sender) throw;
        
        if(ableAccounts[_accountNumber].token[_token]==0) ableAccounts[_accountNumber].tokenList.push(_token);
        ableAccounts[_accountNumber].token[_token] = ableAccounts[_accountNumber].token[_token].safeAdd(_amount);
        AbleDeposit(_token, msg.sender, msg.value, ableAccounts[_accountNumber].token[_token]);
        
        return true;
    }
    

    /* -------- Withdrawal / transfer functions -------- */

    /**
    * @dev Function to withdraw ethereum from _accountNumber
    * @param _accountNumber the bytes32 to deposit.
    * @param _amount the uint to set amount.
    * @return boolean flag if open success.
    */
    function withdraw(bytes32 _accountNumber, uint _amount) public returns (bool isIndeed) {
        if(!isAbleUser(msg.sender)) throw;
        if(!isAbleAccount(_accountNumber)) throw;
        if(ableAccounts[_accountNumber].ableUserKey!=msg.sender) throw;
        
        if(ableAccounts[_accountNumber].token[address(0)]<_amount) throw;
        ableAccounts[_accountNumber].token[address(0)] = ableAccounts[_accountNumber].token[address(0)].safeSub(_amount);
        if (!msg.sender.call.value(_amount)()) throw;
        AbleWithdraw(address(0), msg.sender, _amount, ableAccounts[_accountNumber].token[address(0)]);
        
        return true;
    }
    
    /**
    * @dev Function to withdraw token from _accountNumber
    * @param _accountNumber the bytes32 to withdraw.
    * @param _token the address to set token address.
    * @param _amount the uint to set amount.
    * @return boolean flag if open success.
    */
    function withdrawToken(bytes32 _accountNumber, address _token, uint _amount) public returns (bool isIndeed) {
        if(!isAbleUser(msg.sender)) throw;
        if(!isAbleAccount(_accountNumber)) throw;
        if(ableAccounts[_accountNumber].ableUserKey!=msg.sender) throw;
        
        if(ableAccounts[_accountNumber].token[_token]<_amount) throw;
        ableAccounts[_accountNumber].token[_token] = ableAccounts[_accountNumber].token[_token].safeSub(_amount);
        if(!Token(_token).transfer(msg.sender, _amount)) throw;
        AbleWithdraw(_token, msg.sender, _amount, ableAccounts[_accountNumber].token[_token]);
        
        return true;
    }

    /**
    * @dev Function to transfer ethereum/token from _from to _to
    * @param _from the bytes32 from.
    * @param _to the bytes32 to.
    * @param _token the address to set token address.
    * @param _amount the uint to set amount.
    * @return boolean flag if open success.
    */
    function transferFrom(bytes32 _from, bytes32 _to, address _token, uint _amount) public returns (bool isIndeed) {
        if(!isAbleUser(msg.sender)) throw;
        if(!isAbleAccount(_from)&&!isAbleAccount(_to)) throw;
        if(ableAccounts[_from].ableUserKey!=msg.sender) throw;
        if(ableAccounts[_from].token[_token]<_amount) throw;
        
        if(ableAccounts[_to].token[_token]==0) ableAccounts[_to].tokenList.push(_token);
        if(_token==address(0)) {
            ableAccounts[_from].token[address(0)] = ableAccounts[_from].token[address(0)].safeSub(_amount);
            ableAccounts[_to].token[address(0)] = ableAccounts[_to].token[address(0)].safeAdd(_amount);
        } else {
            ableAccounts[_from].token[_token] = ableAccounts[_from].token[_token].safeSub(_amount);
            ableAccounts[_to].token[_token] = ableAccounts[_to].token[_token].safeAdd(_amount);
        }
        AbleTransfer(_token, _from, _to, _amount, ableAccounts[_from].token[_token]);
        
        return true;
    }


    /* -------- Matching functions -------- */

    


    /* -------- Default function -------- */

    function() 
    {    
        
    }
} 