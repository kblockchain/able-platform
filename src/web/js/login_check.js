// 스마트 컨트랙트 주소
var contractAddress = '0x02e4Ec83cF8918E48Be5776847E05bCA4a0f30ba'; // real contract address

// abi => 블록체인 컨트랙트에 올려져있는 비즈니스 로직 코드에 액세스 하기 위한 인터페이스 (추후 변경 예정)
// for test
// var abi = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];

// for real abi
var abi=[
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
        "constant": false,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "addAuthorized",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "deleteAuthorized",
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
                "name": "newOwner",
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
        "inputs": [
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_accountNumber",
                "type": "bytes32"
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
                "name": "authorizerIndex",
                "type": "uint256"
            }
        ],
        "name": "getAuthorizer",
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
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "isAuthorized",
        "outputs": [
            {
                "name": "",
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
var simpleStorageContract; // 컨트랙트 변수
var contractInstance;
var user_address; // 메타마스크에 로그인한 유저의 ethereum address

// 메타마스크 불러오기 확인
// 브라우저에서 로딩이 다 되면 실행된다.
var btn_login = document.getElementById('btn_login');
btn_login.addEventListener('click', function() {
    // 메타마스크 또는 미스트가 설치되어 있는지 확인한다.
    if (typeof web3 !== 'undefined') {





        // 만약, 메타마스크의 계정을 변경한 경우 처리해줘야할 로직. 1초에 한번씩 아이디를 체크하는 것 같음.
        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#dizzy-all-async---think-of-metamask-as-a-light-client
/*        var account = web3.eth.accounts[0];
        var accountInterval = setInterval(function() {
            if (web3.eth.accounts[0] !== account) {
                account = web3.eth.accounts[0];
                updateInterface();
            }
        }, 100);*/






        // 메타마스크가 설치 되어 있는 경우
        // web3가 메타마스크 등에 의해 이미 브라우저에 올라와 있다면 web3.currentProvider를 이용해 새 web3 인스턴스를 만듬.
        window.web3 = new Web3(web3.currentProvider); // 현재 브라우저에서 연결된 네트워크로 연

        // 메타마스크가 어떤 네트워크에 속해있는지 체크
        web3.version.getNetwork((err, netId) => {
            switch (netId) {
                case "1":
                    console.log('This is mainnet')
                    break

                case "2":
                    console.log('This is the deprecated Morden test network.')
                    break

                case "3":
                    console.log('This is the ropsten test network.')
                    break

                case "4":
                    console.log('This is the Rinkeby test network.')
                    break

                case "42":
                    console.log('This is the Kovan test network.')
                    break

                default:
                    console.log('This is an unknown network.')

            }
        });

        // let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io')); // ropsten 네트워크로 연결

        console.log("metamask 설치가 되어있습니다.");

        user_address = web3.eth.accounts[0];
        console.log("user address : " + user_address);


        // 메타마스크는 설치되어 있는데 로그인 하지 않은 경우
        if(isNaN(user_address)) {
            toast("You have to login metamask.");
        }

    }

    else {
        // todo 메타마스크가 설치 되어 있지 않은 경우 (예외처리 해주기)
        console.log("metamask 설치가 되어있지 않습니다");
    }

    // 메인 함수 시작 (web3를 통해서 스마트 컨트랙트에 접근 가능해짐)
    startApp();

});

/**
 * @dev Function to make connection of metamask.
 */
function startApp() {

    // web3 이용해서 스마트 컨트랙트 접근하기
    simpleStorageContract = web3.eth.contract(abi);
    contractInstance = simpleStorageContract.at(contractAddress);

    // getCoinbase 함수를 이용해서 메타마스크 계좌 정보 가져오기
    // 도큐먼트 참고 주소 https://web3js.readthedocs.io/en/1.0/web3-eth.html?highlight=balance#getbalance
    web3.eth.getCoinbase(function(e, address) {
        web3.eth.getBalance(address, function(e, balances) {

            document.getElementById('accountAddr2').innerHTML = "<input type='button' id='account_address' onclick='copy(this.value)' value='" + address + "' readonly />";

            // web3.fromWei() 메소드는 wei 숫자를 다른 단위로 변환하기 위해 사용 (wei -> ether)
            // web3.toWei() 메소드는 다른 단위를 wei 단위로 변환하기 위해 사 (ether -> wei)
            document.getElementById('accountAddr1').innerHTML += "<span id='account_balances'>" + Number(web3.fromWei(Number(balances), 'ether')).toFixed(2) + "&nbsp;ETH</span>";
        });

    });
}


/**
 * @dev EventListener to send ethereum & token
 * @input receiver address
 * @input eth amount
 * @input gas limit
 */
var btn_sendtransaction = document.getElementById('btn_sendtransaction');
btn_sendtransaction.addEventListener('click', function() {

    if(isNaN(user_address)) {
        toast("You need to metamask login.");
    }

    var input_ethamount = document.getElementById("input_ethamount").value; // 유저가 입력한 보내고자 하는 이더리움 수량
    var input_receiveraddress = document.getElementById("input_receiveraddress").value; // 이더리움을 보내고자 하는 상대방 주소
    var input_ethamount_float = parseFloat(input_ethamount); // parseFloat() 내장함수

    console.log("보내고자 하는 이더리움 수량 : "+input_ethamount); // 보내고자 하는 이더리움 수량 체크

    // var receiver_address = "0x0466965159Aa9972e3b3f236CD2Df93F26f629C9";

    // 만약, 보내고자 하는 수량을 입력하지 않은 경우 입력 유도
    if(isNaN(input_ethamount_float)) {
        toast("Set the amount you want to send.");
        return;
    }

        // 이더리움을 보내는 함수
        web3.eth.sendTransaction({
            to: input_receiveraddress, // 받는 사람의 주소
            from: user_address, // 보내는 사람의 주소 (메타마스크 로그인 주소)
            value: web3.toWei(input_ethamount_float, 'ether') // 보내고자 하는 수량
        }, function (err, transactionHash) {
            // 오류 발생시
            if (err) {
                return toast('Metamask error!');
            }

            console.log(transactionHash);

        });
});

/**
 * @dev EventListener to register user info through blockchain network
 * @smartcontract registerAbleUser
 * @input receiver address
 * @input eth amount
 * @input gas limit
 */
var btn_register_user = document.getElementById('btn_register_user');
btn_register_user.addEventListener('click', function() {

    if(isNaN(user_address)) {
        toast("You need to metamask login.");
    }

    var input_username = document.getElementById("input_username").value;
    console.log("가입하고자 하는 닉네임: "+input_username);

    // 버전 확인 함수
    var version = web3.version.api;
    console.log(version); // "0.20.3"

    // 1. An ASCII string to be converted to HEX
    // 2. The number of bytes the returned HEX string should have.
    // var bytes32_nickname = web3.fromAscii(input_nickname, 32);
    var bytes32_username = web3.fromAscii("1111", 32);
    console.log("fromAscii (input_username) : " + bytes32_username);

    // 1111
    // 0x31313131

    // 2222
    // 0x32323232

    // ethereum
    // 0x657468657265756d000000000000000000000000000000000000000000000000


    contractInstance.registerAbleUser("0x32323232", function (err, result) {


        // if there is an error => return;
        if(err) {
            console.log("registerAbleUser error:" + err);
            return;
        };

        // check result value
        if(typeof result !== 'undefined') {

            console.log("registerAbleUser result : " + result);

        }
    });


    // smartcontract isAbleUser() 함수를 통해서 ableUser인지 아닌지 체크
/*    contractInstance.isAbleUser.call(user_address, function (err, result) {

        if(err) {
            console.log("err : " + err);
            return;
        };

            console.log("result : " + result);

            // ableUser인 경우
            if(result==true) {
                // todo 계좌 페이지 or 메인 페이지 띄우기

            }

            // ableUser가 아닌 경우
            else if(result==false) {

                // todo modal로 회원가입 화면 띄워주기
                // 닉네임 입력받고 해당 닉네임으로 회원가입 진행하기
                // contractInstance.registerAbleUser(bytes32_nickname, function (err, result) {

                contractInstance.registerAbleUser("0x31313131",user_address, function (err, result) {
                    console.log("registerAbleUser err : " + err);
                    console.log("registerAbleUser result : " + result);
                });
            }

    });*/



});

/**
 * @dev Function to open free ableAccount
 * @param _accountNumber the bytes32 to add new ableAccount.
 * @param _password the bytes32 to set password.
 * @return boolean flag if open success.
 */
var btn_register_account = document.getElementById('btn_register_account');
btn_register_account.addEventListener('click', function () {
    if(isNaN(user_address)) {
        toast("You need to metamask login.");
        return;
    }

    var input_account_number = document.getElementById("input_account_number").value; // 유저가 입력한 보내고자 하는 이더리움 수량
    var input_account_password = document.getElementById("input_account_password").value; // 이더리움을 보내고자 하는 상대방 주소

    var bytes32_account_number = web3.fromAscii(input_account_number, 32);
    console.log("fromAscii (input_account_number) : " + bytes32_account_number);


    var bytes32_account_password = web3.fromAscii(input_account_password, 32);
    console.log("fromAscii (input_account_password) : " + bytes32_account_password);

   contractInstance.openAbleAccount(bytes32_account_number, bytes32_account_password, function (err, result) {
       console.log("openAbleAccount err : " + err);
       console.log("openAbleAccount result : " + result);

       contractInstance.AbleAccountOpened_Successful.watch(function (err, result) {
          if(err) {
              console.log("event watch : " + err)
              return;
          }

           console.log("event result : " + result)

           document.getElementById('accountAddr2').innerHTML = "<input type='button' id='account_address' onclick='copy(this.value)' value='" + address + "' readonly />";



       });

/*       web3.eth.getTransaction(result, function (err, result) {
           console.log("openAbleAccount err : " + err);
           console.log("openAbleAccount result : " + result);
       });*/
   });




/*    contractInstance.deployed().then(function(i) {i.openAbleAccount(bytes32_account_number, bytes32_account_password).then(function(f) {console.log("depoly : " + f)})});*/


});

/**
 * @dev Function to open free ableAccount
 * @param _accountNumber the bytes32 to add new ableAccount.
 * @param _password the bytes32 to set password.
 * @return boolean flag if open success.
 */
var btn_check_account = document.getElementById('btn_check_account');
btn_check_account.addEventListener('click', function () {

    contractInstance.getAbleAccount.call("0x3535353500000000000000000000000000000000000000000000000000000000", function (err, result) {
        console.log("getAbleAccount err : " + err);
        console.log("getAbleAccount result : " + result);

        result.
    });

});

/**
 * @dev Function to make toast message
 * making easier to see the err message
 */
var $toast;
function toast(message) {

    $(".toast").remove();

    $toast = $('<div class="toast"><h3>' + message + '</h3></div>');

    $toast.css({
        display: 'block',
        background: '#fff',
        opacity: 0.90,
        position: 'fixed',
        padding: '7px',
        'text-align': 'center',
        width: '270px',
        left: ($(window).width() - 284) / 2,
        top: $(window).height() / 2 - 20
    });

    var removeToast = function(){
        $(".toast").remove();
    };

    $toast.click(removeToast);

    $('body').append($toast);

    setInterval(removeToast, 2000);
}
