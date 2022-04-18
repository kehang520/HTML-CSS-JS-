// 用户名验证
var username = document.querySelector("[name=username]");     //获取属性且值位username

// 事件监听 对象发生改变时就调用
username.addEventListener('change', verifyName);
function verifyName(){
    // 获取下一个兄弟节点
    var hint = username.nextElementSibling;
    // 定义re表达式
    var reg = /^\w{6,10}$/;

    // 如果使用new RegExp的方式 \需要转义 即前面还要加一个\
    // var reg = new RegExp('^\\w{6,10}$');
    
    // 当输入字符串不符合正则时
    if(!reg.test(username.value)){
        hint.innerHTML = "用户名长度为6到10个字符";
        // 不添加return 后面代码就还会执行 导致hint中报错文本就变为空
        return false;
    }
    hint.innerHTML = "";
    return true;
}

// 电话输入
var phone = document.querySelector("[name=phone]");
phone.addEventListener('change', verifyPhone);
function verifyPhone(){
    var hint = phone.nextElementSibling;
    // 使用 new RegExp 注意\的转移问题
    var reg = new RegExp('^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$');
    if(!reg.test(phone.value)){
        hint.innerHTML = "请输入正确的手机号";
        return false;
    }
    hint.innerHTML = "";
    return true;
}

//  短信验证
var verify = document.querySelector("[name=verify]");
verify.addEventListener('change', verifyMessage);
function verifyMessage(){
    var hint = verify.nextElementSibling;
    var reg = /^\d{6}$/;
    if(!reg.test(verify.value)){
        hint.innerHTML = "请输入正确的验证码";
        return false;
    }
    hint.innerHTML = "";
    return true;
}

// 密码设置
var password = document.querySelector("[name=password]");
password.addEventListener('change', verifyPassword);
function verifyPassword(){
    var hint = password.nextElementSibling;
    var reg = /^[a-zA-Z]\w{5,17}$/;
    if(!reg.test(password.value)){
        hint.innerHTML = "请输入正确的密码";
        return false;
    }
    hint.innerHTML = "";
    return true;
}

// 密码确认
var confirm = document.querySelector("[name=confirm]");
confirm.addEventListener('change', verifyConfirm);
function verifyConfirm(){
    var hint = confirm.nextElementSibling;
    // var reg = /^[a-zA-Z]\w{5,17}$/;
    if(confirm.value != password.value){
        hint.innerHTML = "两次输入不一致";
        return false;
    }else if(confirm.value == ''){
        hint.innerHTML = "请再次确认密码";
    }
    hint.innerHTML = "";
    return true;
}

// 协议确认
var iconfont = document.getElementsByClassName("iconfont")[0];
// 开关
var isShow = true;
iconfont.addEventListener('click', function(){
    // 写法1
    // h5为每一个元素新增了classList对象 ，保存着控制当前元素类名的各个方法和属性
    // toggle  在元素中切换类名
    // iconfont.classList.toggle("icon-queren2");

    // 写法2
    // this 表示当前绑定事件的元素
    // this.classList.toggle("icon-queren2");

    // 写法3
    // 设置开关
    if(isShow){
        this.classList.replace("icon-queren", "icon-queren2");
        return true;
    }else{
        this.classList.replace("icon-queren2", "icon-queren");
    }
    isShow = !isShow;
})

// 短信发送
var code = document.getElementsByClassName("code")[0];
code.addEventListener('click', send);
function send(){
    if(verifyPhone()){
        code.innerHTML = "5秒后可重新发送";
        var num = 5;
        var set = setInterval(function(evt){
            var e = evt || window.event;
            num --;
            code.innerHTML = num + "秒后可重新发送";
            if(!num > 0){
                clearInterval(set);
                code.innerHTML = "再次发送";
            }
        },1000)
    }else{
        phone.nextElementSibling.innerHTML = "请输入号码";
    }
    
}


// 提交
var form = document.querySelector("form");
form.addEventListener('submit', function(evt){
    var e = evt || window.event;
    // 阻止默认提交
    if(!verifyName()){
        e.preventDefault();
    }
    if(!verifyPhone()){
        e.preventDefault();
    }
    if(!verifyMessage()){
        e.preventDefault();
    }
    if(!verifyPassword()){
        e.preventDefault();
    }
    if(!verifyConfirm()){
        e.preventDefault();
    }
    if (!iconfont.classList.contains('icon-queren2')){
        alert('请勾选同意协议');
        e.preventDefault();
    }
})


