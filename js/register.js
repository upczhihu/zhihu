function register() {
    var tel,name,pass;
    tel=document.getElementById("register_telphone").value;
    name=document.getElementById("register_fullname").value;
    pass=document.getElementById("register_password").value;
    // var mytelreg = /^1[3|4|5|8][0-9]\d{4,8}$/;
    var rgx = /^1\d{10,10}$/;
    if(tel==""){
        alert("手机号不能为空");
    }else if(!(rgx.test(tel))){
        alert("手机号格式错误！");
    } else if(name==""){
        alert("用户名不能为空");
    }else if(tel.length>15){
        alert("用户名太长");
    } else if(pass==""){
        alert("密码不能为空");
    } else {
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "http://120.78.149.248:8080/user/reg" ,//url
            data: $("#register_form").serialize(),
            success: function (result) {
                console.log(result);//打印服务端返回的数据(调试用)
                if (result.code == 0) {
                    alert("注册成功！");
                }
            }, error : function () {
                alert("异常！");
            }
        });
    }

}

