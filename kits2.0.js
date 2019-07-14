// 自调用函数
;(function(){
// $()函数形式要简写成这样需要处理一下,让jQuery变成window的一个属性,使其调用能用$或jQuery；
window.$=window.jQuery=jQuery;
// 选择器的编写,一般调用函数：函数名（数值）
function jQuery(selector){
   /*  本来直接写选择器返回的结果，但是我们的库的方法要封装在对象里面，
    函数功能都放在原型里面调用，所以我们直接返回：调用实例对象的方法 */
    return new jQueryInit(selector);
}
// 对象的 构造函数：
function jQueryInit(selector){
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











})();