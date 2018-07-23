/**
 * 계좌관리 용 어카운트 불러오기
 */
var nick_list = new Array();
var account_list = new Array();
var token_list = new Array();

$(function () {
    // add account
    $("#btn_add_account").click(function () {
        open_able_account();
    });

});

async function get_accounts() {

    var html = "";

    able_platform_StorageContract = web3.eth.contract(able_platform_contract_abi);
    able_platform_Contract = able_platform_StorageContract.at(able_platform_contract_address);

    console.log("user_address : " + user_address);

    // 계좌 갯수를 가져온다
    await able_platform_Contract.getAbleUserAbleAccountCount.call(user_address, async function (err, res) {
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
                    able_platform_Contract.getAbleUserAbleAccountAtIndex.call(user_address, i, async function (err, res) {

                        console.log(cntr2);
                        if (res != null) {

                            //계좌 넘버로 계좌 인포를 가져온다
                            var account_number = res;
                            await able_platform_Contract.getAbleAccount.call(account_number, async function (err, res) {

                                var account_info = res.toString().split(',');

                                console.log("user account name : " + web3.toAscii(account_info[2]));

                                console.log("user _userAddress :" + account_info[0]);
                                console.log("user _userName_ :" + account_info[1]);
                                console.log("user _accountNumber_: " + account_info[2]);
                                console.log("user _accountInfo_: " + account_info[3]);
                                console.log("user _accountType_" + account_info[4]);
                                console.log("user _numToken_" + account_info[5]);
                                nick_list.push(web3.toAscii(account_info[2])); // 닉네임 리스트에 넣는다. 닉베임은 계좌리스트를 만들때 필요한데 그 다음 과정인 상세정보에서 받아오기 때문에 전역변수에 넣어두고 후에 호출한다.
                                account_list.push(account_info[2]);


                                var sub_token_list = new Array();
                                for (let j = 0; j < account_info[5]; j++) { // 계좌가 보유하고 있는 토큰 리스트 수 만큼 토큰 상세정보를 불러온다.
                                    (function(cntr) {
                                        able_platform_Contract.getAbleAccountTokenBalance.call(account_number, j, async function (err, res) {
                                            //tokens_html += make_token_html(res,cntr);
                                            await sub_token_list.push(res); // 토큰 리스트에 토큰 정보를 담고

                                            console.log("result : " + res);

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
                    html += make_html(i, tokens_html);
                })(i);

            }

            $('#account_list').html(html);

            setTimeout(function(){
                get_nicklist();
            },2000);
            setTimeout(function(){
                get_account_list();
            },2000);

            setTimeout(function(){
                get_tokenlist(); // 작업이 끝나면 닉네임과 토큰리스트를 불러와 화면에 넣어준다.
            },2000);

        } else {
            //todo 계좌가 없을 경우에 할것들 나중에 생각
        }
    });

}


/**
 * 계좌관리 계좌리스트 화면 만들기
 */

function make_html(i, tokens_html){
    return "<div class=\"box-typical box-typical-padding my-account\" >\n" +
        "        <div style=\"margin-left: 10px;\">\n" +
        "            <div class=\"row\">\n" +
        "                <div class=\"col-sm-3\"><img style=\" margin-top: 10px; height: 25px;\"\n" +
        "                                           src=\"../img/logo_able_black_horizontal.png\"></div>\n" +
        "                <div class=\"col-sm-6\"></div>\n" +
        "                <div class=\"col-sm-3\" style=\"color:#919fa9; font-size: 13px; text-align: right\">\n" +
        "                    Registration Date<br>" + "2018.01.01" + "\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <br><br>\n" +
        "            <div class=\"row\">\n" +
        "                <div style=\"font-size: 15px\" class=\"col-sm-12\">\n" +
        "                    <label class=\"form-label input\" >Account Address</label>\n" +
        "                    <div style=\"margin-top: 5px\">\n" +
        "                        <div style='font-size: smaller' class='account_number' id='account_number"+i+"'></div> <a class=\"btn btn-nav btn-rounded btn-inline btn-primary-outline my-account-copy-clipboard\"  href=\"javascript:copy("+i+");\" >\n" +
        "                        copy</a>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "            <br>\n" +
        "            <div class=\"row\">\n" +
        "                <div style=\"font-size: 14px\" class=\"col-sm-12\">\n" +
        "                    <label class=\"form-label input\" >Account Nickname</label>\n" +
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
        console.log(" 변환전 : "+res[2]);
        console.log(" 변환후 : "+web3.fromWei(parseFloat(res[2])));
        amount = web3.fromWei(parseFloat(res[2]));
    }

    else if(res[1] == '0x295b3f39d7dacbc58329112064a14186f9fac786') {
        coin_icon = 'ABLER';
        coin_src = '../img/side_logo_able_on.png';

        console.log(" 변환전 : "+res[2]);
        console.log(" 변환후 : "+web3.fromWei(parseFloat(res[2])));

        amount = web3.fromWei(parseFloat(res[2]));
    }

    else if(res[1] == '0x8c2b240b0b89aa7ff9f767ad9e02afff823fed2f'){
        coin_icon = 'ABLDR';
        coin_src = '../img/side_logo_abledollar_on.png';

        console.log(" 변환전 : "+res[2]);
        console.log(" 변환후 : "+web3.fromWei(parseFloat(res[2])));

        amount = web3.fromWei(parseFloat(res[2]));

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

function get_account_list() {
    console.log("account_list : " + account_list.length);
    for (z = 0; z < account_list.length; z++) {
        console.log(account_list[z])
        $('#account_number' + z).text(account_list[z]);
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
 * 계좌 생성하는 함수
 * @dev Function to open free ableAccount
 * @param _accountNumber the bytes32 to add new ableAccount.
 * @param _password the bytes32 to set password.
 * @return boolean flag if open success.
 * @comments only ableuser can open account.
 */
function open_able_account() {

    able_platform_StorageContract = web3.eth.contract(able_platform_contract_abi);
    able_platform_Contract = able_platform_StorageContract.at(able_platform_contract_address);

    var input_account_number = document.getElementById("input_account_number").value; // 유저가 입력한 보내고자 하는 이더리움 수량
    var input_account_password = document.getElementById("input_account_password").value; // 이더리움을 보내고자 하는 상대방 주소

    var bytes32_account_number = web3.fromAscii(input_account_number, 32);
    console.log("fromAscii (input_account_number) : " + bytes32_account_number);

    var bytes32_account_password = web3.fromAscii(input_account_password, 32);
    console.log("fromAscii (input_account_password) : " + bytes32_account_password);

    able_platform_Contract.openAbleAccount(bytes32_account_number, bytes32_account_password, function (err, result) {

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
        able_platform_Contract.AbleAccountOpened_Successful().watch((err, result) => {
            console.log(err)
            console.log(result)

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