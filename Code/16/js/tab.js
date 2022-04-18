/*
要求：
1: 点击tab栏，可以切换效果
2：点击+ 号,可以添加tab项和内容项
3：点击x号，可以删除当前的tab项和内容项
4：双击tab项文字 或者内容项文字可以修改里面的文字内容
准备
1：获取标题元素
2：获取内容元素
3：获取删除的小按钮x号
4：新建js文件  定义类  添加需要的属性和方法
 */

var that;
class Tab {
  constructor(id){
    // 所有this赋给that
    that = this;
    // 获取最外层div
    this.main = document.querySelector(id);
    // 获取 标题元素 ul
    this.ulTit = this.main.querySelector('.firstnav ul');
    // 获取 内容元素
    this.cons = this.main.querySelector('.tabscon');
    // 获取 添加的按钮
    this.add = this.main.querySelector('.tabadd');

    this.init();
  }

  // 初始化
  init(){
    // 调用
    this.updateNode();

    for(var i = 0; i < this.lis.length; i++){
      this.lis[i].index = i;
      // 给所有li添加点击事件 调用对用函数
      this.lis[i].onclick = this.toggleTab;
      // 给 X 号添加点击事件
      this.remove[i].onclick = this.removeTab;
      // 双击编辑
      this.spans[i].ondblclick = this.editTab;
      this.sections[i].ondblclick = this.editTab;
    }

    // 点击 + 按钮
    this.add.onclick = this.addTab;

  }

  // 动态添加元素， 需要重新获取对应的元素
  updateNode(){
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.remove = this.main.querySelectorAll('.icon-guanbi');
    this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
  }

  // 清空所有li和section的样式
  clearClass(){
    for(var i = 0; i < this.lis.length; i++){
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }

  // 切换
  toggleTab (){
    // 在该函数中 this指向的是 所点击的li元素
    // console.log(this);

    // 调用清空样式
    that.clearClass();
    // 给点击的li以及对应section添加 样式
    this.className = 'liactive';
    that.sections[this.index].className = 'conactive';
  }

  // 添加
  addTab () {
    // 该方法中 this指向的是 +

    // 创建li元素和section元素
    var random = Math.random()
    var li = `
    <li><span>测试${random}</span><span class="iconfont icon-guanbi"></span></li>
    `
    var section = `
    <section>测试${random}</section>
    `
    // 把元素追加到对应的父元素中
    that.ulTit.insertAdjacentHTML('beforeend', li);
    that.cons.insertAdjacentHTML('beforeend', section);
    
    // 重新渲染，让新添加的li、x添加点击事件
    that.init();
  }

  // 删除
  removeTab (e) {
    // 这里的 this 指向的是 X

    // 出现事件冒泡，会执行切换
    e.stopPropagation();  // 阻止事件冒泡
    var index = this.parentNode.index;  //对应点击的x 的父元素的下标
    // 删除
    that.lis[index].remove();
    that.sections[index].remove();

    // 也需要重新渲染,因为删除后 li的下标要发生变化
    // 才能实现下面设置的 删除后的自动选中li
    that.init();

    // 当我们删除的不是选中状态的li的时候，原来的选中li的样式保持不变
    if(document.querySelector('.liactive')) return

    // 当我们删除的是选中状态的li的时候 让它的前一个处于选中状态
    if(index == 0){
      index = 0
    }else{
      index--
    }
    
    console.log(index,1)
    // 自动调用我们的点击事件,选中li
    that.lis[index] && that.lis[index].click()
  }

  // 编辑
  editTab () {
    // 这里 this 指向当前双击的span

    var str = this.innerHTML;
    // 双击静止选定文字 兼容写法
    window.getSelection ? window.getSelection().removeAllRanges : document.selection.empty();
    // 添加 input元素
    this.innerHTML = '<input type="text" />'
    // 往input中添加 str
    var input = this.children[0];
    input.value = str;

    // 选中该文本框中的文本，即焦点于文本框
    input.select();
    // 鼠标失焦,文本框里的值赋值给span
    input.onblur = function(){
      this.parentNode.innerHTML = this.value;
    }
  }
}



new Tab('#tab')