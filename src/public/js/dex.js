/**
 * global var
 */
// 기본값으로 able coin의 컨트랙트 주소 값 사용
var selected_coin_contract_address = able_coin_contract_address;


function selcted_coin(coin_name) {

    if(coin_name == "able_coin") {
        $('#buy_token_name').text('BUY (ABLE COIN)');
        $('#sell_token_name').text('SELL (ABLE COIN)');

        selected_coin_contract_address = able_coin_contract_address;

        // order book 불러오기
        get_buy_order_book(selected_coin_contract_address);
    }

    else if(coin_name == "able_dollar") {
        $('#buy_token_name').text('BUY (ABLE DOLLAR)');
        $('#sell_token_name').text('SELL (ABLE DOLLAR)');

        selected_coin_contract_address = able_dollar_contract_address;

        get_buy_order_book(selected_coin_contract_address);

    }
}


function buy_token(){

    var _accountNumber = $('#select_account').val(); // 간편 계좌 번호
    var _token = selected_coin_contract_address; // 토큰 컨트랙트 주소
    var _priceInWei = web3.toWei(parseFloat($('#input_buy_priceInWei').val())); // 구매할 토큰 가격
    var _amount = web3.toWei(parseFloat($('#input_buy_amount').val())); // 구매할 토큰 양

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

            console.log("BuyOrderFulfilled success");


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
}



function sell_token(){

    var _accountNumber = $('#select_account').val();
    var _token = selected_coin_contract_address;
    var _priceInWei = web3.toWei(parseFloat($('#input_sell_priceInWei').val()));
    var _amount = web3.toWei(parseFloat($('#input_sell_amount').val()));

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

            console.log("LimitSellOrderCreated success");


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
}


function get_buy_order_book() {
    var _token = selected_coin_contract_address;

    /**
     * @dev Returns Buy Prices Array and Buy Volume Array for each of the Prices
     * @param _token the address to get token buy orders.
     * @return uint[] of _arrPricesBuy_, uint[] _arrVolumesBuy_.
     */
    able_platform_Contract.getBuyOrderBook.call(_token, function (err, res) {

        if (err) {
            console.log("getBuyOrderBook err : " + err);
            return;
        }

        console.log("getBuyOrderBook success");
        console.log("getBuyOrderBook res : " + res);

        var buybook_price = res.toString().split(',');

        var buybook_volume = buybook_price.splice(buybook_price.length/2,buybook_price.length/2)

        console.log(buybook_price)

        console.log(buybook_volume)

        //todo db insert & if success redirect or ???
        // var _arrPricesBuyAry = res.args._arrPricesBuy_;
        // var first = _arrPricesBuyAry[0];
        // console.log("first : " + first);


        // var _arrVolumesBuy = res.args.arrVolumesBuy;
        //
        // console.log("_arrPricesBuy : " + _arrPricesBuy);
        // console.log("_arrVolumesBuy : " + _arrVolumesBuy);
    });
}

function get_sell_order_book() {
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

        console.log(sellbook_price)

        console.log(sellbook_volume)

        var sell_book_html ="";

        for( let i=0; i < sellbook_price.length ; i++){
            sell_book_html += make_sell_order_book(sellbook_price[i], sellbook_volume[i]);
        }

        $('#sell_order_book').html(sell_book_html);

        console.log("getSellOrderBook success");
        console.log("getSellOrderBook : " + res);
    });
}

function make_sell_order_book( price, volume){
    html = "<tr>\n" +
        "                                            <td>"+ web3.fromWei(parseFloat(price)) + "</td>\n" +
        "                                            <td>"+ web3.fromWei(parseFloat(volume)) +"</td>\n" +
        "                                            <td>" + web3.fromWei(parseFloat(price)) * web3.fromWei(parseFloat(volume)) +"</td>\n" +
        "                                        </tr>";

    return html;
}


function make_my_buy_open_order_book(){
    html = "<tr>\n" +
        "                                            <td>0.00003363</td>\n" +
        "                                            <td>107505.554</td>\n" +
        "                                            <td>3.61541178</td>\n" +
        "                                            <td><button></button>/td>\n" +
        "                                        </tr>";
}

function make_my_sell_open_order_book( price, amount, offset){
    html = "<tr>\n" +
        "                                            <td>"+ web3.fromWei(parseFloat(price)) + "</td>\n" +
        "                                            <td>"+ web3.fromWei(parseFloat(amount)) +"</td>\n" +
        "                                            <td>"+ web3.fromWei(parseFloat(price)) * web3.fromWei(parseFloat(amount)) +"</td>\n" +
        "                                            <td><button offset='"+offset+"'></button>/td>\n" +
        "                                        </tr>";
    return html;
}


async function get_my_order(){
    var _accountNumber = $('#select_account').val();
    var _token = selected_coin_contract_address;

    console.log(_accountNumber + " : ---------------- ::: "+selected_coin_contract_address)
    await able_platform_Contract.getdexAccountSellCount(_accountNumber, _token, async function (err,res){
        if (err) {
            console.log("getBuyOrderBook err : " + err);
            return;
        }
        var html = "";
        for(let i=0; i < res ; i++){
            able_platform_Contract.getAccountSellOrder(_accountNumber, _token , i, async function (err, res){
                if (err) {
                    console.log("getBuyOrderBook err : " + err);
                    return;
                }
                var sell_order_info = res.toString().split(',');

                html += await make_my_sell_open_order_book(sell_order_info[0],sell_order_info[1],sell_order_info[2]);
                console.log(sell_order_info);
            });
        }
        console.log(html);
        $('#my_sell_open_orders').html(html);


    });

}
