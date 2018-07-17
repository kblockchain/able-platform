// 스마트 컨트랙트 주소
// etherscan: https://rinkeby.etherscan.io/address/0x4081d2636ffe95c326d849eb837d8e6a7111b12d#code
var contractAddress = '0x4081D2636FFE95c326D849eB837D8E6a7111b12D'; // real contract address

// abi => 블록체인 컨트랙트에 올려져있는 비즈니스 로직 코드에 액세스 하기 위한 인터페이스 (추후 변경 예정)
var abi = [{"constant":false,"inputs":[{"name":"_accountNumber","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ableDollarAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"bytes32"},{"name":"_to","type":"bytes32"},{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userName","type":"bytes32"}],"name":"registerAbleUser","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_accountNumber","type":"bytes32"},{"name":"_password","type":"bytes32"}],"name":"openAbleAccount","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"}],"name":"getAbleUserAbleAccountCount","outputs":[{"name":"ableAccountCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"},{"name":"row","type":"uint256"}],"name":"getAbleUserAbleAccountAtIndex","outputs":[{"name":"_accountNumber","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_accountNumber","type":"bytes32"}],"name":"getAbleAccount","outputs":[{"name":"_userAddress_","type":"address"},{"name":"_userName_","type":"bytes32"},{"name":"_accountNumber_","type":"bytes32"},{"name":"_accountInfo_","type":"string"},{"name":"_accountType_","type":"string"},{"name":"_numToken_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_accountNumber","type":"bytes32"},{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAbleUserCount","outputs":[{"name":"ableUserCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_accountNumber","type":"bytes32"}],"name":"isAbleAccount","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_accountNumber","type":"bytes32"},{"name":"_token","type":"address"},{"name":"_amount","type":"uint256"}],"name":"depositToken","outputs":[{"name":"isIndeed","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getAbleAccountCount","outputs":[{"name":"ableAccountCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_accountNumber","type":"bytes32"},{"name":"row","type":"uint256"}],"name":"getAbleAccountTokenBalance","outputs":[{"name":"_accountNumber_","type":"bytes32"},{"name":"_tokenName_","type":"address"},{"name":"_balance_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"}],"name":"isAbleUser","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_accountNumber","type":"bytes32"}],"name":"deposit","outputs":[{"name":"isIndeed","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"row","type":"uint256"}],"name":"getAbleUserAtIndex","outputs":[{"name":"_userAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_accountNumber","type":"bytes32"},{"name":"_token","type":"address"}],"name":"balanceOf","outputs":[{"name":"_token_","type":"address"},{"name":"_balance_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ableAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"userAddress","type":"address"},{"indexed":false,"name":"userName","type":"bytes32"}],"name":"AbleUserRegistered_Successful","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"userAddress","type":"address"},{"indexed":false,"name":"accountNumber","type":"bytes32"},{"indexed":false,"name":"accountType","type":"string"}],"name":"AbleAccountOpened_Successful","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"userAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"AbleDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"userAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"AbleWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"from","type":"bytes32"},{"indexed":false,"name":"to","type":"bytes32"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"AbleTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];

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

    if (user_name == '') {
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
    $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");
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
                    window.location.href = '/account_manage'; //실패했는데 왜 계좌 관리 페이지로 이동시키는지???
                }

                // todo 계좌가 생성될 때 까지는 사용자에게 계좌를 생성 중임을 알려야한다.

                else { // success, get info
                    // 유저
                    var formData = $("#able_regist_form").serialize();

                    $.ajax({ // 새로운 유저 정보 DB로 입력
                        method: "POST",
                        url: "/create_new_account",
                        data: formData
                        , success: function (res) {
                            console.log(res);

                            if (res.result == 200) {
                                console.log(res.message);
                                save_session(user_address);
                                $('.loading').show();
                                $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");
                                regist_ableuser(); // 스마트 컨트랙트 등록 모달

                            } else if (res.result == 204) {
                                console.log(res.message);
                            }

                        }

                    });
                    //todo 세션 추가
                    console.log("registerAbleUser result userName: " + result.args.userName);
                    window.location.href = '/account_manage';
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
            alert("계좌 생성에 실패했습니다.");
            $('.loading').hide();
            console.log("openAbleAccount err : " + err);
            return;
        }

        $('.loading').show();
        $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");

        // event listener
        // check AbleOpenAccount success or fail
        contractInstance.AbleAccountOpened_Successful().watch((err, result) => {

            // todo 클라이언트 단에서 이미 존재하는 계좌번호 인지 아닌지 미리 체크하게 해주기 (만약, 중복일 경우 계좌 생성 버튼 활성화 막기)
            // if openaccount fail
            if (err) {
                alert("계좌 생성에 실패했습니다.");
                $('.loading').hide();
                document.getElementById('output_check_ableaccount_status').innerHTML = "계좌 생성 실패";

            }

            // todo 계좌가 생성될 때 까지는 사용자에게 계좌를 생성 중임을 알려야한다.
            // success, get info
            else {

                user_Address = result.args.userAddress;
                user_accountNumber = result.args.accountNumber;
                user_accountType = result.args.accountType;

                var ascii_account = web3.toAscii(user_accountNumber);
                console.log("account !!!!!!!!!! " + ascii_account);

                console.log("openAbleAccount result user_accountNumber: " + user_accountNumber);
                console.log("openAbleAccount result user_Address: " + user_Address);
                console.log("openAbleAccount result input_account_password: " + input_account_password);
                console.log("openAbleAccount result user_accountType: " + user_accountType);

                $.ajax({
                    method: "POST",
                    url: "/open_new_account",
                    dataType: "json",
                    data: {
                        "user_accountNumber": ascii_account,
                        "user_Address": user_Address,
                        "ableAccount_password": input_account_password,
                        "user_accountType": user_accountType
                    },
                    success: function (res) {

                        console.log(res);

                        if (res.result == 200) {
                            console.log(res.message);
                            $(location).attr('href', '/account_manage');

                        } else if (res.result == 204) {
                            alert("계좌 생성에 실패했습니다.");
                            $('.loading').hide();
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

/**
 * 간편송금용 어카운트 불러오기
 */

function get_accounts_for_send() { // 간편송금 페이지 진입시 세션 체크를 끝내고 이 함수를 실행
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
                    }
                });


            }

            setTimeout(function () { // 현재 선택된 값으로 계좌 상세정보를 호출
                get_account_detail($('#select_account').val());
            }, 1000);
        }
    });

}


/**
 * 간편송금 계좌 상세정보 불러오기 (현재 선택값)
 */
function get_account_detail(account_number) {
    contractInstance.getAbleAccount.call(account_number, function (err, res) { // 계좌 정보를 파라메터로 호출
        if (err) {
            console.log("err : " + err);
            return;
        }

        var account_info = res.toString().split(','); // 스트링으로 반환 받은 값을 배열로 저장

        $('#modal_nickname').text(web3.toAscii(account_info[1]));
        console.log("user account name : " + web3.toAscii(account_info[1]));
        //console.log("token_list_length : " + account_info[4]);
        //nick_list.push(web3.toAscii(account_info[1]));

        $('#send_menu_user_address').text(user_address.substring(0, 8) + '.....' + user_address.substring(34, 42));
        $('#send_menu_account_number').text(account_info[1].substring(0, 8) + '.....' + account_info[1].substring(58, 66));
        $('#send_menu_account_type').text(account_info[3]);
        $('#input_my_account_number').val(account_info[1]);// 모달창과 우측 위젯에 필요정보를 넣어준다


        $('#send_menu_token_list').html("");
        console.log(" length : "+account_info[4]);
        for (j = 0; j < account_info[4]; j++) { // 토큰 갯수만큼 토큰 정보를 불러온다
            contractInstance.getAbleAccountTokenBalance.call(account_number, j, function (err, res) {
                if (err) {
                    console.log("err : " + err);
                    return;
                }
                var coin_icon = "";
                var token_info = res.toString().split(',');

                if(token_info[1] == '0x0000000000000000000000000000000000000000'){ // 토큰 거래주소에 따라 각각 구분해준다.
                    coin_icon = 'ETH';
                }

                else if(token_info[1] == '0x295b3f39d7dacbc58329112064a14186f9fac786') {
                    coin_icon = 'ABLER';
                }

                else if(token_info[1] == '0x8c2b240b0b89aa7ff9f767ad9e02afff823fed2f'){
                    coin_icon = 'ABLDR';
                }


                html = "<span class=\"my-info-label\" >"+coin_icon+"</spans><br>\n" +
                    "    <span class=\"my-info-content\" >"+token_info[2]+"</span><br><br>"; // 토큰 정보를 각각 넣어준다

                $('#send_menu_token_list').append(html);


            });
        }


    });

}

/**
 * 간편송금 실제 송금 실행
 */

function transfer_token_execute(){

    $('.loading').show(); // 펜딩을 걸어준다.
    $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");

    var _from   = $('#input_my_account_number').val();
    //var _to     = $('#input_account_number').val();
    console.log($('#input_account_nickname').val())
    var _to     = web3.fromAscii($('#input_account_nickname').val(),32); // 송금에 필요한 입력된 값들을 변수로 받아온다

    var _token  = $('#select_coin').val();
    //var _token  = '0xB5b4b627ad1C2C78440607E9Db15c64DB7Dc6dc5';
    var _amount = $('#input_num_token').val();

    console.log(_from);
    console.log(_to);
    console.log(_token);
    console.log(_amount);

    contractInstance.transferFrom(_from, _to, _token, _amount, function (err, res) { // 송금실행
        if (err) {
            console.log("err : " + err);
            return;
        }

        contractInstance.AbleTransfer().watch((err, res) => { // 송금이 완료되면 리턴값을 받아 완료되었다고 알려준다


            if (err) {
                console.log("err : " + err);
                return;
            }
            else{
                alert('완료되었습니다.');
                $(location).attr('href', '/send');
            }

        });



        });

}


/**
 * 계좌관리 용 어카운트 불러오기
 */
/**************************************************************************************************************************************/
var nick_list = new Array();
var token_list = new Array();

async function get_accounts() {

    var html = "";

    simpleStorageContract = web3.eth.contract(abi);
    contractInstance = simpleStorageContract.at(contractAddress);

    console.log("user_address : " + user_address);

    // 계좌 갯수를 가져온다
    await contractInstance.getAbleUserAbleAccountCount.call(user_address, async function (err, res) {
        if (err) {
            console.log("err : " + err);
            return;
        }
        console.log("result : " + res);

        //계좌가 있다면
        if (res > 0) {
            //계좌 갯수만큼 계좌 넘버를 가져온다
             for (let i = 0; i < res; i++) {
                 var tokens_html = "";
                 (function(cntr2) {
                    contractInstance.getAbleUserAbleAccountAtIndex.call(user_address, i, async function (err, res) {
                         console.log(cntr2);
                        if (res != null) {
                            //계좌 넘버로 계좌 인포를 가져온다
                            var account_number = res;
                            await contractInstance.getAbleAccount.call(account_number, async function (err, res) {

                                var account_info = res.toString().split(',');

                                console.log("user account name : " + web3.toAscii(account_info[1]));
                                console.log("user account name : " + account_info[1]);
                                console.log("token_list_length : " + account_info[4]);
                                nick_list.push(web3.toAscii(account_info[1])); // 닉네임 리스트에 넣는다. 닉베임은 계좌리스트를 만들때 필요한데 그 다음 과정인 상세정보에서 받아오기 때문에 전역변수에 넣어두고 후에 호출한다.


                                var sub_token_list = new Array();
                                for (let j = 0; j < account_info[4]; j++) { // 계좌가 보유하고 있는 토큰 리스트 수 만큼 토큰 상세정보를 불러온다.
                                    (function(cntr) {
                                    contractInstance.getAbleAccountTokenBalance.call(account_number, j, async function (err, res) {
                                            //tokens_html += make_token_html(res,cntr);
                                        await sub_token_list.push(res); // 토큰 리스트에 토큰 정보를 담고

                                        //console.log("token_info : "+j+" => " + res);
                                    });
                                    })(j);
                                }
                                // var m = new Map();
                                // console.dir(sub_token_list);
                                // m.set(i,sub_token_list);
                                token_list.push(sub_token_list); // 전역변수 토큰 리스트에 계좌당 토큰 리스트를 담는다.
                            });
                        }
                    });
                     html += make_html(i , tokens_html);
                 })(i);

            }

            $('#account_list').html(html);

            setTimeout(function(){
                get_nicklist();
            },3000);

            setTimeout(function(){
                get_tokenlist(); // 작업이 끝나면 닉네임과 토큰리스트를 불러와 화면에 넣어준다.
            },3000);

        } else {
            //todo 계좌가 없을 경우에 할것들 나중에 생각
        }
    });

}


/**
 * 계좌관리 계좌리스트 화면 만들기
 */

function make_html(i,tokens_html){
    return "<div class=\"box-typical box-typical-padding my-account\" >\n" +
        "        <div style=\"margin-left: 10px;\">\n" +
        "            <div class=\"row\">\n" +
        "                <div class=\"col-sm-3\"><img style=\" margin-top: 10px; height: 25px;\"\n" +
        "                                           src=\"../img/logo_able_black_horizontal.png\"></div>\n" +
        "                <div class=\"col-sm-6\"></div>\n" +
        "                <div class=\"col-sm-3\" style=\"color:#919fa9; font-size: 13px; text-align: right\">\n" +
        "                    Registration Date<br>" + "수정되어야할부분" + "\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <br><br>\n" +
        "            <div class=\"row\">\n" +
        "                <div style=\"font-size: 14px\" class=\"col-sm-12\">\n" +
        "                    <label class=\"form-label input\" >ABLE User Address</label>\n" +
        "                    <div style=\"margin-top: 5px\">\n" +
        "                        \"" + user_address + "\" <a class=\"btn btn-nav btn-rounded btn-inline btn-primary-outline my-account-copy-clipboard\" href=\"#\" >\n" +
        "                        copy</a>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <br>\n" +
        "            <div class=\"row\">\n" +
        "                <div style=\"font-size: 14px\" class=\"col-sm-12\">\n" +
        "                    <label class=\"form-label input\" >Address Nickname</label>\n" +
        "                    <div id=\"account_nickname" + i + "\" style=\"margin-top: 5px\">\n" +
        "                         " + "<a\n" +
        "                            class=\"btn btn-nav btn-rounded btn-inline btn-primary-outline my-account-copy-clipboard\" href=\"#\" >\n" +
        "                        copy</a>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div  class=\"col-sm-12 contour\">\n" +
        "                    <br>\n" +
        "                    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Holding Coin - - - - - - - - - - -\n" +
        "                    - - - - - - - - - - - - - - - - - - - - - -\n" +
        "                    <br><br><br>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <div id=\"token_list" + i + "\" class=\"row\">\n" + tokens_html +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>";
}

/**
 * 계좌관리 토큰리스트 화면 만들기
 */

function make_token_html(res){
    console.log("make_token_html : "+res);

    var coin_icon = '';
    var coin_src = '';
    var amount = 0;
    if(res[1] == '0x0000000000000000000000000000000000000000'){ // 토큰 정보마다 코인을 구별해줌
        coin_icon = 'ETH';
        coin_src = '../img/side_logo_bitcoin_on.png';
        amount = web3.fromWei(res[2]);
    }else if(res[1] == '0xb5b4b627ad1c2c78440607e9db15c64db7dc6dc5') {
        coin_icon = 'ABLER';
        coin_src = '../img/side_logo_able_on.png';
        amount = res[2];
    }else if(res[1] == '0x1685f3715c4cec05cce6c462f8cc5a6ddaa92fd5'){
        coin_icon = 'ABLDR';
        coin_src = '../img/side_logo_abledollar_on.png';
        amount = res[2];
    }

    return "<div class=\"col-sm-6\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-3\">\n" +
    "                            <div class=\"card coinmark\">\n" +
    "                                <div  class=\"coinmark-sub\">\n" +
    "                                    <img class=\"coin-image\"\n" +
    "                                         src=\""+coin_src+"\">\n" +
    "                                    <p>"+coin_icon+"\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-9\" style=\"padding-top: 20px\">\n" +
    "                            " + amount + " "+coin_icon+"\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n";

}


/**
 * 계좌관리 계좌 닉네임 리스트 설정하기
 */

function get_nicklist() {
    console.log("nick_list : " + nick_list.length);
    for (z = 0; z < nick_list.length; z++) {
        console.log(nick_list[z])
        $('#account_nickname' + z).text(nick_list[z]);
    }
}

/**
 * 계좌관리 토큰 리스트 불러오기
 */

function get_tokenlist() {
    console.log("token_list : " + token_list.length);
    for (z = 0; z < token_list.length; z++) {
        var token_html = "";
        var sub_token_list = token_list[z];
        console.dir(sub_token_list)
        for (item of sub_token_list){
            token_html += make_token_html(item);

        }
        $('#token_list' + z).html(token_html);
    }

}

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
function save_session(user_address) {

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
function check_session() {
    $.ajax({
        method: "POST",
        url: "/check_session",
        dataType: "json",
        success: function (res) {
            // console.log("check_session : " + JSON.stringify(res));
            if (res.result == 200) {
                user_address = res.user_address;
                $('#btn_login').html('<span>' + user_address.substring(0, 8) + '.....' + user_address.substring(34, 42) + '</span>');
                $('#btn_login').addClass('site-header-address');


                var current_page = $(location).attr('href');

                if (current_page.indexOf('account_manage') != -1) {
                    get_accounts();
                } else if (current_page.indexOf('send') != -1) {
                    get_accounts_for_send();
                }


            } else {
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
