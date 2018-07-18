// 스마트 컨트랙트 주소
// etherscan: https://rinkeby.etherscan.io/address/0x4081d2636ffe95c326d849eb837d8e6a7111b12d#code
var contractAddress = '0xA3C03A87FB45100AA977EDAADc2F0eCF82598604'; // real contract address

// abi => 블록체인 컨트랙트에 올려져있는 비즈니스 로직 코드에 액세스 하기 위한 인터페이스 (추후 변경 예정)
var abi = [
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
        "name": "sellToken",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
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
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
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
]

var simpleStorageContract; // 컨트랙트 변수
var contractInstance;
var user_address; // 메타마스크에 로그인한 유저의 ethereum address
var user_accountNumber; // 에이블 간편 계좌 번호

function check_session_dummy() {

    $.ajax({
        method: "POST",
        url: "/check_session",
        dataType: "json",
        success: function (res) {
            // console.log("check_session : " + JSON.stringify(res));
            if (res.result == 200) {
                console.log('ready')
                user_address = res.user_address;

                var current_page = $(location).attr('href');
                get_account_dummy();

            } else {
                // alert('Please make sure to connect metamask rinkeby network');
                alert('메타마스크 Rinkeby 네트워크로 로그인 후 접근해 주세요.');
                $(location).attr('href', '/');
            }
        }

    });


}

function get_account_dummy(){
    simpleStorageContract = web3.eth.contract(abi);
    contractInstance = simpleStorageContract.at(contractAddress);
    contractInstance.getAbleUserAbleAccountCount.call(user_address, function (err, res) { // 유저의 계좌 갯수를 불러온다
        if (err) {
            console.log("err : " + err);
            return;
        }
        //계좌가 있다면
        if (res > 0) {
            //계좌 갯수만큼 계좌 넘버를 가져온다
            for (var i = 0; i < res; i++) { // 계좌 갯수만큼 반복
                contractInstance.getAbleUserAbleAccountAtIndex.call(user_address, i, function (err, res) {
                    if (err) {
                        console.log("err : " + err);
                        return;
                    }
                    if (res != null) { // 계좌 정보를 각각 가져와 셀렉트 박스 옵션으로 넣는다.

                        var account_nickname = web3.toAscii(res);
                        $('#select_account').append("<option value="+res+">"+account_nickname+"</option>");
                        $('#select_account2').append("<option value="+res+">"+account_nickname+"</option>");
                    }
                });


            }

        }
    });
}

function buy_token(){

    var _accountNumber = $('#select_account').val();
    var _token = $('#select_coin').val();
    var _priceInWei = web3.toWei(parseFloat($('#input_price_token').val()));
    var _amount = web3.toWei(parseFloat($('#input_num_token').val()));

    contractInstance.buyToken( _accountNumber , _token, _priceInWei, _amount, function (err, res){
        console.log(res);

    });
}


function sell_token(){

    var _accountNumber = $('#select_account2').val();
    var _token = $('#select_coin2').val();
    var _priceInWei = web3.toWei(parseFloat($('#input_price_token2').val()));
    var _amount = web3.toWei(parseFloat($('#input_num_token2').val()));

    contractInstance.sellToken( _accountNumber , _token, _priceInWei, _amount, function (err, res){
        console.log(res);

    });
}

function get_buy_order_book() {
    var _token_address = '0x0000000000000000000000000000000000000000';

    contractInstance.getBuyOrderBook(_token_address, function (err, res) {
        console.log(res);
    });
}

function get_sell_order_book() {
    var _token_address = '0x0000000000000000000000000000000000000000';

    contractInstance.getSellOrderBook(_token_address, function (err, res) {
        console.log(res);
    });
}
