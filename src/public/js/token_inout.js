/**
 * global var
 */
var input_account_number;
var input_num_token;
var select_coin;
var selected_coin_contract_address;

/**
 * 토큰을 보내기 전에, ERC 20 토큰을 approve 해주는 과정
 */
function check_approve() {
    select_coin=$("#select_coin option:selected").val();

    input_account_number = $('#input_my_account_number').val();
    input_num_token = web3.toWei(parseFloat($('#input_num_token').val())); // 보내고자 하는 에이블 토큰 갯수 (eth -> wei)

     /**
     * Set allowance for other address
     * Allows `_spender` to spend no more than `_value` tokens on your behalf
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */

     if(select_coin == "t001") {

         alert("eth을 보낼 때는 승인이 필요없습니다.");

         //todo
         // 또는 이더리움 선택되어 있을 시, approve 버튼 없애주기
     }

     else if(select_coin == "t002") {

         able_coin_Contract.approve(able_platform_contract_address, input_num_token, function (err, result) {

             if (err) {
                 console.log("err : " + err);
             }

             // // event listener
             // // check AbleOpenAccount success or fail
             // able_coin_contract.allowance().watch((err, result) => {
             //     // if approve fail
             //     if (err) {
             //         console.log("****************승인실패*****************")
             //
             //     }
             // });

         });
     }

     else if(select_coin == "t003") {

         able_dollar_Contract.approve(able_platform_contract_address, input_num_token, function (err, result) {

             if (err) {
                 console.log("err : " + err);
             }

             // // event listener
             // // check AbleOpenAccount success or fail
             // able_coin_contract.allowance().watch((err, result) => {
             //     // if approve fail
             //     if (err) {
             //         console.log("****************승인실패*****************")
             //
             //     }
             // });

         });
     }


}


/**
 * 입금 기능
 */
function deposit_token() {
    select_coin=$("#select_coin option:selected").val();


    input_account_number = $('#input_my_account_number').val();
    input_num_token = web3.toWei(parseFloat($('#input_num_token').val())); // 보내고자 하는 에이블 토큰 갯수 (eth -> wei)

    $('.loading').show();
    $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");

    var insertId ;

    if(select_coin == "t001") {

        input_num_token = $('#input_num_token').val(); // 보내고자 하는 에이블 토큰 갯수 (eth -> wei)


        able_platform_Contract.deposit.sendTransaction(input_account_number, {
            from: user_address, // 보내는 사람의 주소 (메타마스크 로그인 주소)
            value: web3.toWei(input_num_token, 'ether') // 보내고자 하는 수량 (블록체인 네트워크 상에 필요한 단위로 변경 : eth 단위 -> wei 단위로 변경)
        }, function (err, transactionHash) {

            if (err) {
                alert("이더리움을 전송하는데 실패했습니다. 다시 시도해 주세요.");
                $('.loading').hide();
                console.log("openAbleAccount err : " + err);
                return;
            }
            $.ajax({
                method: "POST",
                url: "/add_deposit_history",
                dataType: "json",
                data: {
                    "ableAccount_number": input_account_number,
                    "token_address": '0x0000000000000000000000000000000000000000',
                    "token_amount": web3.toWei(input_num_token, 'ether')
                },
                success: function (res) {
                    insertId = res.insertId;

                    console.log(res);
                }
            });

            able_platform_Contract.AbleDeposit().watch((err,res) => {

                $.ajax({
                    method: "POST",
                    url: "/update_deposit_history",
                    dataType: "json",
                    data: {
                        "insertId": insertId
                    },
                    success: function (res) {

                        console.log(res);

                        if (res.result == 200) {
                            alert('완료되었습니다.');
                            $(location).attr('href', '/deposit_token');

                        } else if (res.result == 204) {
                            alert("에러가 발생 하였습니다.");
                            $('.loading').hide();
                            console.log(res.message);
                        }
                    }
                });

                console.log("eth 입금 확인 result : " + res);
                $(location).attr('href', '/deposit_token');

            });

        });
    }
    // able coin
    else if(select_coin == "t002" || select_coin == "t003") {
        if(select_coin == "t002") {
            selected_coin_contract_address = able_coin_contract_address;
        } else if(select_coin == "t003") {
            selected_coin_contract_address = able_dollar_contract_address;
        }

        able_platform_Contract.depositToken(input_account_number, selected_coin_contract_address, input_num_token, function (err, result) {
            if (err) {
                alert("토큰을 전송하는데 실패했습니다. 다시 시도해 주세요.");
                $('.loading').hide();
                console.log("openAbleAccount err : " + err);
                return;
            }
            $.ajax({
                method: "POST",
                url: "/add_deposit_history",
                dataType: "json",
                data: {
                    "ableAccount_number": input_account_number,
                    "token_address": selected_coin_contract_address,
                    "token_amount": input_num_token
                },
                success: function (res) {
                    insertId = res.insertId;
                    console.log(res);
                }
            });
            able_platform_Contract.AbleDeposit().watch((err,res) => {

                $.ajax({
                    method: "POST",
                    url: "/update_deposit_history",
                    dataType: "json",
                    data: {
                        "insertId": insertId
                    },
                    success: function (res) {

                        console.log(res);

                        if (res.result == 200) {
                            alert('완료되었습니다.');
                            $(location).attr('href', '/deposit_token');

                        } else if (res.result == 204) {
                            alert("에러가 발생 하였습니다.");
                            $('.loading').hide();
                            console.log(res.message);
                        }
                    }
                });

                console.log("able coin 입금 확인 result : " + res);
                $(location).attr('href', '/deposit_token');

                //todo db insert
                // var token = result.args._token;
                // var userAddress = result.args._userAddress;
                // var amount = result.args._amount;
                // var balance = result.args._balance;

            });

        });
    }

}


/**
 * 출금 기능
 */
function withdraw_token() {

    var selected_coin_contract_address; // 선택된 코인의 컨트랙트 주소
    select_coin=$("#select_coin option:selected").val();

    input_account_number = $('#input_my_account_number').val();
    input_num_token = web3.toWei(parseFloat($('#input_num_token').val())); // 보내고자 하는 에이블 토큰 갯수 (eth -> wei)

    // pending status
    $('.loading').show();
    $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");

    var insertId;

    // ethereum
    if(select_coin == "t001") {

        console.log("ethereum");
        console.log("input_account_number :" +input_account_number);
        console.log("input_num_token (eth):" +$('#input_num_token').val());
        console.log("input_num_token (wei):" +input_num_token);
        console.log("user_address :" +user_address);

        /**
         * @dev Function to withdraw token from _accountNumber
         * @param _accountNumber the bytes32 to withdraw.
         * @param _token the address to set token address.
         * @param _amount the uint to set amount.
         * @return boolean flag if open success.
         */
        able_platform_Contract.withdraw(input_account_number, input_num_token, function (err, result) {
            // if approve fail
            if (err) {
                console.log("withdraw err : " + err);
            }
            $.ajax({
                method: "POST",
                url: "/add_withdraw_history",
                dataType: "json",
                data: {
                    "ableAccount_number": input_account_number,
                    "token_address": '0x0000000000000000000000000000000000000000',
                    "token_amount": input_num_token
                },
                success: function (res) {

                    insertId = res.insertId;
                    console.log(res);
                }
            });
            able_platform_Contract.AbleWithdraw().watch((err,res) => {

                $.ajax({
                    method: "POST",
                    url: "/update_withdraw_history",
                    dataType: "json",
                    data: {
                        "insertId": insertId
                    },
                    success: function (res) {

                        console.log(res);

                        if (res.result == 200) {
                            alert('완료되었습니다.');
                            $(location).attr('href', '/withdraw_token');

                        } else if (res.result == 204) {
                            alert("에러가 발생 하였습니다.");
                            $('.loading').hide();
                            console.log(res.message);
                        }
                    }
                });

                console.log("eth 출금 확인 result : " + res);
                $(location).attr('href', '/withdraw_token');

                //todo token 이라는 변수가 다른 함수와 겹쳐셔 이벤트값 불러오기가 안됨.
                // var token = result.args.token;
                // var userAddress = result.args.userAddress;
                // var amount = result.args.amount;
                // var balance = result.args.balance;
                // console.log("openAbleAccount result user_accountNumber: " + token);
                // console.log("openAbleAccount result user_Address: " + userAddress);
                // console.log("openAbleAccount result input_account_password: " + amount);
                // console.log("openAbleAccount result user_accountType: " + balance);

            });

        });
    }

    // able coin
    else if(select_coin == "t002" || select_coin == "t003") {
        if(select_coin == "t002") {
            selected_coin_contract_address = able_coin_contract_address;
        } else if(select_coin == "t003") {
            selected_coin_contract_address = able_dollar_contract_address;
        }

        /**
         * @dev Function to withdraw token from _accountNumber
         * @param _accountNumber the bytes32 to withdraw.
         * @param _token the address to set token address.
         * @param _amount the uint to set amount.
         * @return boolean flag if open success.
         */
        able_platform_Contract.withdrawToken(input_account_number, selected_coin_contract_address, input_num_token, function (err, result) {
            // if approve fail
            if (err) {
                console.log("withdraw err : " + err);
            }
            $.ajax({
                method: "POST",
                url: "/add_withdraw_history",
                dataType: "json",
                data: {
                    "ableAccount_number": input_account_number,
                    "token_address": selected_coin_contract_address,
                    "token_amount": input_num_token
                },
                success: function (res) {

                    insertId = res.insertId;
                    console.log(res);
                }
            });
            able_platform_Contract.AbleWithdraw().watch((err,res) => {

                $.ajax({
                    method: "POST",
                    url: "/update_withdraw_history",
                    dataType: "json",
                    data: {
                        "insertId": insertId
                    },
                    success: function (res) {

                        console.log(res);

                        if (res.result == 200) {
                            alert('완료되었습니다.');
                            $(location).attr('href', '/withdraw_token');

                        } else if (res.result == 204) {
                            alert("에러가 발생 하였습니다.");
                            $('.loading').hide();
                            console.log(res.message);
                        }
                    }
                });

                console.log("able coin 출금 확인 result : " + res);
                $(location).attr('href', '/withdraw_token');


                //todo token 이라는 변수가 다른 함수와 겹쳐셔 이벤트값 불러오기가 안됨.
                // var token = result.args.token;
                // var userAddress = result.args.userAddress;
                // var amount = result.args.amount;
                // var balance = result.args.balance;

                // console.log("openAbleAccount result user_accountNumber: " + token);
                // console.log("openAbleAccount result user_Address: " + userAddress);
                // console.log("openAbleAccount result input_account_password: " + amount);
                // console.log("openAbleAccount result user_accountType: " + balance);

            });

        });
    }

}



function get_deposit_history (){
    $.ajax({
        method: "POST",
        url: "/get_deposit_history",
        dataType: "json",
        data: {
        },
        success: function (res) {
            console.log(res);
            console.log(res.history_list);
            var html = "";
            for(let i=0; i<res.history_list.length; i++){
                var his = res.history_list[i];
                console.log(i + " :: " +his.deposit_time)
                html += make_history_body(his.deposit_time.substr(0,10)+ " "+his.deposit_time.substr(11,8), web3.toAscii(his.ableAccount_number), recognize_coin(his.token_address), web3.fromWei(parseFloat(his.token_amount)) , his.st_cd);
            }
            console.log("html : " + html)
            $('#history_body').html(html);
            if (res.result == 200) {
            } else if (res.result == 204) {
                console.log(res.message);
            }
        }
    });
}

function get_withdraw_history (){
    $.ajax({
        method: "POST",
        url: "/get_withdraw_history",
        dataType: "json",
        data: {
        },
        success: function (res) {
            console.log(res);
            console.log(res.history_list);
            var html = "";
            for(let i=0; i<res.history_list.length; i++){
                var his = res.history_list[i];
                console.log(i + " :: " +his.withdraw_time)
                html += make_history_body(his.withdraw_time.substr(0,10)+ " "+his.withdraw_time.substr(11,8), web3.toAscii(his.ableAccount_number), recognize_coin(his.token_address), web3.fromWei(parseFloat(his.token_amount)) , his.st_cd);
            }
            console.log("html : " + html)
            $('#history_body').html(html);
            if (res.result == 200) {
            } else if (res.result == 204) {
                console.log(res.message);
            }
        }
    });
}

function make_history_body(time, ableAccount_number, token_address, token_amount, st_cd){
    var st_html = "";
    if(st_cd.substr(4,2) == '10'){
        st_html = "                        <td class=\"proceeding\"> <span class=\"glyphicon glyphicon-log-in\" style=\"margin-right: 3px;\"> Proceeding</span>\n" +
            "                        </td>\n";
    }else if(st_cd.substr(4,2) == '30'){
        st_html ="<td class=\"complete\"> <span class=\"glyphicon glyphicon-ok\" style=\"margin-right: 3px;\"></span> Complete\n" +
            "    </td>";
    }
    var history_html = " <tr class=\"spacer\"></tr>\n" +
        "                    <tr>\n" +
        "                        <td>"+ time +"</td>\n" +
        "                        <td>" + ableAccount_number + "</td>\n" +
        "                        <td>"+ token_address +"</td>\n" +
        "                        <td>"+ token_amount +"</td>\n" +
        st_html +
        "                    </tr>";
    return history_html;
}