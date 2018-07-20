/**
 * function to token transfer
 */
function send() {

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
    var _token  = $('#select_coin').val();
    var _amount = web3.toWei(parseFloat($('#input_num_token').val())); // 블록체인 네트워크에 등록하기 위해 eth -> wei 단위로 변경해준다.

    console.log("보내는 사람의 주소 :" +_from);
    console.log("받는사람의 주소 :" +_to);
    console.log("보내는 토큰의 컨트랙트 주소 :" +_token);
    console.log("보내는 수량(eth) :"  + $('#input_num_token').val());
    console.log("보내는 수량(wei) :" +_amount);

    able_platform_Contract.transferFrom(_from, _to, _token, _amount, function (err, res) { // 송금실행
        if (err) {
            console.log("err : " + err);
            return;
        }

        able_platform_Contract.AbleTransfer().watch((err, res) => { // 송금이 완료되면 리턴값을 받아 완료되었다고 알려준다
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