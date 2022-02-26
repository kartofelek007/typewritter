class TypeMachine {
    #actions = [];
    #text = '';
    #cursorPosition = 0;
    #options = {};

    constructor(cfg) {
        const defaultOpts = {
            onStart : function() {
                console.log("start");
            },
            onStartWrite : function() {},
            onEndWrite : function() {},
            onWrite : function(text, cursorPosition) {
                console.log(text, cursorPosition);
            },
            onEnd : function() {
                console.log("end");
            },
            onStartBack : function() {},
            onEndBack : function() {},
            onEndPause : function() {}
        }
        this.#options = { ...defaultOpts, ...cfg };
    }

    pause(pauseTime = 0) {
        const actionPause = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                this.#options.onEndPause();
                resolve();
            }, pauseTime)
        });
        this.#actions.push(actionPause);
    }

    #typeText(to) {
        this.#options.onWrite(this.#text.slice(0, to), to);
    }

    write(text, speedWriteTime = 0) {
        const actionStartWrite = () => new Promise((resolve, reject) => {
            this.#options.onStartWrite();
            resolve()
        });
        this.#actions.push(actionStartWrite);

        const actionWrite = () => new Promise((resolve, reject) => {
            this.#text += text;

            if (speedWriteTime === 0) {
                this.#cursorPosition += text.length;
                this.#typeText(this.#cursorPosition, speedWriteTime)
                resolve();
            } else {
                const timeInt = setInterval(() => {
                    this.#cursorPosition++;
                    this.#typeText(this.#cursorPosition, speedWriteTime)
                    if (this.#cursorPosition >= this.#text.length) {
                        clearInterval(timeInt);
                        resolve();
                    }
                }, speedWriteTime)
            }
        });

        this.#actions.push(actionWrite);
        const actionEndWrite = () => new Promise((resolve, reject) => {
            this.#options.onEndWrite();
            resolve()
        });

        this.#actions.push(actionEndWrite);
    }

    setText(text) {
        this.#text = text;
    }

    setCount(cursorPosition) {
        if (cursorPosition === "start") this.#cursorPosition = 0;
        if (cursorPosition === "end") this.#cursorPosition = this.#text.length;
        if (cursorPosition !== "start" && cursorPosition !== "end" && !isNaN(cursorPosition)) {
            this.#cursorPosition = Math.min(Math.max(cursorPosition, 0), this.#text.length);
        }
    }

    getCount() {
        return this.#cursorPosition;
    }

    getText() {
        return this.#text;
    }

    back(count = 0, speedWriteTime = 0) {
        const actionStartBack = () => new Promise((resolve, reject) => {
            this.#options.onStartBack();
            resolve()
        });
        this.#actions.push(actionStartBack);

        const actionBack = () => new Promise((resolve, reject) => {
            let tick = 0;
            const timeInt = setInterval(() => {
                if (this.#cursorPosition > 1) {
                    this.#cursorPosition--;
                    tick++;
                    this.#typeText(this.#cursorPosition, speedWriteTime)
                    if (tick >= count) {
                        this.#text = this.#text.substr(0, this.#text.length - tick);
                        clearInterval(timeInt);
                        resolve();
                    }
                } else {
                    this.#text = "";
                    clearInterval(timeInt);
                    resolve();
                }
            }, speedWriteTime)
        });
        this.#actions.push(actionBack);

        const actionEndBack = () => new Promise((resolve, reject) => {
            this.#options.onEndBack();
            resolve()
        });
        this.#actions.push(actionEndBack);
    }

    eraseAll() {
        const action = () => new Promise((resolve, reject) => {
            this.#text = "";
            this.#cursorPosition = 0;
            resolve();
        });
        this.#actions.push(action);
    }

    customAction(cb) {
        const action = () => new Promise((resolve, reject) => {
            cb();
            resolve();
        });
        this.#actions.push(action);
    }

    async start() {
        const actionStart = () => new Promise((resolve, reject) => {
            this.#options.onStart();
            resolve();
        });
        this.#actions.unshift(actionStart);

        const actionEnd = () => new Promise((resolve, reject) => {
            this.#options.onEnd();
            resolve();
        });
        this.#actions.push(actionEnd);

        for (const action of this.#actions) {
            const a = await action();
        }
    }
}