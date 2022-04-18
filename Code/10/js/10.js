// 获取减少、数量、增加元素
var reduce = document.querySelectorAll(".reduce");
var add = document.querySelectorAll(".add");
let number = document.querySelectorAll('.number');
// 小计和单价
var total = document.querySelectorAll(".total");
var price = document.querySelectorAll(".price");

// 商品总件数和总价
var totalCount = document.querySelector('#totalCount');
var totalPrice = document.querySelector('#totalPrice');


// 减少商品数量
// 注意: for循环会下执行完循环 再操作事件 所以事件里的i不起作用
//          事件里的i 是循环结束后的值，比如reduce.length的长度为5，i就是5
//      解决办法：给事件对象添加一个属性,属性值为i
//      方法2 ： 运用 let 定义 i
function decline(){
    for(let i = 0; i < reduce.length; i++){
        // reduce[i].index = i;
        // var sum = 0;
        reduce[i].addEventListener('click', function(evt){
            var e = evt || window.event;
            // 找到对应的数量框
            // var number = this.nextElementSibling;
            // 也可以用let 获取number元素
            if(number[i].value > 1){
                // 点击减号 数量自减
                number[i].value--;
                // 计算小计 小计 = 单价 * 数量
                // price.innerText = 5￥， parseInt("5￥") == 5
                total[i].innerText = number[i].value * parseInt(price[i].innerText) + "￥";
            }
            // 每次点击增减商品后 重新计算商品总数和总价
            count()
        });    
    }
}
decline();

// 添加商品数量
function rise(){
    for(let i = 0; i < add.length; i++){
        // add[i].index = i;
        add[i].addEventListener('click', function(evt){
            var e = evt || window.event;
            number[i] = this.previousElementSibling;
            number[i].value++;
            total[i].innerText = number[i].value * parseInt(price[i].innerText) + "￥";
            count();
        })
    }
}
rise();


// 先调用一次 计算还没点击时的总件数和总价
count();


// 总价和总数
function count(){
   // 已选中件数和总价
   var sum = 0;
   var priceAll = 0;
    // 商品删除后 重新获取此时页面上的数量和小计
   let number = document.querySelectorAll(".number");
    let total = document.querySelectorAll(".total");
    // 注意 用let
    for(let i = 0; i < number.length; i++){
        // 总件数 = 每个number相加
        sum += parseInt(number[i].value);
        // console.log(sum);
        totalCount.innerHTML = sum;
        // 总价 = 每个total相加
        priceAll += parseInt(total[i].innerText);
        totalPrice.innerHTML = priceAll + '￥';
    }
    // 当删除最后一条tr后 上面的循环条件不满足 循环不执行 
    // 以致于清空商品后 总价和总件数会是最后删除的那个tr的信息
    // 所以这里再加一个 判断
    if(number.length == 0){
        totalCount.innerHTML = 0;
        totalPrice.innerHTML = 0;
    }
}


// 删除购物车中的商品
var tbody = document.querySelector("tbody");
var del = document.querySelectorAll(".del");

// 给每个删除添加点击事件
for(var i = 0; i < del.length; i++){
    del[i].onclick = function(){
        // 删除tbody中对应点击删除的tr
        tbody.removeChild(this.parentElement.parentElement);
        // 对应的商品总数，总价也要减
        count();
    }
}