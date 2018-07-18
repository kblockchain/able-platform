var able_coin_contract_address;
var able_coin_contract_abi;


var able_dollar_contract_address;
var able_dollar_contract_abi;


var able_platform_contract_address;
var able_platform_contract_abi;


var ethereum_address = "0x0000000000000000000000000000000000000000";


//able coin var
able_coin_contract_address = "0x295b3f39d7dacbc58329112064a14186f9fac786";
able_coin_contract_abi= [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

//토큰의 abi와 토큰의 스마트 컨트렉트 주소 입력
var tokenStorageContract = web3.eth.contract(able_coin_contract_abi);
var tokenContract = tokenStorageContract.at(able_coin_contract_address);




//able dollar var
able_dollar_contract_address = "0x8c2b240b0b89aa7ff9f767ad9e02afff823fed2f";
able_dollar_contract_abi= [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

//토큰의 abi와 토큰의 스마트 컨트렉트 주소 입력
var able_dollar_StorageContract = web3.eth.contract(able_coin_contract_abi);
var able_dollar_Contract = able_dollar_StorageContract.at(able_coin_contract_address);





//able platform var
able_platform_contract_address = "0xA3C03A87FB45100AA977EDAADc2F0eCF82598604";
able_platform_contract_abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_amountTokens",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_orderKey",
                "type": "uint256"
            }
        ],
        "name": "BuyOrderFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_amountTokens",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_orderKey",
                "type": "uint256"
            }
        ],
        "name": "SellOrderFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_orderKey",
                "type": "uint256"
            }
        ],
        "name": "BuyOrderCanceled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_orderKey",
                "type": "uint256"
            }
        ],
        "name": "SellOrderCanceled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipRenounced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "userName",
                "type": "bytes32"
            }
        ],
        "name": "AbleUserRegistered_Successful",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "accountNumber",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "accountType",
                "type": "string"
            }
        ],
        "name": "AbleAccountOpened_Successful",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "_amountTokens",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_orderKey",
                "type": "uint256"
            }
        ],
        "name": "LimitSellOrderCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "_amountTokens",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_orderKey",
                "type": "uint256"
            }
        ],
        "name": "LimitBuyOrderCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "from",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "to",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "balance",
                "type": "uint256"
            }
        ],
        "name": "AbleTransfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "balance",
                "type": "uint256"
            }
        ],
        "name": "AbleWithdraw",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "balance",
                "type": "uint256"
            }
        ],
        "name": "AbleDeposit",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "buyToken",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_isSellOrder",
                "type": "bool"
            },
            {
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "name": "_offerKey",
                "type": "uint256"
            }
        ],
        "name": "cancelOrder",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            }
        ],
        "name": "deposit",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "depositToken",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "_password",
                "type": "bytes32"
            }
        ],
        "name": "openAbleAccount",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_userName",
                "type": "bytes32"
            }
        ],
        "name": "registerAbleUser",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_priceInWei",
                "type": "uint256"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "sellToken",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "bytes32"
            },
            {
                "name": "_to",
                "type": "bytes32"
            },
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawToken",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "ableAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "ableDollarAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "_token_",
                "type": "address"
            },
            {
                "name": "_balance_",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            }
        ],
        "name": "getAbleAccount",
        "outputs": [
            {
                "name": "_userAddress_",
                "type": "address"
            },
            {
                "name": "_userName_",
                "type": "bytes32"
            },
            {
                "name": "_accountNumber_",
                "type": "bytes32"
            },
            {
                "name": "_accountInfo_",
                "type": "string"
            },
            {
                "name": "_accountType_",
                "type": "string"
            },
            {
                "name": "_numToken_",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAbleAccountCount",
        "outputs": [
            {
                "name": "ableAccountCount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            },
            {
                "name": "row",
                "type": "uint256"
            }
        ],
        "name": "getAbleAccountTokenBalance",
        "outputs": [
            {
                "name": "_accountNumber_",
                "type": "bytes32"
            },
            {
                "name": "_tokenName_",
                "type": "address"
            },
            {
                "name": "_balance_",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_userAddress",
                "type": "address"
            },
            {
                "name": "row",
                "type": "uint256"
            }
        ],
        "name": "getAbleUserAbleAccountAtIndex",
        "outputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_userAddress",
                "type": "address"
            }
        ],
        "name": "getAbleUserAbleAccountCount",
        "outputs": [
            {
                "name": "ableAccountCount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "row",
                "type": "uint256"
            }
        ],
        "name": "getAbleUserAtIndex",
        "outputs": [
            {
                "name": "_userAddress",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAbleUserCount",
        "outputs": [
            {
                "name": "ableUserCount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "getBuyOrderBook",
        "outputs": [
            {
                "name": "_arrPricesBuy_",
                "type": "uint256[]"
            },
            {
                "name": "_arrVolumesBuy_",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "getSellOrderBook",
        "outputs": [
            {
                "name": "",
                "type": "uint256[]"
            },
            {
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_accountNumber",
                "type": "bytes32"
            }
        ],
        "name": "isAbleAccount",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_userAddress",
                "type": "address"
            }
        ],
        "name": "isAbleUser",
        "outputs": [
            {
                "name": "isIndeed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

//토큰의 abi와 토큰의 스마트 컨트렉트 주소 입력
var ableStorageContract = web3.eth.contract(able_platform_contract_abi);
var ableContract = ableStorageContract.at(able_platform_contract_address);

// var able_account ="0x7365636f6e640000000000000000000000000000000000000000000000000000"; // 미리 생성해 둔 account number

var input_account_number;
var input_num_token;
var select_coin;


/**
 * 토큰을 보내기 전에, ERC 20 토큰을 approve 해주는 과정
 */
function check_approve() {

    input_account_number = document.getElementById("input_account_number").value; // 보내고자 하는 계좌번호
    input_num_token = document.getElementById("input_num_token").value; // 보내고자 하는 토큰 갯수

    /**
     * Set allowance for other address
     * Allows `_spender` to spend no more than `_value` tokens on your behalf
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */
    tokenContract.approve(able_platform_contract_address, input_num_token, function (err, result) {

        console.log("****************11111*****************");
        console.log("result : " + result);

        if (err) {
            console.log("****************1.err*****************");
        }


        // // event listener
        // // check AbleOpenAccount success or fail
        // tokenContract.allowance().watch((err, result) => {
        //     // if approve fail
        //     if (err) {
        //         console.log("****************승인실패*****************")
        //
        //     }
        // });

    });

}


/**
 * 입금 기능
 */
function deposit_token() {

    var selected_coin_contract_address;
    select_coin=$("#select_coin option:selected").val();

    if(select_coin == "t001") {

        input_account_number = document.getElementById("input_account_number").value; // 보내고자 하는 에이블 토큰 갯수
        input_num_token = document.getElementById("input_num_token").value; // 보내고자 하는 에이블 토큰 갯수

        console.log("ethereum");
        selected_coin_contract_address = ethereum_address;

        ableContract.deposit.sendTransaction(input_account_number, {
            from: user_address, // 보내는 사람의 주소 (메타마스크 로그인 주소)
            value: web3.toWei(input_num_token, 'ether') // 보내고자 하는 수량
        }, function (err, transactionHash) {
            // 오류 발생시
            if (err) {
                return toast('Metamask error!');
            }

            console.log(transactionHash);
        });
    }

    // able coin
    else if(select_coin == "t002") {
        console.log("able coin");
        selected_coin_contract_address = able_coin_contract_address;

        /**
         * @dev Function to deposit token to _accountNumber
         * @param _accountNumber the bytes32 to deposit.
         * @param _token the address to set token address.
         * @param _amount the uint to set amount.
         * @return boolean flag if open success.
         */
        ableContract.depositToken(input_account_number, selected_coin_contract_address, input_num_token, function (err, result) {
            // if approve fail
            if (err) {
                console.log("****************저축 실패*****************")
            }

            ableContract.AbleDeposit().watch((err,res) => {

                console.log("입금 확인 result : " + res);

                //todo token 이라는 변수가 다른 함수와 겹쳐셔 이벤트값 불러오기가 안됨.
                // var token = result.args.token;
                var userAddress = result.args.userAddress;
                var amount = result.args.amount;
                var balance = result.args.balance;

                console.log("openAbleAccount result user_accountNumber: " + token);
                console.log("openAbleAccount result user_Address: " + userAddress);
                console.log("openAbleAccount result input_account_password: " + amount);
                console.log("openAbleAccount result user_accountType: " + balance);

            });

        });
    }

    // able dollar
    else if(select_coin == "t003") {
        console.log("able dollar");
        selected_coin_contract_address = able_dollar_contract_address;

        /**
         * @dev Function to deposit token to _accountNumber
         * @param _accountNumber the bytes32 to deposit.
         * @param _token the address to set token address.
         * @param _amount the uint to set amount.
         * @return boolean flag if open success.
         */
        ableContract.depositToken(input_account_number, selected_coin_contract_address, input_num_token, function (err, result) {
            // if approve fail
            if (err) {
                console.log("****************저축 실패*****************")
            }

            ableContract.AbleDeposit().watch((err,res) => {

                console.log("입금 확인 result : " + res);

                //todo token 이라는 변수가 다른 함수와 겹쳐셔 이벤트값 불러오기가 안됨.
                // var token = result.args.token;
                var userAddress = result.args.userAddress;
                var amount = result.args.amount;
                var balance = result.args.balance;

                console.log("openAbleAccount result user_accountNumber: " + token);
                console.log("openAbleAccount result user_Address: " + userAddress);
                console.log("openAbleAccount result input_account_password: " + amount);
                console.log("openAbleAccount result user_accountType: " + balance);

            });

        });

    }

    console.log("selected coin : " + selected_coin_contract_address);
    console.log("input_num_token  : " + input_num_token);

}


/**
 * 출금 기능
 */
function withdraw_token() {

    var selected_coin_contract_address; // 선택된 코인의 컨트랙트 주소
    select_coin=$("#select_coin option:selected").val();

    // ethereum
    if(select_coin == "t001") {

        input_account_number = document.getElementById("input_account_number").value; // 보내고자 계좌 번호
        input_num_token = document.getElementById("input_num_token").value; // 보내고자 하는 이더리움 갯수

        console.log("ethereum");
        console.log("input_account_number :" +input_account_number);
        console.log("input_num_token :" +input_num_token);
        console.log("user_address :" +user_address);

        selected_coin_contract_address = ethereum_address;


        /**
         * @dev Function to withdraw token from _accountNumber
         * @param _accountNumber the bytes32 to withdraw.
         * @param _token the address to set token address.
         * @param _amount the uint to set amount.
         * @return boolean flag if open success.
         */
        ableContract.withdraw(input_account_number, input_num_token, function (err, result) {
            // if approve fail
            if (err) {
                console.log("****************출금 실패*****************")
            }

            ableContract.AbleWithdraw().watch((err,res) => {

                console.log("출금 확인 result : " + res);

                //todo token 이라는 변수가 다른 함수와 겹쳐셔 이벤트값 불러오기가 안됨.
                // var token = result.args.token;
                var userAddress = result.args.userAddress;
                var amount = result.args.amount;
                var balance = result.args.balance;

                console.log("openAbleAccount result user_accountNumber: " + token);
                console.log("openAbleAccount result user_Address: " + userAddress);
                console.log("openAbleAccount result input_account_password: " + amount);
                console.log("openAbleAccount result user_accountType: " + balance);

            });

        });
    }

    // able coin
    else if(select_coin == "t002") {
        console.log("able coin");
        selected_coin_contract_address = able_coin_contract_address;

        /**
         * @dev Function to withdraw token from _accountNumber
         * @param _accountNumber the bytes32 to withdraw.
         * @param _token the address to set token address.
         * @param _amount the uint to set amount.
         * @return boolean flag if open success.
         */
        ableContract.withdrawToken(input_account_number, selected_coin_contract_address, input_num_token, function (err, result) {
            // if approve fail
            if (err) {
                console.log("****************출금 실패*****************")
            }

            ableContract.AbleWithdraw().watch((err,res) => {

                console.log("출금 확인 result : " + res);

                //todo token 이라는 변수가 다른 함수와 겹쳐셔 이벤트값 불러오기가 안됨.
                // var token = result.args.token;
                var userAddress = result.args.userAddress;
                var amount = result.args.amount;
                var balance = result.args.balance;

                console.log("openAbleAccount result user_accountNumber: " + token);
                console.log("openAbleAccount result user_Address: " + userAddress);
                console.log("openAbleAccount result input_account_password: " + amount);
                console.log("openAbleAccount result user_accountType: " + balance);

            });

        });
    }

    // able dollar
    else if(select_coin == "t003") {
        console.log("able dollar");
        selected_coin_contract_address = able_dollar_contract_address;

        /**
         * @dev Function to deposit token to _accountNumber
         * @param _accountNumber the bytes32 to deposit.
         * @param _token the address to set token address.
         * @param _amount the uint to set amount.
         * @return boolean flag if open success.
         */
        ableContract.withdrawToken(input_account_number, selected_coin_contract_address, input_num_token, function (err, result) {
            // if approve fail
            if (err) {
                console.log("****************저축 실패*****************")
            }

            ableContract.AbleDeposit().watch((err,res) => {

                console.log("입금 확인 result : " + res);

                //todo token 이라는 변수가 다른 함수와 겹쳐셔 이벤트값 불러오기가 안됨.
                // var token = result.args.token;
                var userAddress = result.args.userAddress;
                var amount = result.args.amount;
                var balance = result.args.balance;

                console.log("openAbleAccount result user_accountNumber: " + token);
                console.log("openAbleAccount result user_Address: " + userAddress);
                console.log("openAbleAccount result input_account_password: " + amount);
                console.log("openAbleAccount result user_accountType: " + balance);

            });

        });

    }

}