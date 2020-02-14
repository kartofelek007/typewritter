export default class TypeMachine {
    _actions = [];
    _text = '';
    _count = 0;
    _options = {};

    constructor(cfg) {
        const defaultOpts = {
            onStart : function() {
                console.log("start");
            },
            onStartWrite : function() {},
            onEndWrite : function() {},
            onWrite : function(text, count) {
                console.log(text, count);
            },
            onEnd : function() {
                console.log("end");
            },
            onStartBack : function() {},
            onEndBack : function() {},
            onEndPause : function() {}
        }
        this._options = { ...defaultOpts, ...cfg };
    }

    pause(time = 0) {
        const actionPause = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                this._options.onEndPause();
                resolve();
            }, time)
        });

        this._actions.push(actionPause);
    }

    _typeText(to, time = 0) {
        this._options.onWrite(this._text.slice(0, to), to);
    }

    write(text, time = 0) {
        const actionStartWrite = () => new Promise((resolve, reject) => {
            this._options.onStartWrite();
            resolve()
        });
        this._actions.push(actionStartWrite);

        const actionWrite = () => new Promise((resolve, reject) => {
            this._text += text;
            const timeInt = setInterval(() => {
                this._count++;
                this._typeText(this._count, time)
                if (this._count >= this._text.length) {
                    clearInterval(timeInt);
                    resolve();
                }
            }, time)
        });
        this._actions.push(actionWrite);

        const actionEndWrite = () => new Promise((resolve, reject) => {
            this._options.onEndWrite();
            resolve()
        });
        this._actions.push(actionEndWrite);
    }

    back(count = 0, time = 0) {
        const actionStartBack = () => new Promise((resolve, reject) => {
            this._options.onStartBack();
            resolve()
        });
        this._actions.push(actionStartBack);

        const actionBack = () => new Promise((resolve, reject) => {
            if (count === "erase") {
                count = this._text.length;
            }
            let tick = 0;
            const timeInt = setInterval(() => {
                this._count--;
                tick++;

                this._typeText(this._count, time)

                if (tick >= count) {
                    this._text = this._text.substr(0, this._text.length - tick);
                    clearInterval(timeInt);
                    resolve();
                }
            }, time)
        });
        this._actions.push(actionBack);

        const actionEndBack = () => new Promise((resolve, reject) => {
            this._options.onEndBack();
            resolve()
        });
        this._actions.push(actionEndBack);
    }

    eraseAll(time) {
        this.back("erase", time);
    }

    async start() {
        const actionStart = () => new Promise((resolve, reject) => {
            this._options.onStart();
            resolve();
        });
        this._actions.unshift(actionStart);

        const actionEnd = () => new Promise((resolve, reject) => {
            this._options.onEnd();
            resolve();
        });
        this._actions.push(actionEnd);

        for (const action of this._actions) {
            const a = await action();
        }
    }

}

