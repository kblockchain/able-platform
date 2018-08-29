/**
 * globar var
 */
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

});

/**
 * @dev Function to make connection of metamask.
 * 메타마스크 불러오기 확인
 * 브라우저에서 로딩이 다 되면 실행된다.
 */
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

            alert("You have to login metamask.");

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
                // 만약, 메타마스크의 아이디를 변경해준 경우에도 isAbleUser()인지 아닌지 체크 필요 or 데이터 베이스 거치는 작업 필요.
                is_ableuser();

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

    // 1. An ASCII string to be converted to HEX
    // 2. The number of bytes the returned HEX string should have.
    // var bytes32_nickname = web3.fromAscii(input_nickname, 32);
    var bytes32_username = web3.fromAscii(user_name, 32);
    // console.log("fromAscii (input_username) : " + bytes32_username);
    async () => {
        bytes32_username = await check_sum(bytes32_username);
    }

    console.log(bytes32_username);

    // registerAbleUser Function in solidity
    able_platform_Contract.registerAbleUser(bytes32_username, function (err, result) {
        // if there is an error => return;
        if (err) {
            console.log("registerAbleUser error:" + err);
            alert('에러가 발생하였습니다.');
            return;
        }

        $('.loading').show();
        $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");

        // check result value
        if (typeof result !== 'undefined') {
            console.log("registerAbleUser result : " + result);
            able_platform_Contract.AbleUserRegistered_Successful().watch((err, result) => {
                // todo 클라이언트 단에서 이미 존재하는 계좌번호 인지 아닌지 미리 체크하게 해주기 (만약, 중복일 경우 계좌 생성 버튼 활성화 막기)
                // if openaccount fail
                if (err) {
                    console.log("registerAbleUser error:" + err);
                    alert('에러가 발생하였습니다.');
                    $('.loading').hide();
                } else { // success, get info
                    console.log("registerAbleUser result userName: " + result.args.userName);

                    var formData = $("#able_regist_form").serialize();

                    $.ajax({ // 새로운 유저 정보 DB로 입력
                        method: "POST",
                        url: "/create_new_account",
                        data: formData
                        , success: function (res) {
                            console.log(res);

                            if (res.result == 200) {

                                alert('정상적으로 등록되었습니다.');
                                window.location.href = '/account_manage';

                            } else if (res.result == 204) {
                                alert(res.message);
                                $('.loading').hide();
                                return;
                            }

                        }

                    });

                }

            });
        }
    });
}

/**
 * @dev Function to open free ableAccount
 * @param _accountNumber the bytes32 to add new ableAccount.
 * @param _password the bytes32 to set password.
 * @return boolean flag if open success.
 */
function is_ableuser() {
    // smartcontract isAbleUser() 함수를 통해서 ableUser인지 아닌지 체크
    able_platform_Contract.isAbleUser.call(user_address, function (err, result) {

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
                        // $(location).attr('href', '/account_manage');
                        $(location).attr('href', '/dex');

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
            // document.getElementById('output_check_ableuser').innerHTML ="able 유저가 아닙니다.";
            //  modal로 회원가입 모달 띄워주기
            // 닉네임 입력받고 해당 닉네임으로 회원가입 진행하기
            open_regist_modal();
        }
    });

}

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
