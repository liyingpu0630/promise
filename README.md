#### 原生promise的实现

功能包括：
- 异步调用promise resolve的data或者reject的data；
- promise的链式调用；
- promise的穿透功能；</br>
还有待完善的：
- 可以和其他库的promise相互调用等；

#### 实现步骤
- 实现最简单的使用：在then方法中拿到resolve的数据；
```
let Promise = require('./Promise');
let promise = new Promise(function (resolve, reject) {
   resolve('异步+穿透')
});
promise.then(function (data) {
    console.log(data)
});
```
- 可以在then中拿到异步发返回的数据；
```
let Promise = require('./Promise');
let promise = new Promise(function (resolve, reject) {
    setTimeout(function(){
        resolve('异步+穿透')
    })   
});
promise.then(function (data) {
    console.log(data)
});
```
- 支持穿透；

```
let Promise = require('./Promise');
let promise = new Promise(function (resolve, reject) {
    setTimeout(function(){
        resolve('异步+穿透')
    })   
});
promise.then().then(function (data) {
    console.log(data)
});
```
总结：任何一个方法的实现都是一步步完善的过程，都需要从最简单的开始，知道实现一个比较完整的功能。
