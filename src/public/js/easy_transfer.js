/**
 * function to token transfer
 */
function send() {

    if($('#input_account_nickname').val().trim() == ''){
        alert('받는 계좌를 입력해주세요')
        return;
    }
    if( $('#input_num_token').val() <= 0){
        alert('보내는 금액을 확인해주세요')
        return;
    }

    // modal창
    $('#modal_to_address').text($('#input_account_nickname').val());
    $('#modal_amount').text($('#input_num_token').val());

    $('#myModal').modal('show').css({
        'margin-top': function () {
            return 200; //($(this).height()/2) // 작동안함;;
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
    var _to     = web3.fromAscii($('#input_account_nickname').val(),32); // 송금에 필요한 입력된 값들을 변수로 받아온다
    var _token;

    if($('#select_coin').val() == 't001'){
        _token = '0x0000000000000000000000000000000000000000';
    }else if($('#select_coin').val() == 't002'){
        _token = able_coin_contract_address;
    }else if($('#select_coin').val() == 't003'){
        _token = able_dollar_contract_address;
    }
    var _amount = web3.toWei(parseFloat($('#input_num_token').val())); // 블록체인 네트워크에 등록하기 위해 eth -> wei 단위로 변경해준다.

    console.log("보내는 사람의 주소 :" +_from);
    console.log("받는사람의 주소 :" +_to);
    console.log("보내는 토큰의 컨트랙트 주소 :" +_token);
    console.log("보내는 수량(eth) :"  + $('#input_num_token').val());
    console.log("보내는 수량(wei) :" +_amount);

    var insertId ;

    console.log(_from+" : "+  _to + " : " +_token + " : "+ _amount);

    able_platform_Contract.transferFrom(_from, _to, _token, _amount, function (err, res) { // 송금실행
        if (err) {
            console.log("err : " + err);
            return;
        }

        $.ajax({
            method: "POST",
            url: "/add_transfer_history",
            dataType: "json",
            data: {
                "ableAccount_from": _from,
                "ableAccount_to": _to,
                "token_address": _token,
                "token_amount": _amount
            },
            success: function (res) {
                insertId = res.insertId;
                console.log(res);
            }
        });

        able_platform_Contract.AbleTransfer().watch((err, res) => { // 송금이 완료되면 리턴값을 받아 완료되었다고 알려준다
            console.log(res)
            if (err) {
                console.log("err : " + err);
                return;
            }
            else{
                $.ajax({
                    method: "POST",
                    url: "/update_transfer_history",
                    dataType: "json",
                    data: {
                        "insertId": insertId
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.result == 200) {
                            alert('완료되었습니다.');
                            $(location).attr('href', '/send');

                        } else if (res.result == 204) {
                            alert("에러가 발생 하였습니다.");
                            $('.loading').hide();
                            console.log(res.message);
                        }
                    }
                });

            }
        });
    });
}

function get_history(){

    $.ajax({
        method: "POST",
        url: "/get_transfer_history",
        dataType: "json",
        data: {
        },
        success: function (res) {

            console.log(res);
            console.log(res.history_list);
            var html = "";

            for(let i=0; i<res.history_list.length; i++){
                var his = res.history_list[i];
                console.log(i + " :: " +his.reg_date);
                html += make_history_body(his.reg_date.substr(0,10)+ " "+his.reg_date.substr(11,8), web3.toAscii(his.ableAccount_from), web3.toAscii(his.ableAccount_to), recognize_coin(his.token_address), web3.fromWei(parseFloat(his.token_amount)) , his.st_cd2);
            }

            console.log("html : " + html);
            $('#history_body').html(html);

            if (res.result == 200) {

            } else if (res.result == 204) {
                console.log(res.message);
            }
        }
    });
}

function make_history_body(transfer_time, ableAccount_from, ableAccount_to, token_address, token_amount, st_cd){
    var st_html = "";
    if(st_cd == 'A01_10'){
        st_html = "                        <td class=\"proceeding\"> <span class=\"glyphicon glyphicon-log-in\" style=\"margin-right: 3px;\"> Proceeding</span>\n" +
            "                        </td>\n";
    }else if(st_cd == 'A01_20'){
        st_html ="<td class=\"fail\"> <span class=\"glyphicon glyphicon-remove\" style=\"margin-right: 3px;\"></span> Fail\n" +
            "    </td>";
    }
    else if(st_cd == 'A01_30'){
        st_html ="<td class=\"complete\"> <span class=\"glyphicon glyphicon-ok\" style=\"margin-right: 3px;\"></span> Complete\n" +
            "    </td>";
    }
    var history_html = " <tr class=\"spacer\"></tr>\n" +
        "                    <tr>\n" +
        "                        <td>"+ transfer_time +"</td>\n" +
        "                        <td>" + ableAccount_from + "</td>\n" +
        "                        <td>" + ableAccount_to + "</td>\n" +
        "                        <td>"+ token_address +"</td>\n" +
        "                        <td>"+ token_amount +"</td>\n" +
        st_html +
        "                    </tr>";
    return history_html;
}
