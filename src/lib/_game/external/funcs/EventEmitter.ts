class EventEmitter {
    public _listeners: { [key: string]: Function[] } = {};
    on(event: string, listener: Function) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(listener);
    }

    once(event: string, listener: Function) {
        this.on(event, function g(...args: any[]) {
            this.off(event, g);
            listener(...args);
        });
    }

    public emit(event: string, ...args: any[]) {
        if (this._listeners[event]) {
            this._listeners[event].forEach(listener => listener(...args));
        }
    }
    addEventListener(event: string, listener: Function) {
        this.on(event, listener);
    }
}

export default EventEmitter;