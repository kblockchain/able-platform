$(function () {

    // session delete
    $("#btn_logout").click(function () {
        session_logout();
    });

});


/**
 * 어카운트 불러오기
 */
function get_accounts_info() { // 간편송금 페이지 진입시 세션 체크를 끝내고 이 함수를 실행
    able_platform_StorageContract = web3.eth.contract(able_platform_contract_abi);
    able_platform_Contract = able_platform_StorageContract.at(able_platform_contract_address);
    able_platform_Contract.getAbleUserAbleAccountCount.call(user_address, function (err, res) { // 유저의 계좌 갯수를 불러온다
        if (err) {
            console.log("err : " + err);
            return;
        }

        //계좌가 있다면
        if (res > 0) {

            //계좌 갯수만큼 계좌 넘버를 가져온다
            for (var i = 0; i < res; i++) { // 계좌 갯수만큼 반복
                able_platform_Contract.getAbleUserAbleAccountAtIndex.call(user_address, i, function (err, res) {
                    if (err) {
                        console.log("err : " + err);
                        return;
                    }
                    if (res != null) { // 계좌 정보를 각각 가져와 셀렉트 박스 옵션으로 넣는다.


                        console.log(res);
                        check_sum(res);

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
 * 계좌 상세정보 불러오기 (현재 선택한 계좌)
 */
function get_account_detail(account_number) {

    able_platform_Contract.getAbleAccount.call(account_number, function (err, res) { // 계좌 정보를 파라메터로 호출
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
        $('#input_my_account_number').val(account_info[2]);// 모달창과 우측 위젯에 필요정보를 넣어준다


        $('#send_menu_token_list').html("");
        console.log(" length : "+account_info[5]);
        for (j = 0; j < account_info[5]; j++) { // 토큰 갯수만큼 토큰 정보를 불러온다
            able_platform_Contract.getAbleAccountTokenBalance.call(account_number, j, function (err, res) {
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

                var amount = web3.fromWei(parseFloat(token_info[2]));


                html = "<span class=\"my-info-label\" >"+coin_icon+"</spans><br>\n" +
                    "    <span class=\"my-info-content\" >"+amount+"</span><br><br>"; // 토큰 정보를 각각 넣어준다

                $('#send_menu_token_list').append(html);


            });
        }


    });
}


/**
 * check session
 */
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
                }
                else if (current_page.indexOf('send') != -1) {
                    get_accounts_info();
                }
                else if (current_page.indexOf('deposit_token') != -1) {
                    get_accounts_info();
                }
                else if (current_page.indexOf('withdraw_token') != -1) {
                    get_accounts_info();
                }

            } else {
                // alert('Please make sure to connect metamask rinkeby network');
                alert('메타마스크 Rinkeby 네트워크로 로그인 후 접근해 주세요.');
                $(location).attr('href', '/');
            }
        }

    });
}

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


function check_sum(param){
    $.ajax({
        method: "POST",
        url: "/check_sum",
        dataType: "json",
        data : {"account" : param},
        success: function (res) {
            console.log(res.result)
            return res.result;
        }
    });
}


function showAlert() {
    alert ("we do our best to make DEX ! See u soon!");
}