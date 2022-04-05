//定义初始数组对象
var arr = [
    {id:1001, name:"张三", age: 18, sex:"男", salary:20000, city:"上海"},
    {id:1002, name:"李四", age: 18, sex:"男", salary:10000, city:"北京"},
    {id:1003, name:"王二", age: 18, sex:"男", salary:30000, city:"深圳"}
]

// 将初始数组信息加入表格中
var tbody = document.querySelector('tbody');
render();
// 渲染
function render(){
    // 每次渲染时 将原来的内容清空
    tbody.innerHTML = "";
    // 遍历数组
    for(var i = 0; i < arr.length; i++){
        // 创建一条数据
        var tr = document.createElement('tr');
        // 向tr中填入信息
        // 写法 1
        // tr.innerHTML = "<td>"+ arr[i].id + "</td><td>"+ arr[i].name  +"</td><td>" + arr[i].age +"</td><td>"+ arr[i].sex  +"</td><td>" + arr[i].salary + "</td><td>" + arr[i].city + "</td><td><a href = 'javascript:;' id = '"+ i + "'>删除</a></td>";
        // 写法 2 模板字符串
        tr.innerHTML = `
            <td>${arr[i].id}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].age}</td>
            <td>${arr[i].sex}</td>
            <td>${arr[i].salary}</td>
            <td>${arr[i].city}</td>
            <td><a href = 'javascript:;' id = '"+ ${i}+ "'>删除</a></td>
        `
        tbody.appendChild(tr);
    }
}


// 获取输入信息
var oName = document.querySelector(".name");
var oAge = document.querySelector(".age");
var oSex = document.querySelector(".sex");
var oSalary = document.querySelector(".salary");
var oCity = document.querySelector(".city");

// 添加
var submit = document.querySelector(".submit");
submit.addEventListener('click', add);
function add(evt){
    var e = evt || window.event;
    // 往数组里添加一条一个人的信息
    arr.push({
        id: arr[arr.length - 1].id + 1,
        name: oName.value,
        age: oAge.value,
        sex: oSex.value,
        salary: oSalary.value,
        city: oCity.value
    })
    // 调用添加函数
    render();
}

// 删除操作
tbody.addEventListener('click', function(evt){
    var e = evt || window.event;
    // 事件源
    // console.log(e.target.tagName);  // A
    // 要删除的是数组中的数据
    if(e.target.tagName == "A"){
        // splice 可以用来增删
        // 会改变元素数组
        // splice(下标, 删除几个，添加)
        arr.splice(e.target.id, 1);
    }
    // 重新渲染
    render()
})