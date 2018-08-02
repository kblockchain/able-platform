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
    able_platform_Contract.getBuyOrderBook(_token, function (err, res) {

        if (err) {
            console.log("getBuyOrderBook err : " + err);
            return;
        }

        console.log("getBuyOrderBook success");
        console.log("getBuyOrderBook res : " + res);


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

        console.log("getSellOrderBook success");
        console.log("getSellOrderBook : " + res);
    });
}