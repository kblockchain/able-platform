// 스마트 컨트랙트 주소
var contractAddress = '0xDD601d27b61100b53f64FB54E3612a87a46AedF5'; // real contract address

// abi => 블록체인 컨트랙트에 올려져있는 비즈니스 로직 코드에 액세스 하기 위한 인터페이스 (추후 변경 예정)
var abi = [
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
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "fallback"
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
var user_accountNumber; // 에이블 간편 계좌 번호

$(function () {


    // login button
    $("#btn_login").click(function () {
        metakmask_check();
    });

    // register able user button in modal
    $("#btn_user_register").click(function () {
        user_register();
    });

    // add account
    $("#btn_add_account").click(function () {
        open_able_account();
    });

    // session delete
    $("#btn_logout").click(function () {
        session_logout();
    });

});

/**************************************************************************************************************************************/

// 메타마스크 불러오기 확인
// 브라우저에서 로딩이 다 되면 실행된다.
function metakmask_check() {

    // setInterval() 함수 - 일정 시간 간격으로 함수 반복 실행
    // 3초에 한번씩 메타마스크 네트워크 및 아이디 변경 여부 체크
    // var metamask = setInterval(function () {

        if (typeof web3 !== 'undefined') {

            // 만약, 메타마스크의 계정을 변경하는 경우 1초에 한번씩 아이디를 체크하는 것 같음.

            // 메타마스크가 설치 되어 있는 경우
            // web3가 메타마스크 등에 의해 이미 브라우저에 올라와 있다면 web3.currentProvider를 이용해 새 web3 인스턴스를 만듬.
            // let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io')); // ropsten 네트워크로 연결
            window.web3 = new Web3(web3.currentProvider); // 현재 브라우저에서 연결된 네트워크로 연결
            user_address = web3.eth.accounts[0];
            // console.log("user address : " + user_address);

            $("#metamask_user_address").val(user_address);

            // 메타마스크는 설치되어 있는데 로그인 하지 않은 경우
            if (isNaN(user_address)) {
                toast("You have to login metamask.");

                return;
            }

            // todo 여기 로직 체크 필요. 로그인 버튼을 계속 클릭하게 할 것인지, 다른 네트워크 일 경우 버튼 이벤트 안먹히게 할 것인지.
            // 메타마스크가 어떤 네트워크에 속해있는지 체크 후, Rinkeby가 아닐 경우 로그인 막음.
            web3.version.getNetwork((err, netId) => {

                if (netId == "1") {
                    // console.log('This is mainnet')

                    // clearInterval() - 실행되고 있는 interval을 중지
                    openErrorModal('this is mainNet.  Connect to Rinkeby please.');
                    // clearInterval(metamask)

                    return;
                }

                else if (netId == "2") {
                    // console.log('This is the deprecated Modern test network.')
                    openErrorModal('This is the deprecated Modern test network.  Connect to Rinkeby please.');
                    // clearInterval(metamask)
                    return;
                }

                else if (netId == "3") {
                    // console.log('This is the Ropsten test network.')
                    openErrorModal('This is the Ropsten test network.  Connect to Rinkeby please.');
                    // clearInterval(metamask)
                    return;
                }

                else if (netId == "4") {
                    // console.log('This is the Rinkeby test network.')
                    // 메인 함수 시작 (web3를 통해서 스마트 컨트랙트에 접근 가능해짐)
                    // startApp();
                    startApp()
                }

                else if (netId == "42") {
                    // console.log('This is the Kovan test network.')
                    openErrorModal('This is an unknown network.  Connect to Rinkeby please.');
                    // clearInterval(metamask)
                    return;
                }

                else {
                    // console.log('This is an unknown network.')
                    openErrorModal('This is an unknown network.  Connect to Rinkeby please.');
                    // clearInterval(metamask)
                    return;
                }

            });
        } else {
            openErrorModal_not_login();
            // clearInterval(metamask);

        }
    // },3000);
}


/**
 * @dev Function to make connection of metamask.
 */
function startApp() {
    // web3 이용해서 스마트 컨트랙트 접근하기
    simpleStorageContract = web3.eth.contract(abi);
    contractInstance = simpleStorageContract.at(contractAddress);

    // 만약, 메타마스크의 아이디를 변경해준 경우에도 isAbleUser()인지 아닌지 체크 필요 or 데이터 베이스 거치는 작업 필요.
    is_ableuser();
}

/**************************************************************************************************************************************/



/**
 * @dev Function to open modal error message.
 * @param masage about error.
 */
function openErrorModal(err) {

    $('#metamask_error_message').text(err);
    $('#errorModal').modal('show').css({
        'margin-top': function () {
            return 200; //($(this).height()/2) // 작동안함;;
        }
    });
}

/**
 * @dev Function to open modal error message (not logined).
 * @param masage about error.
 */
function openErrorModal_not_login() {

    $('#errorModal_not_logined').modal('show').css({
        'margin-top': function () {
            return 200; //($(this).height()/2) // 작동안함;;
        }
    });
}



/**
 * @dev Function to register ableUser
 * @param _userName the bytes32 to insert userName.
 * @return boolean flag if register success.
 */
function user_register() {

    var user_name = $('#input_able_user_name').val();

    if(user_name == '') {
        alert('이름을 입력해주세요');
        return;
    }

    // console.log("가입하고자 하는 닉네임: " + user_name);

    // 1. An ASCII string to be converted to HEX
    // 2. The number of bytes the returned HEX string should have.
    // var bytes32_nickname = web3.fromAscii(input_nickname, 32);
    var bytes32_username = web3.fromAscii(user_name, 32);
    // console.log("fromAscii (input_username) : " + bytes32_username);

    $('.loading').show();
    $('.loading p').css('top',(($(window).height()-$("#wrap").outerHeight())/2+$(window).scrollTop())+"px");
    // registerAbleUser Function in solidity
    contractInstance.registerAbleUser(bytes32_username, function (err, result) {

        // if there is an error => return;
        if (err) {
            console.log("registerAbleUser error:" + err);
            $('.loading').hide();
            return;
        }

        // check result value
        if (typeof result !== 'undefined') {
            console.log("registerAbleUser result : " + result);
            contractInstance.AbleUserRegistered_Successful().watch((err, result) => {

                // todo 클라이언트 단에서 이미 존재하는 계좌번호 인지 아닌지 미리 체크하게 해주기 (만약, 중복일 경우 계좌 생성 버튼 활성화 막기)
                // if openaccount fail
                if (err) {
                     console.log("registerAbleUser error:" + err);
                    window.location.href='/account_manage';
                }

                 // todo 계좌가 생성될 때 까지는 사용자에게 계좌를 생성 중임을 알려야한다.

                else { // success, get info
                    // 유저
                    var formData = $("#able_regist_form").serialize();

                    $.ajax({
                        method: "POST",
                        url: "/create_new_account",
                        data: formData
                        ,success: function (res) {
                            console.log(res);

                            if(res.result == 200) {
                                console.log(res.message);
                                save_session(user_address);
                                $('.loading').show();
                                $('.loading p').css('top',(($(window).height()-$("#wrap").outerHeight())/2+$(window).scrollTop())+"px");
                                regist_ableuser();

                            } else if(res.result == 204) {
                                console.log(res.message);
                            }

                        }

                    });
                    //todo 세션 추가
                    console.log("registerAbleUser result userName: " + result.args.userName);
                    window.location.href='/account_manage';
                }


            });
        }
    });



}

/**************************************************************************************************************************************/


/**************************************************************************************************************************************/

/**
 * @dev Function to open free ableAccount
 * @param _accountNumber the bytes32 to add new ableAccount.
 * @param _password the bytes32 to set password.
 * @return boolean flag if open success.
 */
function is_ableuser() {
    // smartcontract isAbleUser() 함수를 통해서 ableUser인지 아닌지 체크
    contractInstance.isAbleUser.call(user_address, function (err, result) {

        if (err) {
            console.log("err : " + err);
            return;
        }
        ;

        console.log("result : " + result);

        // ableUser인 경우
        if (result == true) {
            // todo 계좌 페이지 or 메인 페이지 띄우기

            console.log("able 유저입니다.");
            //document.getElementById('output_check_ableuser').innerHTML ="able 유저 입니다.";


            // session data send

            $(function () {

                $.ajax({
                    method: "POST",
                    url: "/save_session",
                    dataType: "json",
                    data: {"user_address": user_address},
                    success: function (res) {
                        console.log("ajx loggin.check : " + JSON.stringify(res));
                        $(location).attr('href', '/account_manage');

                        console.log("able jquery");

                        $('#btn_login').html('<span>' + user_address.substring(0, 8) + '.....' + user_address.substring(34, 42) + '</span>');
                        $('#btn_login').addClass('site-header-address');


                    }

                });

            });


        }

        // ableUser가 아닌 경우
        else if (result == false) {

            // console.log("able 유저가 아닙니다.");

            //document.getElementById('output_check_ableuser').innerHTML ="able 유저가 아닙니다.";

            //  modal로 회원가입 모달 띄워주기
            // 닉네임 입력받고 해당 닉네임으로 회원가입 진행하기
            open_regist_modal();

        }

    });

}


    /**************************************************************************************************************************************/




    /**************************************************************************************************************************************/

    /**
     * @dev Function to open free ableAccount
     * @param _accountNumber the bytes32 to add new ableAccount.
     * @param _password the bytes32 to set password.
     * @return boolean flag if open success.
     * @comments only ableuser can open account.
     */
    function open_able_account() {

        simpleStorageContract = web3.eth.contract(abi);
        contractInstance = simpleStorageContract.at(contractAddress);

        var input_account_number = document.getElementById("input_account_number").value; // 유저가 입력한 보내고자 하는 이더리움 수량
        var input_account_password = document.getElementById("input_account_password").value; // 이더리움을 보내고자 하는 상대방 주소

        var bytes32_account_number = web3.fromAscii(input_account_number, 32);
        console.log("fromAscii (input_account_number) : " + bytes32_account_number);

        var bytes32_account_password = web3.fromAscii(input_account_password, 32);
        console.log("fromAscii (input_account_password) : " + bytes32_account_password);

        contractInstance.openAbleAccount(bytes32_account_number, bytes32_account_password, function (err, result) {

            if (err) {
                console.log("openAbleAccount err : " + err);
                return
            }


            // event listener
            // check AbleOpenAccount success or fail
            contractInstance.AbleAccountOpened_Successful().watch((err, result) => {

                // todo 클라이언트 단에서 이미 존재하는 계좌번호 인지 아닌지 미리 체크하게 해주기 (만약, 중복일 경우 계좌 생성 버튼 활성화 막기)
                // if openaccount fail
                if (err) {
                    document.getElementById('output_check_ableaccount_status').innerHTML = "계좌 생성 실패";

                }

                // todo 계좌가 생성될 때 까지는 사용자에게 계좌를 생성 중임을 알려야한다.
                // success, get info
                else {

                    user_Address = result.args.userAddress;
                    user_accountNumber = result.args.accountNumber;
                    user_accountType = result.args.accountType;

                    var ascii_account = web3.toAscii(user_accountNumber);
                    // console.log("account !!!!!!!!!! " + ascii_account);



                    // console.log("openAbleAccount result user_accountNumber: " + user_accountNumber);
                    // console.log("openAbleAccount result user_Address: " + user_Address);
                    // console.log("openAbleAccount result input_account_password: " + input_account_password);
                    // console.log("openAbleAccount result user_accountType: " + user_accountType);

                    $.ajax({
                        method: "POST",
                        url: "/open_new_account",
                        dataType: "json",
                        data: {
                            "user_accountNumber": ascii_account,
                            "user_Address": user_Address,
                            "ableAccount_password":input_account_password,
                            "user_accountType": user_accountType
                        },
                        success: function (res) {

                            console.log(res);

                            if(res.result == 200) {
                                console.log(res.message);
                                $(location).attr('href', '/account_manage');

                            } else if(res.result == 204) {
                                console.log(res.message);
                            }
                        }
                    });
                }

            });
        });
    }


    /**************************************************************************************************************************************/

    /**
     * @dev Function to get ableAccount properties using _accountNumber
     * @param _accountNumber the bytes32 to get ableAccount properties.
     * @return address _userAddress_, bytes32 _accountNumber_, string _accountInfo_, string _accountType_, uint _numToken_.
     */
    $("#btn_check_account").click(function () {


        contractInstance.getAbleAccount.call("0x3839300000000000000000000000000000000000000000000000000000000000", function (err, result) {

            if (err) {

                console.log("getAbleAccount err : " + err);
                return;
            }

            else {

                var account_info = result.toString().split(',');

                console.log("account info user address: " + account_info[0]); // 0x0466965159aa9972e3b3f236cd2df93f26f629c9 (user address)
                document.getElementById('output_userAddress').innerHTML = account_info[0];

                console.log("account info account number: " + account_info[1]); // 0x3131363100000000000000000000000000000000000000000000000000000000 (account number)
                document.getElementById('output_accountNumber').innerHTML = account_info[1];

                console.log("account info accountInfo: " + account_info[2]); // Default free ABLE account (accountInfo)
                document.getElementById('output_accountInfo').innerHTML = account_info[2];

                console.log("account info accountType: " + account_info[3]); // Free (accountType)
                document.getElementById('output_accountType').innerHTML = account_info[3];

                console.log("account info numToken: " + account_info[4]); // 3 (numToken)
                document.getElementById('output_numToken').innerHTML = account_info[4];

            }


        })
    });

    /**************************************************************************************************************************************/

    /**
     * @dev EventListener to send ethereum & token
     * @input receiver address
     * @input eth amount
     * @input gas limit
     */
    $("#btn_sendtransaction").click(function () {

        if (isNaN(user_address)) {
            toast("You need to metamask login.");
        }

        var input_ethamount = document.getElementById("input_ethamount").value; // 유저가 입력한 보내고자 하는 이더리움 수량
        var input_receiveraddress = document.getElementById("input_receiveraddress").value; // 이더리움을 보내고자 하는 상대방 주소
        var input_ethamount_float = parseFloat(input_ethamount); // parseFloat() 내장함수

        console.log("보내고자 하는 이더리움 수량 : " + input_ethamount); // 보내고자 하는 이더리움 수량 체크

        // var receiver_address = "0x0466965159Aa9972e3b3f236CD2Df93F26f629C9";

        // 만약, 보내고자 하는 수량을 입력하지 않은 경우 입력 유도
        if (isNaN(input_ethamount_float)) {
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

    /**************************************************************************************************************************************/

    function open_regist_modal() {

        $(function () {
            $('#myModal').modal({
                show: true
            });
        });
    }

    function error() {
        $('#errorModal').modal('show  ').css({
            'margin-top': function () {
                return 200; //($(this).height()/2) // 작동안함;;
            }
        });

    }

    /**************************************************************************************************************************************/


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

        var removeToast = function () {
            $(".toast").remove();
        };

        $toast.click(removeToast);

        $('body').append($toast);

        //setInterval(removeToast, 2000);
    }


/****************************************
 * check session
 * **********************************************************************************************/
function save_session(user_address){

    $.ajax({
        method: "POST",
        url: "/save_session",
        dataType: "json",
        data: {"user_address": user_address},
        success: function (res) {
            console.log("ajx loggin.check : " + JSON.stringify(res));
            $(location).attr('href', '/account_manage');

            $('#btn_login').html('<span>' + user_address.substring(0, 8) + '.....' + user_address.substring(34, 42) + '</span>');
            $('#btn_login').addClass('site-header-address');


        }

    });
}
/****************************************
 * check session
 * **************************************/
function check_session(){
    $.ajax({
        method: "POST",
        url: "/check_session",
        dataType: "json",
        success: function (res) {
            // console.log("check_session : " + JSON.stringify(res));
            if(res.result == 200){
                var user_address = res.user_address;
                $('#btn_login').html('<span>'+user_address.substring(0,8)+ '.....' + user_address.substring(34,42) +'</span>');
                $('#btn_login').addClass('site-header-address');
            }else{
                // alert('Please make sure to connect metamask rinkeby network');
                alert('메타마스크 Rinkeby 네트워크로 로그인 후 접근해 주세요.');
                $(location).attr('href', '/');
            }
        }

    });
}

function session_logout() {

    console.log("session log out work1");

    $.ajax({
        method: "POST",
        url: "/session_delete",
        dataType: "json",
        success: function (res) {
            console.log("check_session : ㅁㄴㅇㅁㄴㅇ" + JSON.stringify(res));
            console.log("session delete complete");
            $(location).attr('href', '/');
        }

    });
}
