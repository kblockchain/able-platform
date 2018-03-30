/**
 * @title Token
 * @dev General ERC20 token model
 */
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


/**
 * @title AbleBank
 * @dev ABLE bank contract. Decentralized Cryptocurrency bank.
 */
contract AbleBank is Ownable, Authorizable {
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
  struct ableAccount {
    uint ableAccountListPointer; // needed to delete a "ableAccount"
    address ableUserKey; // ableAccount has exactly one "ableUser"    

    // ableAccount properties
    string accountInfo;
    bytes32 password;
    string accountType;
    mapping(address => uint) token;
    address[] tokenList;

    //TODO get matching and dex list.
  }
    
  mapping(bytes32 => ableAccount) private ableAccounts;
  bytes32[] private ableAccountList;
  uint private totalBankAccounts;
  
  // Matching
  mapping (bytes32 => mapping (bytes32 => bool)) public matchOders; //mapping of user accounts to mapping of order hashes to booleans (true = submitted by user, equivalent to offchain signature)
  mapping (bytes32 => mapping (bytes32 => uint)) public matchOrderFills; //mapping of user accounts to mapping of order hashes to uints (amount of order that has been filled)

  // DEX
  struct dexOffer {
    uint amountTokens;
    bytes32 accountNumber;
  }

  struct dexOrderBook {
    uint higherPrice;
    uint lowerPrice;
    
    // All Keys are Initialised by Default in Solidity
    mapping (uint => dexOffer) offers;
    
    // Store in `offers_key` where we are in the Linked List
    uint offers_key;

    // Store amount of offers that we have
    uint offers_length;
  }

  struct dexToken {
    // Note: Solidity Mappings have initialised state by default
    // (i.e. offers_length is initially 0)
    mapping (uint => dexOrderBook) buyBook;

    uint curBuyPrice;
    uint lowestBuyPrice;
    uint buy_length;

    mapping (uint => dexOrderBook) sellBook;

    uint curSellPrice;
    uint highestSellPrice;
    uint sell_length;
  }

  // Dex token list
  mapping (address => Token) dexTokens;


  /* -------- Constructor -------- */

  /**
   * @dev Function to contruct AbleBank
   */
  function AbleBank() public {
      totalBankAccounts = 0;
  }


  /* -------- Events -------- */

  // General banking
  event AbleUserRegistered_Successful(address userAddress, bytes32 userName);
  event AbleAccountOpened_Successful(address userAddress, bytes32 accountNumber, string accountType);
  event AbleDeposit(address token, address userAddress, uint amount, uint balance);
  event AbleWithdraw(address token, address userAddress, uint amount, uint balance);
  event AbleTransfer(address token, bytes32 from, bytes32 to, uint amount, uint balance);
  event AbleMatchOrder(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, bytes32 accountNumber);
  event AbleMatchCancel(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, bytes32 accountNumber, uint8 v, bytes32 r, bytes32 s);
  event AbleMatchTrade(address tokenGet, uint amountGet, address tokenGive, uint amountGive, address get, address give);
  event AbleDexOrder(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, bytes32 accountNumber);
  event AbleDexCancel(address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce, bytes32 accountNumber, uint8 v, bytes32 r, bytes32 s);
  event AbleDexTrade(address tokenGet, uint amountGet, address tokenGive, uint amountGive, address get, address give);
  

  /* -------- Modifiers -------- */


  /* -------- Management functions -------- */

  /**
   * @dev Function to get the number of AbleUser
   * @return uint ableUserCount.
   */
  function getAbleUserCount() onlyOwner onlyAuthorized public view returns(uint ableUserCount) {
    return ableUserList.length;
  }
  
  /**
   * @dev Function to get the number of AbleAccount
   * @return uint ableAccountCount.
   */
  function getAbleAccountCount() onlyOwner onlyAuthorized public view returns(uint ableAccountCount) {
    return ableAccountList.length;
  }
  
  /**
   * @dev Function to check if _userAddress exist
   * @param _userAddress the address to check if it exist.
   * @return boolean flag if _userAddress exist.
   */
  function isAbleUser(address _userAddress) onlyOwner onlyAuthorized public view returns(bool isIndeed) {
    if(ableUserList.length==0) return false;
    return ableUserList[ableUsers[_userAddress].ableUserListPointer]==_userAddress;
  }
  
  /**
   * @dev Function to check if _accountNumber exist
   * @param _accountNumber the bytes32 to check if it exist.
   * @return boolean flag if _accountNumber exist.
   */
  function isAbleAccount(bytes32 _accountNumber) onlyOwner onlyAuthorized public view returns(bool isIndeed) {
    if(ableAccountList.length==0) return false;
    return ableAccountList[ableAccounts[_accountNumber].ableAccountListPointer]==_accountNumber;
  }

  /**
   * @dev Function to get _userAddress using index 
   * @param row the row to get _userAddress.
   * @return address the _userAddress.
   */
  function getAbleUserAtIndex(uint row) onlyOwner onlyAuthorized public view returns(address _userAddress) {
    if(ableUserList.length==0) throw;
    return ableUserList[row];
  }

  /**
   * @dev Function to get the number of ableAccount which depend on _userAddress
   * @param _userAddress the address to find the number of ableAccount which depend on _userAddress.
   * @return uint the number of ableAccount which depend on _userAddress.
   */
  function getAbleUserAbleAccountCount(address _userAddress) onlyOwner onlyAuthorized public view returns(uint ableAccountCount) {
    if(!isAbleUser(_userAddress)) throw;
    return ableUsers[_userAddress].ableAccountKeys.length;
  }
  
  /**
   * @dev Function to get _accountNumber using index of ableUsers included in _userAddress
   * @param _userAddress the address to get _accountNumber.
   * @param row the row to get _accountNumber.
   * @return bytes32 the _accountNumber.
   */
  function getAbleUserAbleAccountAtIndex(address _userAddress, uint row) onlyOwner onlyAuthorized public view returns(bytes32 _accountNumber) {
      if(!isAbleUser(_userAddress)) throw;
      return ableUsers[_userAddress].ableAccountKeys[row];
  }
  
  /**
   * @dev Function to get ableAccount properties using _accountNumber
   * @param _accountNumber the bytes32 to get ableAccount properties.
   * @return address _userAddress_, bytes32 _accountNumber_, string _accountInfo_, string _accountType_, uint _numToken_.
   */
  function getAbleAccount(bytes32 _accountNumber) onlyOwner onlyAuthorized public view returns(address _userAddress_, bytes32 _accountNumber_, string _accountInfo_, string _accountType_, uint _numToken_) {
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
  function getAbleAccountTokenBalance(bytes32 _accountNumber, uint row) onlyOwner onlyAuthorized public view returns(bytes32 _accountNumber_, address _tokenName_, uint _balance_) {
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
  function registerAbleUser(bytes32 _userName) public returns (bool isIndeed) {
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
  function openAbleAccount(bytes32 _accountNumber, bytes32 _password) public returns (bool isIndeed) {
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
  function balanceOf(address _token, bytes32 _accountNumber) public view returns(address _token_, uint _balance_) {
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

  

  /* -------- DEX functions -------- */
  
  ///////////////////////////////////
  // ORDER BOOK - BID ORDERS       //
  ///////////////////////////////////

  // Returns Buy Prices Array and Buy Volume Array for each of the Prices
  function getBuyOrderBook(address _token) public constant returns (uint[], uint[]) {
    // Initialise New Memory Arrays with the Exact Amount of Buy Prices in the Buy Order Book (not a Dynamic Array) 
    uint[] memory arrPricesBuy = new uint[](dexTokens[_token].buy_length);
    uint[] memory arrVolumesBuy = new uint[](dexTokens[_token].buy_length);

    // Example:
    // - Assume 3x Buy Offers (1x 100 Wei, 1x 200 Wei, 1x 300 Wei)
    // - Start Counter at 0 with Lowest Buy Offer (i.e. 100 Wei) 
    //   - `whilePrice` becomes 100 Wei
    //   - Add Price `whilePrice` of 100 Wei to Buy Prices Array for Counter 0
    //   - Obtain Volume at 100 Wei by Summing all Offers for 100 Wei in Buy Order Book
    //   - Add Volume at 100 Wei to Buy Prices Array for Counter 0
    //   - Either
    //   - Assign Next Buy Offer (i.e. 200 Wei) to `whilePrice`.
    //     Else Break if we have reached Last Element (Higher Price of `whilePrice` points to `whilePrice`)
    //   - Increment Counter to 1 (Next Index in Prices Array and Volume Array)
    //   - Repeat
    //   - Break when Higher Price of 300 Wei is also 300 Wei
    // - Return Buy Prices Array and Buy Volumes Array
    // 
    // So if Buy Offers are: 50 Tokens @ 100 Wei, 70 Tokens @ 200 Wei, and 30 Tokens @ 300 Wei, then have:
    //  - 3x Entries in Buy Prices Array (i.e. [ 100, 200, 300 ])
    //  - 3x Entries in Buy Volumes Array (i.e. [ 50, 70, 30 ] )

    // Loop through Prices. Adding each to the Prices Array and Volume Array.
    // Starting from Lowest Buy Price until reach Current Buy Price (Highest Bid Price)
    uint whilePrice = dexTokens[_token].lowestBuyPrice;
    uint counter = 0;
    // Check Exists at Least One Order Book Entry
    if (dexTokens[_token].curBuyPrice > 0) {
      while (whilePrice <= dexTokens[_token].curBuyPrice) {
        arrPricesBuy[counter] = whilePrice;
        uint buyVolumeAtPrice = 0;
        uint buyOffersKey = 0;

        // Obtain the Volume from Summing all Offers Mapped to a Single Price inside the Buy Order Book
        buyOffersKey = dexTokens[_token].buyBook[whilePrice].offers_key;
        while (buyOffersKey <= dexTokens[_token].buyBook[whilePrice].offers_length) {
          buyVolumeAtPrice += dexTokens[_token].buyBook[whilePrice].offers[buyOffersKey].amountTokens;
          buyOffersKey++;
        }
        arrVolumesBuy[counter] = buyVolumeAtPrice;
        // Next whilePrice
        if (whilePrice == dexTokens[_token].buyBook[whilePrice].higherPrice) {
          break;
        }
        else {
          whilePrice = dexTokens[_token].buyBook[whilePrice].higherPrice;
        }
        counter++;
      }
    }
    return (arrPricesBuy, arrVolumesBuy);
  }

  ///////////////////////////////////
  // ORDER BOOK - ASK ORDERS       //
  ///////////////////////////////////

  function getSellOrderBook(address _token) public constant returns (uint[], uint[]) {
    uint[] memory arrPricesSell = new uint[](dexTokens[_token].sell_length);
    uint[] memory arrVolumesSell = new uint[](dexTokens[_token].sell_length);
    uint sellWhilePrice = dexTokens[_token].curSellPrice;
    uint sellCounter = 0;
    if (dexTokens[_token].curSellPrice > 0) {
      while (sellWhilePrice <= dexTokens[_token].highestSellPrice) {
        arrPricesSell[sellCounter] = sellWhilePrice;
        uint sellVolumeAtPrice = 0;
        uint sellOffersKey = 0;
        sellOffersKey = dexTokens[_token].sellBook[sellWhilePrice].offers_key;
        while (sellOffersKey <= dexTokens[_token].sellBook[sellWhilePrice].offers_length) {
          sellVolumeAtPrice = sellVolumeAtPrice.safeAdd(dexTokens[_token].sellBook[sellWhilePrice].offers[sellOffersKey].amountdexTokens);
          sellOffersKey++;
        }
        arrVolumesSell[sellCounter] = sellVolumeAtPrice;
        if (dexTokens[_token].sellBook[sellWhilePrice].higherPrice == 0) {
          break;
        }
        else {
          sellWhilePrice = dexTokens[_token].sellBook[sellWhilePrice].higherPrice;
        }
        sellCounter++;
      }
    }
    return (arrPricesSell, arrVolumesSell);
  }

  /////////////////////////////////
  // NEW ORDER - BID ORDER     //
  /////////////////////////////////

  // Market Buy Order Function
  // User wants to Buy X-Coins @ Y-Price per coin
  function buyToken(bytes32 _accountNumber, address _token, uint _priceInWei, uint _amount) public {
    if(!isAbleUser(msg.sender)) throw;
    if(!isAbleAccount(_accountNumber)) throw;
    if(ableAccounts[_accountNumber].ableUserKey!=msg.sender) throw;
    
    uint totalAmountOfEtherNecessary = 0;
    uint amountOfTokensNecessary = _amount;

    if (dexTokens[_token].sell_length == 0 || dexTokens[_token].curSellPrice > _priceInWei) {
      createBuyLimitOrderForTokensUnableToMatchWithSellOrderForBuyer(_accountNumber, _token, _priceInWei, amountOfTokensNecessary);
    } else {
      // Execute Market Buy Order Immediately if:
      // - Existing Sell Limit Order exists that is less than or equal to the Buy Price Offered by the function caller

      uint totalAmountOfEtherAvailable = 0;
      // 09 Unit Test: `whilePrice` initially 4 finney (i.e. 4000000000000000 Wei)
      uint whilePrice = dexTokens[_token].curSellPrice;
      // `offers_key` declaration initialises it to 0
      uint offers_key;

      // 09 Unit Test: `priceInWei` initially 4 finney (i.e. 4000000000000000 Wei)
      while (whilePrice <= _priceInWei && amountOfTokensNecessary > 0) {
        // 09 Unit Test: `offers_key` assigned to 1
        offers_key = dexTokens[_token].sellBook[whilePrice].offers_key;
        // 09 Unit Test: `dexTokens[_token].sellBook[whilePrice].offers_length` is 1
        //        i.e.          .sellBook[4000000000000000]
        // 09 Unit Test: `amountOfTokensNecessary` is 5
        while (offers_key <= dexTokens[_token].sellBook[whilePrice].offers_length && amountOfTokensNecessary > 0) {
          // 09 Unit Test: `volumeAtPriceFromAccount` assigned to 5
          uint volumeAtPriceFromAccount = dexTokens[_token].sellBook[whilePrice].offers[offers_key].amountTokens;
            
          // 5 <= 5
          if (volumeAtPriceFromAccount <= amountOfTokensNecessary) {
            // 20000000000000000 = 5 * 4000000000000000
            totalAmountOfEtherAvailable = volumeAtPriceFromAccount * whilePrice;

            // Overflow Check
            // 09 Unit Test: `ableAccounts[_accountNumber]` is initially 3000000000000000000 (3 ETH)
            require(ableAccounts[_accountNumber].token[address(0)] >= totalAmountOfEtherAvailable);
            require(ableAccounts[_accountNumber].token[address(0)] - totalAmountOfEtherAvailable <= ableAccounts[_accountNumber].token[address(0)]);

            // Decrease the Buyer's Account Balance of ETH by the amount the Sell Offer Order is willing to accept in exchange for Seller's tokens
            ableAccounts[_accountNumber].token[address(0)] -= totalAmountOfEtherAvailable;

            // Overflow Checks
            require(ableAccounts[_accountNumber].token[_token] + volumeAtPriceFromAccount >= ableAccounts[_accountNumber].token[_token]);
            require(ableAccounts[dexTokens[_token].sellBook[whilePrice].offers[offers_key].accountNumber].token[address(0)] + totalAmountOfEtherAvailable >= ableAccounts[dexTokens[_token].sellBook[whilePrice].offers[offers_key].accountNumber].token[address(0)]);

            // Increase the Buyer's Account Balance of tokens by the amount the Sell Offer Order is willing to accept in exchange for the ETH
            ableAccounts[_accountNumber].token[_token] += volumeAtPriceFromAccount;
            // Increase the Seller's Account Balance of ETH by the amount the Sell Offer Order Entry is willing to accept in exchange for Seller's tokens
            ableAccounts[dexTokens[_token].sellBook[whilePrice].offers[offers_key].accountNumber].token[address(0)] += totalAmountOfEtherAvailable;
            
            // Reset the amount of ETH offered by the Current Sell Order Entry to zero 0
            dexTokens[_token].sellBook[whilePrice].offers[offers_key].amountTokens = 0;
            dexTokens[_token].sellBook[whilePrice].offers_key++;

            BuyOrderFulfilled(Token(_token).name, volumeAtPriceFromAccount, whilePrice, offers_key);

            amountOfTokensNecessary -= volumeAtPriceFromAccount;
          } 
          // 5 > 5
          else {
            require(dexTokens[_token].sellBook[whilePrice].offers[offers_key].amountTokens > amountOfTokensNecessary);

            totalAmountOfEtherNecessary = amountOfTokensNecessary * whilePrice;

            // Overflow Check
            require(ableAccounts[_accountNumber].token[address(0)] >= totalAmountOfEtherNecessary);
            require(ableAccounts[_accountNumber].token[address(0)] - totalAmountOfEtherNecessary <= ableAccounts[_accountNumber].token[address(0)]);

            // Decrease the Buyer's Account Balance of ETH by the amount the Sell Offer Order is willing to accept in exchange for Seller's tokens
            ableAccounts[_accountNumber].token[address(0)] -= totalAmountOfEtherNecessary;

            // Overflow Check
            require(ableAccounts[_accountNumber].token[_token] + amountOfTokensNecessary >= ableAccounts[_accountNumber].token[_token]);
            require(ableAccounts[dexTokens[_token].sellBook[whilePrice].offers[offers_key].accountNumber].token[address(0)] + totalAmountOfEtherNecessary >= balanceEthForAddress[dexTokens[tokenNameIndex].sellBook[whilePrice].offers[offers_key].who]);

            // Increase the Buyer's Account Balance of tokens by the amount the Sell Offer Order is willing to accept in exchange for the ETH
            ableAccounts[_accountNumber].token[_token] += amountOfTokensNecessary;
            // Increase the Seller's Account Balance of ETH by the amount the Sell Offer Order Entry is willing to accept in exchange for Seller's tokens
            ableAccounts[dexTokens[_token].sellBook[whilePrice].offers[offers_key].accountNumber].token[address(0)] += totalAmountOfEtherNecessary;

            // Reset the amount of ETH offered by the Current Sell Order Entry to (amountTokens - amountOfTokensNecessary)
            dexTokens[tokenNameIndex].sellBook[whilePrice].offers[offers_key].amountTokens -= amountOfTokensNecessary;
            amountOfTokensNecessary = 0;

            BuyOrderFulfilled(Token(_token).name, amountOfTokensNecessary, whilePrice, offers_key);
          }

          // offer of whilePrice is complete
          if (offers_key == dexTokens[_token].sellBook[whilePrice].offers_length && dexTokens[_token].sellBook[whilePrice].offers[offers_key].amountTokens == 0) {
            dexTokens[_token].sell_length--;
            // 
            if (whilePrice == dexTokens[_token].sellBook[whilePrice].higherPrice || dexTokens[_token].sellBook[whilePrice].higherPrice == 0) {
              dexTokens[tokenNameIndex].curSellPrice = 0;
            } else {
              dexTokens[_token].curSellPrice = dexTokens[_token].sellBook[whilePrice].higherPrice;
              dexTokens[_token].sellBook[dexTokens[_token].sellBook[whilePrice].higherPrice].lowerPrice = 0;
            }
          }
          offers_key++;
        }
        whilePrice = dexTokens[_token].curSellPrice;
      }

      if (amountOfTokensNecessary > 0) {
        createBuyLimitOrderForTokensUnableToMatchWithSellOrderForBuyer(_accountNumber, _token, _priceInWei, amountOfTokensNecessary);
      }
    }
  }

  function createBuyLimitOrderForTokensUnableToMatchWithSellOrderForBuyer(bytes32 _accountNumber, address _token, uint _priceInWei, uint _amountOfTokensNecessary) internal {
    // Calculate Ether Balance necessary to Buy the Token Symbol Name.
    uint totalAmountOfEtherNecessary = _amountOfTokensNecessary * _priceInWei;

    // Overflow Checks
    require(totalAmountOfEtherNecessary >= _amountOfTokensNecessary);
    require(totalAmountOfEtherNecessary >= _priceInWei);
    require(ableAccounts[_accountNumber].token[address(0)] >= totalAmountOfEtherNecessary);
    require(ableAccounts[_accountNumber].token[address(0)] - totalAmountOfEtherNecessary >= 0);
    require(ableAccounts[_accountNumber].token[address(0)] - totalAmountOfEtherNecessary <= ableAccounts[_accountNumber].token[address(0)]);

    // Deduct from Exchange Balance the Ether amount necessary the Buy Limit Order.
    ableAccounts[_accountNumber].token[address(0)] -= totalAmountOfEtherNecessary;

    // Create New Limit Order in the Order Book if either:
    // - No Sell Orders already exist that match the Buy Price Price Offered by the function caller
    // - Existing Sell Price is greater than the Buy Price Offered by the function caller

    // Add Buy Limit Order to Order Book
    addBuyOffer(_token, _priceInWei, _amountOfTokensNecessary, _accountNumber);
 
    // Emit Event.
    LimitBuyOrderCreated(_token, _accountNumber, amountOfTokensNecessary, _priceInWei, dexTokens[_token].buyBook[_priceInWei].offers_length);
  }

  ///////////////////////////
  // BID LIMIT ORDER LOGIC //
  ///////////////////////////

  function addBuyOffer(address _token, uint _priceInWei, uint _amount, bytes32 _accountNumber) internal {
    // Offers Length in the Buy Order Book for the Buy Limit Offer Price Entry is increased 
    dexTokens[_token].buyBook[_priceInWei].offers_length++;

    // Add Buy Offer to Buy Order Book under the Price Offered Entry for a Token Symbol
    dexTokens[_token].buyBook[_priceInWei].offers[dexTokens[_token].buyBook[_priceInWei].offers_length] = Offer(_amount, _accountNumber);

    // Update Linked List if the Price Offered Entry does not already exist in the Order Book 
    // - Next Price Entry - Update Lower Price value
    // - Previous Price Entry - Update Higher Price value
    //
    // Note: If it is the First Offer at `priceInWei` in the Buy Order Book 
    // then must inspect Buy Order Book to determine where to Insert the First Offer in the Linked List
    if (dexTokens[_token].buyBook[_priceInWei].offers_length == 1) {
      dexTokens[_token].buyBook[_priceInWei].offers_key = 1;
      // New Buy Order Received. Increment Counter. Set later with getOrderBook array
      dexTokens[_token].buy_length++;

      // Set Lower Buy Price and Higher Buy Price for the Token Symbol
      uint curBuyPrice = dexTokens[_token].curBuyPrice;
      uint lowestBuyPrice = dexTokens[_token].lowestBuyPrice;

      // Case 1 & 2: New Buy Offer is the First Order Entered or Lowest Entry
      if (lowestBuyPrice == 0 || lowestBuyPrice > _priceInWei) {
        // Case 1: First Entry. No Orders Exist `lowestBuyPrice == 0`. Insert New (First) Order. Linked List with Single Entry
        if (curBuyPrice == 0) {
          // Set Current Buy Price to Buy Price of New (First) Order 
          dexTokens[_token].curBuyPrice = _priceInWei;
          // Set Buy Order Book Higher Price to Buy Price of New (First) Order 
          dexTokens[_token].buyBook[_priceInWei].higherPrice = _priceInWei;
          // Set Buy Order Book Lower Price to 0 
          dexTokens[_token].buyBook[_priceInWei].lowerPrice = 0;
        // Case 2: New Buy Offer is the Lowest Entry (Less Than Lowest Existing Buy Price) `lowestBuyPrice > priceInWei`
        } else {
          // Set Buy Order Book Lowest Price to New Order Price (Lowest Entry in Linked List)
          dexTokens[_token].buyBook[lowestBuyPrice].lowerPrice = _priceInWei;
          // Adjust Higher and Lower Prices of Linked List relative to New Lowest Entry in Linked List
          dexTokens[_token].buyBook[_priceInWei].higherPrice = lowestBuyPrice;
          dexTokens[_token].buyBook[_priceInWei].lowerPrice = 0;
        }
        dexTokens[_token].lowestBuyPrice = _priceInWei;
      }
      // Case 3: New Buy Offer is the Highest Buy Price (Last Entry). Not Need Find Right Entry Location
      else if (curBuyPrice < _priceInWei) {
        dexTokens[_token].buyBook[curBuyPrice].higherPrice = _priceInWei;
        dexTokens[_token].buyBook[_priceInWei].higherPrice = _priceInWei;
        dexTokens[_token].buyBook[_priceInWei].lowerPrice = curBuyPrice;
        dexTokens[_token].curBuyPrice = _priceInWei;
      }
      // Case 4: New Buy Offer is between Existing Lowest and Highest Buy Prices. Find Location to Insert Depending on Gas Limit
      else {
        // Start Loop with Existing Highest Buy Price
        bool weFoundLocation = false;
        // Loop Until Find
        while (curBuyPrice > 0 && !weFoundLocation) {
          if (curBuyPrice < _priceInWei && dexTokens[_token].buyBook[curBuyPrice].higherPrice > _priceInWei) {
            // Set New Order Book Entry Higher and Lower Prices of Linked List 
            dexTokens[_token].buyBook[_priceInWei].lowerPrice = curBuyPrice;
            dexTokens[_token].buyBook[_priceInWei].higherPrice = dexTokens[_token].buyBook[curBuyPrice].higherPrice;
            // Set Order Book's Higher Price Entry's Lower Price to the New Offer Current Price
            dexTokens[_token].buyBook[dexTokens[_token].buyBook[curBuyPrice].higherPrice].lowerPrice = _priceInWei;
            // Set Order Books's Lower Price Entry's Higher Price to the New Offer Current Price
            dexTokens[_token].buyBook[curBuyPrice].higherPrice = _priceInWei;
            // Found Location to Insert New Entry where:
            // - Higher Buy Prices > Offer Buy Price, and 
            // - Offer Buy Price > Entry Price
            weFoundLocation = true;
          }
          // Set Highest Buy Price to the Order Book's Highest Buy Price's Lower Entry Price on Each Iteration
          curBuyPrice = dexTokens[_token].buyBook[curBuyPrice].lowerPrice;
        }
      }
    }
  }

  /////////////////////////////////
  // NEW ORDER - ASK ORDER     //
  /////////////////////////////////

  // Market Sell Order Function
  // User wants to Sell X-Coins @ Y-Price per coin
  function sellToken(bytes32 _accountNumber, address _token, uint _priceInWei, uint _amount) public payable {
    if(!isAbleUser(msg.sender)) throw;
    if(!isAbleAccount(_accountNumber)) throw;
    if(ableAccounts[_accountNumber].ableUserKey!=msg.sender) throw;
    
    uint totalAmountOfEtherNecessary = 0;
    uint totalAmountOfEtherAvailable = 0;
    // Given `amount` Volume of tokens to find necessary to fulfill the current Sell Order
    uint amountOfTokensNecessary = _amount;

    if (dexTokens[_token].buy_length == 0 || dexTokens[_token].curBuyPrice < _priceInWei) {
      createSellLimitOrderForTokensUnableToMatchWithBuyOrderForSeller(_accountNumber, _token, _priceInWei, amountOfTokensNecessary);
    } else {
      // Execute Market Sell Order Immediately if:
      // - Existing Buy Limit Order exists that is greater than the Sell Price Offered by the function caller

      // Start with the Highest Buy Price (since Seller wants to exchange their tokens with the highest bidder)
      uint whilePrice = dexTokens[_token].curBuyPrice;
      uint offers_key;
      // Iterate through the Buy Book (Buy Offers Mapping) to Find "Highest" Buy Offer Prices 
      // (assign to Current Buy Price `whilePrice` each iteration) that are Higher than the Sell Offer
      // and whilst the Volume to find is not yet fulfilled.
      // Note: Since we are in the Sell Order `sellOrder` function we use the Buy Book
      while (whilePrice >= _priceInWei && amountOfTokensNecessary > 0) {
        offers_key = dexTokens[_token].buyBook[whilePrice].offers_key;
        // Inner While - Iterate Buy Book (Buy Offers Mapping) Entries for the Current Buy Price using FIFO
        while (offers_key <= dexTokens[_token].buyBook[whilePrice].offers_length && amountOfTokensNecessary > 0) {
          uint volumeAtPriceFromAccount = dexTokens[_token].buyBook[whilePrice].offers[offers_key].amountTokens;
          // Case when Current Buy Order Entry Volume Only Partially fulfills the Sell Order Volume
          // (i.e. Sell Order wants to sell more than Current Buy Order Entry requires)
          // then we achieve Partial exchange from Sell Order to the Buy Order Entry and then
          // move to Next Address with a Buy Order Entry at the Current Buy Price for the symbolName
          // i.e. Sell Order amount is for 1000 tokens but Current Buy Order is for 500 tokens at Current Buy Price 
          if (volumeAtPriceFromAccount <= amountOfTokensNecessary) {
            // Amount of Ether available to be exchanged in the Current Buy Book Offers Entry at the Current Buy Price 
            totalAmountOfEtherAvailable = volumeAtPriceFromAccount * whilePrice;

            // Overflow Check
            require(ableAccounts[_accountNumber].token[_token] >= volumeAtPriceFromAccount);
            require(ableAccounts[_accountNumber].token[_token] - volumeAtPriceFromAccount <= ableAccounts[_accountNumber].token[_token]);
  
            // Decrease the Seller's Account Balance of tokens by the amount the Buy Offer Order Entry is willing to accept in exchange for ETH
            ableAccounts[_accountNumber].token[_token] -= volumeAtPriceFromAccount;

            // Overflow Checks
            // - Check that fulfilling the Current Buy Order Entry by adding the amount of tokens sold by the Sell Offer does not overflow 
            require(ableAccounts[dexTokens[_token].buyBook[whilePrice].offers[offers_key].accountNumber].token[_token] + volumeAtPriceFromAccount >= ableAccounts[dexTokens[_token].buyBook[whilePrice].offers[offers_key].accountNumber].token[_token]);
            // - Check that fulfilling the Current Buy Order Entry increases the Seller's ETH balance without overflowing 
            require(ableAccounts[_accountNumber].token[address(0)] + totalAmountOfEtherAvailable >= ableAccounts[_accountNumber].token[address(0)]);

            // Increase the Buyer's Account Balance of tokens (for the matching Buy Order Entry) with the proportion tokens required from the Sell Order
            // (given that the Buy Offer originator is offering less or equal to the volume of the Sell Offer)
            ableAccounts[dexTokens[_token].buyBook[whilePrice].offers[offers_key].accountNumber].token[_token] += volumeAtPriceFromAccount;
            // Increase the Seller's Account Balance of ETH with all the ETH offered by the Current Buy Order Entry (in exchange for the Seller's token offering)
            ableAccounts[_accountNumber].token[address(0)] += totalAmountOfEtherAvailable;
            
            // Reset the amount of ETH offered by the Current Buy Order Entry to zero 0
            dexTokens[_token].buyBook[whilePrice].offers[offers_key].amountTokens = 0;
            // Move up one element in the Buy Book Offers Mapping (i.e. to the Next Buy Offer at the Current Buy Order Price)
            dexTokens[_token].buyBook[whilePrice].offers_key++;

            // Emit Event
            SellOrderFulfilled(Token(_token).name, volumeAtPriceFromAccount, whilePrice, offers_key);

            // Decrease the amount necessary to be sold from the Seller's Offer by the amount of of tokens just exchanged for ETH with the Buyer at the Current Buy Order Price
            amountOfTokensNecessary -= volumeAtPriceFromAccount;

          // Case when Sell Order Volume Only Partially fulfills the Current Buy Order Entry Volume 
          // (i.e. Sell Order wants to sell more than the Current Buy Order Entry needs)
          // then we achieve Partial exchange from Sell Order to the Buy Order Entry and then exit
          // i.e. Sell Order amount is for 500 tokens and Current Buy Order is for 1000 tokens at Current Buy Price 
          } else {
            // Check that the equivalent value in tokens of the Buy Offer Order Entry is actually more than Sell Offer Volume 
            require(volumeAtPriceFromAccount - amountOfTokensNecessary > 0);

            // Calculate amount in ETH necessary to buy the Seller's tokens based on the Current Buy Price
            totalAmountOfEtherNecessary = amountOfTokensNecessary * whilePrice;

            // Overflow Check
            require(ableAccounts[_accountNumber].token[_token] >= amountOfTokensNecessary);
            require(ableAccounts[_accountNumber].token[_token] - amountOfTokensNecessary <= ableAccounts[_accountNumber].token[_token]);

            // Decrease the Seller's Account Balance of tokens by amount they are offering since the Buy Offer Order Entry is willing to accept it all in exchange for ETH
            ableAccounts[_accountNumber].token[_token] -= amountOfTokensNecessary;

            // Overflow Check
            require(ableAccounts[dexTokens[_token].buyBook[whilePrice].offers[offers_key].accountNumber].token[_token] + amountOfTokensNecessary >= ableAccounts[dexTokens[_token].buyBook[whilePrice].offers[offers_key].accountNumber].token[_token]);
            require(ableAccounts[_accountNumber].token[address(0)] + totalAmountOfEtherNecessary >= ableAccounts[_accountNumber].token[address(0)]);

            // Increase the Seller's Account Balance of ETH with the equivalent ETH amount corresponding to that offered by the Current Buy Order Entry (in exchange for the Seller's token offering)
            ableAccounts[_accountNumber].token[address(0)] += totalAmountOfEtherNecessary;
            // Increase the Buyer's Account Balance of tokens (for the matching Buy Order Entry) with all the tokens sold by the Sell Order
            ableAccounts[dexTokens[_token].buyBook[whilePrice].offers[offers_key].accountNumber].token[_token] += amountOfTokensNecessary;

            // Decrease the Buy Offer Order Entry amount by the full amount necessary to be sold by the Sell Offer
            dexTokens[_token].buyBook[whilePrice].offers[offers_key].amountTokens -= amountOfTokensNecessary;
            
            // Emit Event
            SellOrderFulfilled(Token(_token).name, amountOfTokensNecessary, whilePrice, offers_key);

            // Set the remaining amount necessary to be sold by the Sell Order to zero 0 since we have fulfilled the Sell Offer
            amountOfTokensNecessary = 0;
          }

          // Case when the Current Buy Offer is the last element in the list for the Current Buy Order Offer Price
          // and when we have exhausted exchanging the Sell Order's amount with Offers at the Current Buy Offer Price
          // then Move to the Next Highest Buy Order Offer Price in the Buy Book
          if (offers_key == dexTokens[_token].buyBook[whilePrice].offers_length && dexTokens[_token].buyBook[whilePrice].offers[offers_key].amountTokens == 0) {
            // Decrease the quantity of Buy Order Prices since we used up the entire volume of all the Buy Offers at that price 
            dexTokens[_token].buy_length--;
            if (whilePrice == dexTokens[_token].buyBook[whilePrice].lowerPrice || dexTokens[_token].buyBook[whilePrice].lowerPrice == 0) {
              // Case when no more Buy Book Offers to iterate through for the Current Buy Price (Last element of Linked List) 
              // then set Current Buy Price to zero 0
              dexTokens[_token].curBuyPrice = 0;
            } else {
              // REFERENCE "A"
              // Case when not yet fulfilled `amountOfTokensNecessary` Volume of Sell Offer then
              // set Proposed Current Buy Price to the Next Lower Buy Price in the Linked List
              // so we move to the Next Lowest Entry in the Buy Book Offers Linked List
              dexTokens[_token].curBuyPrice = dexTokens[_token].buyBook[whilePrice].lowerPrice;
              // Set the Higher Price of the Next Lowest Entry that we moved to, to the Current Buy Order Offer Price
              dexTokens[_token].buyBook[dexTokens[_token].buyBook[whilePrice].lowerPrice].higherPrice = dexTokens[tokenNameIndex].curBuyPrice;
            }
          }
          offers_key++;
        }
        // After Finishing an Iteration of an Entry in the Buy Book Offers (until exhausted all Buy Book Offers for the previous Current Buy Price)
        // and setting the Proposed Current Buy Price to the Next Lowest Buy Price in REFERENCE "A".
        // Move to the Next Lowest Buy Price to be Iterated over by setting the Current Buy Price `whilePrice`
        whilePrice = dexTokens[_token].curBuyPrice;
      }

      // Case when unable to find a suitable Buy Order Offer to perform an exchange with the Seller's tokens 
      if (amountOfTokensNecessary > 0) {
        // Add a Sell Limit Order to the Sell Book since could not find a Market Order to exchange Seller's tokens immediately
        createSellLimitOrderForTokensUnableToMatchWithBuyOrderForSeller(_accountNumber, _token, _priceInWei, amountOfTokensNecessary);
      }
    }
  }

  function createSellLimitOrderForTokensUnableToMatchWithBuyOrderForSeller(bytes32 _accountNumber, address _token, uint _priceInWei, uint _amountOfTokensNecessary) internal {
    // Calculate Ether Balance necessary on the Buy-side to Sell all tokens of Token Symbol Name.
    uint totalAmountOfEtherNecessary = _amountOfTokensNecessary * _priceInWei;

    // Overflow Check
    require(totalAmountOfEtherNecessary >= _amountOfTokensNecessary);
    require(totalAmountOfEtherNecessary >= _priceInWei);
    require(ableAccounts[_accountNumber].token[_token] >= _amountOfTokensNecessary);
    require(ableAccounts[_accountNumber].token[_token] - _amountOfTokensNecessary >= 0);
    require(ableAccounts[_accountNumber].token[_token] + totalAmountOfEtherNecessary >= ableAccounts[_accountNumber].token[_token]);

    // Deduct from Exchange Balance the Token amount for the Sell Limit Order
    ableAccounts[_accountNumber].token[_token] -= _amountOfTokensNecessary;

    // Create New Sell Limit Order in the Sell Order Book if either:
    // - No Buy Orders already exist that match the Sell Price Price Offered by the function caller
    // - Existing Buy Price is less than the Sell Price Offered by the function caller

    // Add Sell Limit Order to Order Book
    addSellOffer(_token, _priceInWei, amountOfTokensNecessary, _accountNumber);

    // Emit Event
    LimitSellOrderCreated(Token(_token).name, _accountNumber, _amountOfTokensNecessary, _priceInWei, dexTokens[_token].sellBook[_priceInWei].offers_length);
  }

  ///////////////////////////
  // ASK LIMIT ORDER LOGIC //
  ///////////////////////////

  function addSellOffer(address _token, uint _priceInWei, uint _amount, bytes32 _accountNumber) internal {
    // Offers Length in the Sell Order Book for the Sell Limit Offer Price Entry is increased 
    dexTokens[_token].sellBook[_priceInWei].offers_length++;

    // Add Sell Offer to Sell Order Book under the Price Offered Entry for a Token Symbol
    dexTokens[_token].sellBook[_priceInWei].offers[dexTokens[_token].sellBook[_priceInWei].offers_length] = Offer(_amount, _accountNumber);

    // Update Linked List if the Price Offered Entry does not already exist in the Order Book 
    // - Next Price Entry - Update Lower Price value
    // - Previous Price Entry - Update Higher Price value
    //
    // Note: If it is the First Offer at `priceInWei` in the Sell Order Book 
    // then must inspect Sell Order Book to determine where to Insert the First Offer in the Linked List
    if (dexTokens[_token].sellBook[_priceInWei].offers_length == 1) {
      dexTokens[_token].sellBook[_priceInWei].offers_key = 1;
      dexTokens[_token].sell_length++;
    
      uint curSellPrice = dexTokens[_token].curSellPrice;
      uint highestSellPrice = dexTokens[_token].highestSellPrice;

      // Case 1 & 2: New Sell Offer is the First Order Entered or Highest Entry  
      if (highestSellPrice == 0 || highestSellPrice < _priceInWei) {
        // Case 1: First Entry. No Sell Orders Exist `highestSellPrice == 0`. Insert New (First) Order
        if (curSellPrice == 0) {
          dexTokens[_token].curSellPrice = _priceInWei;
          dexTokens[_token].sellBook[_priceInWei].higherPrice = 0;
          dexTokens[_token].sellBook[_priceInWei].lowerPrice = 0;
        // Case 2: New Sell Offer is the Highest Entry (Higher Than Highest Existing Sell Price) `highestSellPrice < priceInWei`
        } else {
          dexTokens[_token].sellBook[highestSellPrice].higherPrice = _priceInWei;
          dexTokens[_token].sellBook[_priceInWei].lowerPrice = highestSellPrice;
          dexTokens[_token].sellBook[_priceInWei].higherPrice = 0;
        }
        dexTokens[_token].highestSellPrice = _priceInWei;
      }
      // Case 3: New Sell Offer is the Lowest Sell Price (First Entry). Not Need Find Right Entry Location
      else if (curSellPrice > _priceInWei) {
        dexTokens[_token].sellBook[curSellPrice].lowerPrice = _priceInWei;
        dexTokens[_token].sellBook[_priceInWei].higherPrice = curSellPrice;
        dexTokens[_token].sellBook[_priceInWei].lowerPrice = 0;
        dexTokens[_token].curSellPrice = _priceInWei;
      }
      // Case 4: New Sell Offer is between Existing Lowest and Highest Sell Prices. Find Location to Insert Depending on Gas Limit
      else {
        // Start Loop with Existing Lowest Sell Price
        uint sellPrice = dexTokens[_token].curSellPrice;
        bool weFoundLocation = false;
        // Loop Until Find
        while (sellPrice > 0 && !weFoundLocation) {
          if (sellPrice < _priceInWei && dexTokens[_token].sellBook[sellPrice].higherPrice > _priceInWei) {
            // Set New Order Book Entry Higher and Lower Prices of Linked List
            dexTokens[_token].sellBook[_priceInWei].lowerPrice = sellPrice;
            dexTokens[_token].sellBook[_priceInWei].higherPrice = dexTokens[_token].sellBook[sellPrice].higherPrice;
            // Set Order Book's Higher Price Entry's Lower Price to the New Offer Current Price
            dexTokens[_token].sellBook[dexTokens[_token].sellBook[sellPrice].higherPrice].lowerPrice = _priceInWei;
            // Set Order Books's Lower Price Entry's Higher Price to the New Offer Current Price
            dexTokens[_token].sellBook[sellPrice].higherPrice = _priceInWei;
            // Found Location to Insert New Entry where:
            // - Lower Sell Prices < Offer Sell Price, and 
            // - Offer Sell Price < Entry Price
            weFoundLocation = true;
          }
          // Set Lowest Sell Price to the Order Book's Lowest Buy Price's Higher Entry Price on Each Iteration
          sellPrice = dexTokens[_token].sellBook[sellPrice].higherPrice;
        }
      }
    }
  }

  ////////////////////////////////
  // CANCEL ORDER - LIMIT ORDER //
  ////////////////////////////////

  function cancelOrder(bytes32 _accountNumber, address _token, bool isSellOrder, uint _priceInWei, uint _offerKey) public {
    if(!isAbleUser(msg.sender)) throw;
    if(!isAbleAccount(_accountNumber)) throw;
    if(ableAccounts[_accountNumber].ableUserKey!=msg.sender) throw;

    // Case 1: Cancel Sell Limit Order
    if (isSellOrder) {
      // Verify that Caller Address of Cancel Order Function matches Original Address that Created Sell Limit Order 
      // Note: `offerKey` obtained in front-end logic from Event Emitted at Creation of Sell Limit Order 
      require(dexTokens[_token].sellBook[_priceInWei].offers[_offerKey].accountNumber == _accountNumber);
      // Obtain Tokens Amount that were to be sold in the Sell Limit Order
      uint tokensAmount = dexTokens[_token].sellBook[_priceInWei].offers[_offerKey].amountTokens;
      // Overflow Check
      require(ableAccounts[_accountNumber].token[_token] + tokensAmount >=  ableAccounts[_accountNumber].token[_token]);
      // Refund Tokens back to Balance
      ableAccounts[_accountNumber].token[_token] += tokensAmount;
      dexTokens[_token].sellBook[_priceInWei].offers[_offerKey].amountTokens = 0;
      SellOrderCanceled(Token(_token).name, _priceInWei, _offerKey);

    }
    // Case 2: Cancel Buy Limit Order
    else {
      require(dexTokens[_token].buyBook[_priceInWei].offers[_offerKey].who == msg.sender);
      uint etherToRefund = dexTokens[_token].buyBook[_priceInWei].offers[_offerKey].amountTokens * _priceInWei;
      // Overflow Check
      require(ableAccounts[_accountNumber].token[address(0)] + etherToRefund >= ableAccounts[_accountNumber].token[address(0)]);
      // Refund Ether back to Balance 
      ableAccounts[_accountNumber].token[address(0)] += etherToRefund;
      dexTokens[_token].buyBook[_priceInWei].offers[_offerKey].amountTokens = 0;
      BuyOrderCanceled(Token(_token).name, _priceInWei, _offerKey);
    }
  }


  /* -------- Default function -------- */

  function() {    
      
  }

} 