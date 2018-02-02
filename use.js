let Promise = require('./Promise');
let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('异步+穿透')
    })


});
promise.then().then(function (data) {
    console.log(data)
});