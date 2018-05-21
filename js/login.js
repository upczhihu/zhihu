function login() {
    var tel, name, pass;
    tel = document.getElementById("login_tel").value;
    // name=document.getElementById("login_fullname").value;
    pass = document.getElementById("login_password").value;
    var postdata={
        "username":$("#login_username").val(),
        "password":$("#login_password").val()
    };
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://120.78.149.248:8080/auth",//url
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(postdata),
        // data:{}
        success: function (result) {
            // console.log(result);//打印服务端返回的数据(调试用)
            if (result.code == 0) {
                alert("登录成功！");
                var token=result.data;
                localStorage.setItem("token",token);
            }
        }, error: function (result) {
            alert(result.msg);
        }
    });


}
