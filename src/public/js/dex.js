/**
 * global var
 */
// 기본값으로 able coin의 컨트랙트 주소 값 사용
var selected_coin_contract_address = able_coin_contract_address;

// 코인 선택시 이벤트
function selected_coin(coin_name) {

    if(coin_name == "able_coin") {
        $('#buy_token_name').text('BUY (ABLE COIN)');
        $('#sell_token_name').text('SELL (ABLE COIN)');

        selected_coin_contract_address = able_coin_contract_address;

        // order book 불러오기
        get_order_book(selected_coin_contract_address);
    }

    else if(coin_name == "able_dollar") {
        $('#buy_token_name').text('BUY (ABLE DOLLAR)');
        $('#sell_token_name').text('SELL (ABLE DOLLAR)');

        selected_coin_contract_address = able_dollar_contract_address;

        get_order_book(selected_coin_contract_address);

    }
}

function buy(){

    var price = $('#input_buy_priceInWei').val();
    var amount = $('#input_buy_amount').val();

    if(price == 0 || amount == 0){
        alert('0이상의 값을 입력해 주세요.');
        return false;
    }
    if(forceInt(amount) != amount){
        alert('갯수에 소수점이 들어갈 수 없습니다.');
        return false;
    }

    buy_token();
}


function sell(){

    var price = $('#input_sell_priceInWei').val();
    var amount = $('#input_sell_amount').val();

    if(price == 0 || amount == 0){
        alert('0이상의 값을 입력해 주세요.');
        return false;
    }
    if(forceInt(amount) != amount){
        alert('갯수에 소수점이 들어갈 수 없습니다.');
        return false;
    }

    sell_token();
}

function forceInt(i)
{
    switch(typeof(i))
    {
        case 'number':
            return parseInt(i);
        case 'string':
            return parseInt(Number(i.replace(/[^0-9\.]+/g,"")));
        default:
            return 0;
    }
}
// 코인 구매
function buy_token(){

    var _accountNumber = $('#select_account').val(); // 간편 계좌 번호
    var _token = selected_coin_contract_address; // 토큰 컨트랙트 주소
    var _priceInWei = web3.toWei(parseFloat($('#input_buy_priceInWei').val())); // 구매할 토큰 가격
    // var _amount = web3.toWei(parseFloat($('#input_buy_amount').val())); // 구매할 토큰 양
    var _amount = $('#input_buy_amount').val(); // 구매할 토큰 양

    console.log("account number : " + _accountNumber);
    console.log("_token : " + _token);
    console.log("_priceInWei : " + _priceInWei);
    console.log("_amount : " + _amount);

    $('.loading').show();
    $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");

    /**
     * @dev Market Buy Order Function
     * @param _accountNumber the bytes32 to buy token.
     * @param _token the address to buy token.
     * @param _priceInWei the uint to set buy price.
     * @param _amount the uint to set buy volume.
     */
    able_platform_Contract.buyToken(_accountNumber , _token, _priceInWei, _amount, function (err, res){

        if (err) {
            $('.loading').hide();
            console.log("buyToken err : " + err);
            return;
        }

        able_platform_Contract.LimitBuyOrderCreated().watch((err,res) => {

            if (err) {
                $('.loading').hide();
                console.log("LimitBuyOrderCreated err : " + err);
                return;
            }

            console.log("LimitBuyOrderCreated success");


            //todo db insert & if success redirect or ???
            $('.loading').hide();

            var _token = res.args._token;
            var _accountNumber = res.args._accountNumber;
            var _amountTokens = res.args._amountTokens;
            var _priceInWei = res.args._priceInWei;
            var _orderKey = res.args._orderKey;

            console.log("_token : " + _token);
            console.log("_accountNumber : " + _accountNumber);
            console.log("_amountTokens : " + _amountTokens);
            console.log("_priceInWei : " + _priceInWei);
            console.log("_orderKey : " + _orderKey);

        });

    });

    able_platform_Contract.BuyOrderFulfilled().watch((err,res) => {

        if (err) {
            $('.loading').hide();
            console.log("BuyOrderFulfilled err : " + err);
            return;
        }

        var _accountNumber = $('#select_account').val();
        var _token = res.args._token; // token contract address
        var _amountTokens = res.args._amountTokens;
        var _priceInWei = res.args._priceInWei;

        console.log("BuyOrderFulfilled _token : " + _token);
        console.log("BuyOrderFulfilled _amountTokens : " + _amountTokens);
        console.log("BuyOrderFulfilled _priceInWei : " + _priceInWei);

        $.ajax({
            method: "POST",
            url: "/add_market_history",
            dataType: "json",
            data: {
                "ableAccount_number": _accountNumber,
                "order_type": 'BUY',
                "token_address": _token,
                "token_amount": _amount,
                // "token_priceOfWei" : _priceInWei
            },
            success: function (res) {

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

        console.log("SellOrderFulfilled success");

        //todo db insert & if success redirect or ???
        $('.loading').hide();

    });
}


// 코인 판매
function sell_token(){

    var _accountNumber = $('#select_account').val();
    var _token = selected_coin_contract_address;
    var _priceInWei = web3.toWei(parseFloat($('#input_sell_priceInWei').val()));
    // var _amount = web3.toWei(parseFloat($('#input_sell_amount').val()));
    var _amount = $('#input_sell_amount').val();

    console.log("account number : " + _accountNumber);
    console.log("_token : " + _token);
    console.log("_priceInWei : " + _priceInWei);
    console.log("_amount : " + _amount);

    $('.loading').show();
    $('.loading p').css('top', (($(window).height() - $("#wrap").outerHeight()) / 2 + $(window).scrollTop()) + "px");

    /**
     * @dev Market Sell Order Function
     * @param _accountNumber the bytes32 to sell token.
     * @param _token the address to sell token.
     * @param _priceInWei the uint to set sell price.
     * @param _amount the uint to set sell volume.
     */
    able_platform_Contract.sellToken(_accountNumber , _token, _priceInWei, _amount, function (err, res){

        if (err) {
            $('.loading').hide();
            console.log("buyToken err : " + err);
            return;
        }

        able_platform_Contract.LimitSellOrderCreated().watch((err,res) => {

            if (err) {
                $('.loading').hide();
                console.log("LimitSellOrderCreated err : " + err);
                return;
            }

            var _token = res.args._token;
            var _accountNumber = res.args._accountNumber;
            var _amountTokens = res.args._amountTokens;
            var _priceInWei = res.args._priceInWei;
            var _orderKey = res.args._orderKey;

            console.log("_token : " + _token);
            console.log("_accountNumber : " + _accountNumber);
            console.log("_amountTokens : " + _amountTokens);
            console.log("_priceInWei : " + _priceInWei);
            console.log("_orderKey : " + _orderKey);

            console.log("LimitSellOrderCreated success");
            $('.loading').hide();

        });

        // event SellOrderFulfilled(address _token, uint _amountTokens, uint _priceInWei, uint _orderKey);
        able_platform_Contract.SellOrderFulfilled().watch((err,res) => {

            if (err) {
                $('.loading').hide();
                console.log("SellOrderFulfilled err : " + err);
                return;
            }

            var _accountNumber = $('#select_account').val();
            var _token = res.args._token; // token contract address
            var _amountTokens = res.args._amountTokens;
            var _priceInWei = res.args._priceInWei;

            console.log("_accountNumber _token : " + _accountNumber);
            console.log("SellOrderFulfilled _token : " + _token);
            console.log("SellOrderFulfilled _amountTokens : " + _amountTokens);
            console.log("SellOrderFulfilled _priceInWei : " + _priceInWei);

            $.ajax({
                method: "POST",
                url: "/add_market_history",
                dataType: "json",
                data: {
                    "ableAccount_number": _accountNumber,
                    "order_type": 'SELL',
                    "token_address": _token,
                    "token_amount": _amount,
                    // "token_priceOfWei" : _priceInWei
                },
                success: function (res) {

                    if (res.result == 200) {
                        alert('완료되었습니다.');
                        $(location).attr('href', '/dex');

                    } else if (res.result == 204) {
                        alert("에러가 발생 하였습니다.");
                        $('.loading').hide();
                        console.log(res.message);
                    }
                }
            });

            console.log("SellOrderFulfilled success");

            //todo db insert & if success redirect or ???
            $('.loading').hide();

        });


    });
}

// 주문 내역 불러오는 부분
function get_order_book() {
    var _token = selected_coin_contract_address;
    /**
     * @dev Returns Sell Prices Array and Sell Volume Array for each of the Prices
     * @param _token the address to get token sell orders.
     * @return uint[] of _arrPricesSell_, uint[] _arrVolumesSell_.
     */
    able_platform_Contract.getSellOrderBook(_token, function (err, res) {
        if (err) {
            console.log("getBuyOrderBook err : " + err);
            return;
        }
        var sellbook_price = res.toString().split(',');
        var sellbook_volume = sellbook_price.splice(sellbook_price.length/2,sellbook_price.length/2)
        var buy_book_html ="";
        var sell_book_html ="";
        for( let i=0; i < sellbook_price.length ; i++){
            sell_book_html += make_sell_order_book(sellbook_price[i], sellbook_volume[i]);
        }
        $('#sell_order_book').html(sell_book_html);

        $('.sell_order').click( function (){
            console.log($(this).text());
            $('#input_sell_priceInWei').val($(this).text())
        });
    });
    able_platform_Contract.getBuyOrderBook(_token, function (err, res) {
        if (err) {
            console.log("getBuyOrderBook err : " + err);
            return;
        }
        var book_price = res.toString().split(',');
        var book_volume = book_price.splice(book_price.length/2,book_price.length/2)
        var buy_book_html ="";
        for( let i=0; i < book_price.length ; i++){
            buy_book_html += make_buy_order_book(book_price[i], book_volume[i]);
        }
        $('#buy_order_book').html(buy_book_html);

        $('.buy_order').click( function (){
            console.log($(this).text());
            $('#input_buy_priceInWei').val($(this).text())
        });
    });
}

// order book 부분 html 생성해주는 곳 (주문 가능한 목록)
function make_sell_order_book(price, volume){
    html = "<tr>\n" +
        "                                            <td class='sell_order' >"+ web3.fromWei(parseFloat(price)) + "</td>\n" +
        "                                            <td>"+ volume +"</td>\n" +
        "                                            <td>" + web3.fromWei(parseFloat(price)) * web3.fromWei(parseFloat(volume)) +"</td>\n" +
        "                                        </tr>";
    return html;
}

function make_buy_order_book(price, volume){
    html = "<tr>\n" +
        "                                            <td class='buy_order' >"+ web3.fromWei(parseFloat(price)) + "</td>\n" +
        "                                            <td>"+ volume +"</td>\n" +
        "                                            <td>" + web3.fromWei(parseFloat(price)) * web3.fromWei(parseFloat(volume)) +"</td>\n" +
        "                                        </tr>";
    return html;
}



// 나의 구매 / 판매 주문 내역을 담아둘 배열
var my_open_buy_order = new Array();
var my_open_sell_order = new Array();

//
function get_my_order(){
    var _accountNumber = $('#select_account').val();
    var _token = selected_coin_contract_address;

    // 내가 등록해둔 판매 목록
    // 1.블록체인 네트워크에서 getAccountBuyCount 함수를 이용해 해당 계좌에 등록되어 있는 '판매 갯수'를 가져온다.
    // 2.판매 갯수 만큼 반복문을 돌려서, 1.priceInWei 2.amount 3.offset 값을 리턴 받는다.
    // 3.get_buy_sell_list 함수에서 Array에 저장된 값을 불러와 html에 뿌려준다.
    able_platform_Contract.getAccountSellCount(_accountNumber, _token, async function (err,res){

        console.log("getAccountSellCount res : " + res);
        for(let i=0; i < res ; i++){
            able_platform_Contract.getAccountSellOrder(_accountNumber, _token , i, async function (err, res){
                my_open_sell_order.push(res);
            });
        }

    });

    // 내가 등록해둔 구매 목록
    able_platform_Contract.getAccountBuyCount(_accountNumber, _token, async function (err,res){

        console.log("getAccountBuyCount res : " + res);

        for(let i=0; i < res ; i++){
            able_platform_Contract.getAccountBuyOrder(_accountNumber, _token , i, async function (err, res){
                my_open_buy_order.push(res);
            });
        }

    });

    // 배열에 담은 값을 불러와 html로 불러들인다.
    setTimeout(function(){
        get_buy_sell_list();
    },2000);


}

// my open order book에서 cancel 버튼 클릭 이벤트 함수
function cancle_order(price,offset,order_type){

    var _accountNumber = $('#select_account').val();
    var _token = selected_coin_contract_address;
    var _isSellOrder = '';

    if(order_type=='BUY'){
        _isSellOrder = false; // test
    }else if(order_type=='SELL'){
        _isSellOrder = true;
    }
    var _priceInWei = web3.toWei(parseFloat(price));
    var _offerKey = offset;

    console.log(_accountNumber);
    console.log(_token);
    console.log(_isSellOrder);
    console.log(_priceInWei);
    console.log(_offerKey);

    /**
     * @dev Canel ORDER
     * @param _accountNumber the bytes32 to cancel token order.
     * @param _token the address to cancel token order.
     * @param _isSellOrder the boolean to check buy or sell.
     * @param _priceInWei the uint to find order.
     * @param _offerKey the uint to delete orderBook[_priceInWei] using offchain DB.
     */
    able_platform_Contract.cancelOrder(_accountNumber, _token, _isSellOrder, _priceInWei, _offerKey, function (err, res){
        // sell
        if (_isSellOrder == true) {
            able_platform_Contract.SellOrderCanceled().watch(function(err,res ){
                alert('판매 취소되었습니다.');
                console.log(res);
            })
        }
        // buy
        else if (_isSellOrder == false) {
            able_platform_Contract.BuyOrderCanceled().watch(function(err,res ){
                alert('구매 취소되었습니다.');
                console.log(res);
            })
        }
    });
}

// 나의 주문 내역 (구매/판매)의 데이터를 입력해주는 곳
function get_buy_sell_list() {
    var html="";
    for (let z = 0; z < my_open_buy_order.length; z++) {
        console.log(my_open_buy_order[z]);
        var order_info = my_open_buy_order[z].toString().split(',');
        html += make_my_open_order_book(order_info[0],order_info[1],order_info[2],'BUY');
    }
    $('#my_buy_open_orders').html(html);

    var html2 ="";
    for (let z = 0; z < my_open_sell_order.length; z++) {
        console.log(my_open_sell_order[z]);
        var order_info = my_open_sell_order[z].toString().split(',');
        html2 += make_my_open_order_book(order_info[0],order_info[1],order_info[2],'SELL');
    }
    $('#my_sell_open_orders').html(html2);
}

// my open order book 부분 html 생성해주는 곳 (나의 주문 내역)
function make_my_open_order_book(price, amount, offset, order_type){

    html = "<tr>\n" +
        "                                            <td>"+ web3.fromWei(parseFloat(price)) + "</td>\n" +
        "                                            <td>"+ web3.fromWei(parseFloat(amount)) +"</td>\n" +
        "                                            <td>"+ web3.fromWei(parseFloat(price)) * web3.fromWei(parseFloat(amount)) +"</td>\n" +
        "                                            <td><button type=\"button\" onclick=\"javascript:cancle_order('"+price+"','"+offset+"','"+order_type+"');\""+ " class=\"btn btn-inline btn-danger\" offset='"+offset+"'>cancel</button></td>\n" +
        "                                        </tr>";
    return html;

}


// Market Order History 조회
function get_marketorder_history() {
    $.ajax({
        method: "POST",
        url: "/get_marketorder_history",
        dataType: "json",
        data: {
        },
        success: function (res) {

            var html = "";

            for(let i=0; i<res.history_list.length; i++){
                var his = res.history_list[i];
                console.log("get_marketorder_history reg_date: " + his.reg_date);
                console.log("get_marketorder_history order_type: " + his.order_type);
                console.log("get_marketorder_history token_priceOfWei: " + his.token_priceOfWei);
                console.log("get_marketorder_history token_amount: " + his.token_amount);

                html += make_marketorde_history(his.reg_date, his.order_type, web3.fromWei(parseFloat(his.token_priceOfWei)), web3.fromWei(parseFloat(his.token_amount)));
            }

            console.log("html : " + html)
            $('#market_order_history').html(html);

            if (res.result == 200) {

            } else if (res.result == 204) {
                console.log(res.message);
            }
        }
    });
}

function make_marketorde_history(date, type, price, amount) {

    html = "<tr>\n" +
        "    <td>"+ date +"</td>\n" +
        "    <td>"+ type +"</td>\n" +
        "    <td>"+ web3.fromWei(parseFloat(price)) +"</td>\n" +
        "    <td>"+ web3.fromWei(parseFloat(amount)) +"</td>\n" +
        "    <td>"+ web3.fromWei(parseFloat(amount)) * web3.fromWei(parseFloat(price)) +"</td>\n" +
        "   </tr>";

    return html;
}


// My Order History 조회
function get_myorder_history() {

    var _accountNumber = $('#select_account').val();
    console.log("계좌 받아 오나요!? : " + _accountNumber);


    $.ajax({
        method: "POST",
        url: "/get_marketorder_history",
        dataType: "json",
        data: {
            "ableAccount_number": _accountNumber
        },
        success: function (res) {

            var html = "";

            for(let i=0; i<res.history_list.length; i++){
                var his = res.history_list[i];
                console.log("get_marketorder_history reg_date: " + his.reg_date);
                console.log("get_marketorder_history order_type: " + his.order_type);
                console.log("get_marketorder_history token_priceOfWei: " + his.token_priceOfWei);
                console.log("get_marketorder_history token_amount: " + his.token_amount);

                html += make_myorder_history(his.reg_date, his.order_type, web3.fromWei(parseFloat(his.token_priceOfWei)), web3.fromWei(parseFloat(his.token_amount)));
            }

            console.log("html : " + html)
            $('#my_order_history').html(html);

            if (res.result == 200) {

            } else if (res.result == 204) {
                console.log(res.message);
            }
        }
    });
}

function make_myorder_history(date, type, price, amount) {

    html = "<tr>\n" +
        "    <td>"+ date +"</td>\n" +
        "    <td>"+ type +"</td>\n" +
        "    <td>"+ web3.fromWei(parseFloat(price)) +"</td>\n" +
        "    <td>"+ web3.fromWei(parseFloat(amount)) +"</td>\n" +
        "    <td>"+ web3.fromWei(parseFloat(amount)) * web3.fromWei(parseFloat(price)) +"</td>\n" +
        "   </tr>";

    return html;
}

// todo DB에서 데이터 불러오기, reload 시간 설정 해주기
// 조건: 1h, 6h 12h, 24h (이더델타 참고)
// 강수님 피드백으로는 봉의 갯수가 많으면 좀 더 차트 같아 보이지 않을까 라는 의견을 주심
function drawChart() {

    // 선택되어져 있는 코인 컨트랙트 주소
    var _token = selected_coin_contract_address;

    console.log("drawChart coin: " + _token);

    $.ajax({
        method: "POST",
        url: "/get_chartdata",
        dataType: "json",
        data: {
            //"token_address": _token, // 코인 컨트랙트 주소
            //"token_timecheck" : _priceInWei // 몇 분봉인지 체크 (분봉을 뭐라고 나타낼 수 있을까..)
        },

        // todo 데이터 불러오기 성공하면???
        success: function (res) {

            if (res.result == 200) {
                // $(location).attr('href', '/dex');

                var result_list = res.history_list;
                var d = ""
                var arr = [];
                for(i=0;i<result_list.length;i++){
                    d += "['"+result_list[i].DATE+"', "+result_list[i].저가+", "+result_list[i].시가+", "+result_list[i].종가+", "+result_list[i].고가+"]";
                    if(i!=result_list.length-1){
                        d+=",";
                    }
                }
                for(i=0;i<result_list.length;i++){

                    var temp = [result_list[i].DATE,result_list[i].저가,result_list[i].시가,result_list[i].종가,result_list[i].고가];
                    arr.push(temp);
                    //d += "['"+result_list[i].DATE+"', "+result_list[i].저가+", "+result_list[i].시가+", "+result_list[i].종가+", "+result_list[i].고가+"]";
                }
                console.log(arr)
                var data = google.visualization.arrayToDataTable(arr, true);
                console.log(data)
                var options = {
                    legend:'none',
                    bar: { groupWidth: '100%' }, // Remove space between bars.
                    candlestick: {
                        fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                        risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
                    }
                };

                var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

                chart.draw(data, options);

            } else if (res.result == 204) {
                alert("에러가 발생 하였습니다.");
                // $('.loading').hide();
                // console.log(res.message);
            }
        }
    });


    // var data = google.visualization.arrayToDataTable([
    //     ['Mon', 20, 28, 38, 45],
    //     ['Tue', 31, 38, 55, 66],
    //     ['Wed', 50, 55, 77, 80],
    //     ['Thu', 77, 77, 66, 50],
    //     ['Fri', 68, 66, 22, 15]
    //     // Treat first row as data as well.
    // ], true);
    //
    // var options = {
    //     legend:'none'
    // };
    //
    // var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
    //
    // chart.draw(data, options);


}