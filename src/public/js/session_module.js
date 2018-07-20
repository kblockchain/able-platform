function session_check_module() {

    // session data send
    $.ajax({
        method: "POST",
        url: "/",
        dataType: "json",
        data: {"user_address" : user_address}
        ,success: function (res) {
            console.log("ajx loggin.check : " + res);

            if(res.result == 200) {
                console.log(res.message);

                location.href('/p2pMatching')

            } else if(res.result == 204) {
                console.log(res.message);
            }

        }

    });
}

