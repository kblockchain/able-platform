// 스마트 컨트랙트 주소
var contractAddress = '0xde856446a16a7c24a9819767be3d05583aa3063d';

// abi => 블록체인 컨트랙트에 올려져있는 비즈니스 로직 코드에 액세스 하기 위한 인터페이스 (추후 변경 예정)
var abi = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];

var simpleStorageContract; // 컨트랙트 변수
var simpleStorage; // 컨트랙트를 담을 변수

// 메타마스크 불러오기 확인
// 브라우저에서 로딩이 다 되면 실행된다.
var login = document.getElementById('target');
login.addEventListener('click', function() {
    // 메타마스크 또는 미스트가 설치되어 있는지 확인한다.
    if (typeof web3 !== 'undefined') {
        // 메타마스크가 설치 되어 있는 경우
        // web3가 메타마스크 등에 의해 이미 브라우저에 올라와 있다면 web3.currentProvider를 이용해 새 web3 인스턴스를 만듬.
        window.web3 = new Web3(web3.currentProvider);
        console.log("metamask 설치가 되어있습니다.");
    }

    else {
        // 메타마스크가 설치 되어 있지 않은 경우 (예외처리 해주기)
        console.log("metamask 설치가 되어있지 않습니다");
    }

    // 메인 함수 시작 (web3를 통해서 스마트 컨트랙트에 접근 가능해짐)
    startApp();

});

function startApp() {

    // web3 이용해서 스마트 컨트랙트 접근하기
    simpleStorageContract = web3.eth.contract(abi);
    simpleStorage = simpleStorageContract.at(contractAddress);

    // getCoinbase 함수를 이용해서 메타마스크 계좌 정보 가져오기
    // 도큐먼트 참고 주소 https://web3js.readthedocs.io/en/1.0/web3-eth.html?highlight=balance#getbalance
    web3.eth.getCoinbase(function(e, address) {
        web3.eth.getBalance(address, function(e, balances) {

            document.getElementById('accountAddr2').innerHTML = "<input type='button' id='account_address' onclick='copy(this.value)' value='" + address + "' readonly />";
            // web3.fromWei() 메소드는 wei 숫자를 다른 단위로 변환하기 위해 사용 (wei -> ether)
            // web3.toWei() 메소드는 다른 단위를 wei 단위로 변환하기 위해 사 (ether -> wei)
            document.getElementById('accountAddr1').innerHTML += "<span id='account_balances'>" + Number(web3.fromWei(Number(balances), 'ether')).toFixed(2) + "&nbsp;ETH</span>";
        });

        // 이더리움 송금 함수
       web3.ethsend.Transaction(e, function (e, address) {


        });

       var txnHash = web3.eth.sendTransaction({
           from: web3.eth.accounts[0],
           to: web3.eth.accounts[1],
           value: web3.toWei("1", "ether") // 선택사항. 트랜잭션을 위해 전송되는 wei 단위의 값, 컨트랙트 생성 트랜잭션의 경우 기부 금액이다.

       });

    });

    web3.eth.send
}

    
