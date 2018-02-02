function Promise(execute) {
    let self = this;
    self.status = 'pending';
    self.data = undefined;
    self.resolveCallbacks = [];
    self.rejectCallbacks = [];

    function resolve(value) {
        if (self.status == 'pending') {
            self.status = 'resolve';
            self.data = value;
            self.resolveCallbacks.forEach(item => item(value))
        }
    }

    function reject(error) {
        if (self.status == 'pending') {
            self.status = 'reject';
            self.data = error;
            self.rejectCallbacks.forEach(item => item(error))
        }
    }

    execute(resolve, reject)
}

Promise.prototype.then = function (onResolve, onReject) {
    let self = this;
    //当没有传递成功或者失败的回调时，需要给个默认函数，把值传递下去。这也是promise穿透的原理
    onResolve = typeof onResolve == 'function' ? onResolve : function (value) {
        return value
    };

    onReject = typeof onReject == 'function' ? onReject : function (error) {
        return error
    };

    if (self.status == 'resolve') {
        return new Promise(function (resolve, reject) {
            try {
                let next = onResolve(self.data);
                resolve(next)
            } catch (e) {
                reject(e)
            }
        })
    }

    if (self.status == 'reject') {
        return new Promise(function (resolve, reject) {
            try {
                let next = onReject(self.data);
                reject(next)
            } catch (e) {
                reject(e)
            }
        })
    }

    if (self.status == 'pending') {
        return new Promise(function (resolve, reject) {
            self.resolveCallbacks.push(function (value) {
                try {
                    resolve(onResolve(value))
                } catch (e) {
                    reject(e)
                }
            });
            self.rejectCallbacks.push(function (error) {
                try {
                    reject(onReject(error))
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
};

module.exports = Promise;