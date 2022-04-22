
// 处理数据
function dealData(data){
    var arr = [];
    for(var i in data){
        var str = i + '=' + data[i];    // i 是 data中的key值
        arr.push(str);
    }
    return arr.join('&');
}


// ajax
function $http(options){
    // 把传过来的对象 转为 查询字符传
    var qs = dealData(options.data);

    // 创建对象
    var xhr = new XMLHttpRequest()  // ajax核心
    // get请求
    if(options.method.toUpperCase() === "GET"){
        xhr.open(options.method, options.url+ '?' + qs);    // 默认异步 true 
        xhr.send();
    }
    // POST请求 需要设置请求头
    else if(options.method.toUpperCase() === "POST"){
        xhr.open(options.method, options.url + '?' + qs);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        console.log(qs);
        xhr.send(qs)
    }

    // 服务器响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            var result = xhr.responseText;
            options.success(result);
        }
    }
}

