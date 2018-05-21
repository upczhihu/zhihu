var btnDisable=false;
var btn=document.getElementById("snsBtn");
btn.onclick=function (ev) {
    if(btnDisable){
        return;
    }
    timeWait(60);
    btnDisable=true;
}
function timeWait(time) {
    setTimeout(function () {
        if(time>=0){
            btn.innerHTML=time+"s后重试";
            time--;
            timeWait(time);
        }else {
            btn.innerHTML="获取验证码";
            btnDisable=false;
        }
    },1000);
}
function sendMessage() {
    // 向后台发送处理数据
     var name=document.getElementById("register_fullname").value;
     var tel=document.getElementById("register_telphone").value;
    var hiddenForm = new FormData();
    hiddenForm.append('uname',name);
    hiddenForm.append('phone',tel);
    $.ajax({
        url  : "http://120.78.149.248:8080/getCode",
        type : "post",
        dataType : 'json',//服务端返回的数据类型
        data : hiddenForm,//发送formdata对象
        cache: false,//由于信息涉及到隐私,禁止浏览器将数据缓存(根据需求使用)
        processData: false, //告诉jQuery不要去处理发送的数据
        contentType: false,
        success : function(result){
            // console.log(result);
            alert("验证码已经成功发送至您的手机！")
        }, error : function () {
            alert("异常！");
        }
    });
}
