// 自调用函数
;(function(){
// $()函数形式要简写成这样需要处理一下,让jQuery变成window的一个属性,使其调用能用$或jQuery；
window.$=window.jQuery=jQuery;
// 选择器的编写,一般调用函数：函数名（数值）
function jQuery(selector){
   /*  本来直接写选择器返回的结果，但是我们的库的方法要封装在对象里面，
    函数功能都放在原型里面调用，所以我们直接返回：调用实例对象的方法 */
    return new Init(selector);
}
// 对象的 构造函数：
function Init(selector){
    // 通过原生的js获取的dow是一个NodeList的伪数组现在啊哟转化为我自己的伪数组
    let dow=document.querySelectorAll(selector);
    // 不管你通过选择器获取的是一位还是多位元素，甚至没有元素，我也要创建一个伪数组
    for(let i=0;i<dow.length;i++){
        this[i]=dow[i];
    }
    // 也要输出数组长度，0也要
    this.length=dow.length
}

// 封装方法在原型里面

// 封装函数遍历
// Array,foreach((e,i)=>{
//     console.log(e)
// })
Init.prototype.foreach=function(eachnumber){
    for(let i=0;i<eachnumber.length;i++){
        eachnumber(i,this[i])
    }
}


// 函数的css样式设置和获取

Init.prototype.css=function(property,value){
    // 如果只有一位数输入，那么就是获取属性的值，value就是undefined
    if(value==undefined){
         return window.getComputedStyle(this[0]) [property]      
    }else{
        // 定义一个需要带px单位的属性名
        let pxarr=['width','height','top','left','margin','padding']
        // 把给到需要改样式的数组都遍历一遍，设置他的css样式，只有一个也没关系
        for(let i=0;i<this.length;i++){
        /* 判断给到的数据是否有在数组pxarr中,如果是-1就是没有找到，有这个
        在数组能找到的话就返回这个元素在数组中的索引，在这里就是用来判断是否存在
        的判断 */
        if (pxarr.indexOf(property)!==-1){
            // 需要带单位
            // 带单位还要判断本身输入要设置的值是否自带px单位
        if(value.toString().indexOf('px')===-1){
            // 输入是纯数字,没有px
            this[i].style[property]=value+'px'
        }else{
            // 输入还有单位
            this[i].style[property]=value;
        }  
        }else{
            // 不需要带单位
            this[i].style[property]=value;
        }
    }
    // 实现链式编程
    return this;
}
}











})();