function WaitToSetState<T>(setFunction: (value: T) => void, value: T, timeout: number): number {
    return window.setTimeout(function () {
        setFunction(value);
    }, timeout);
}

export default WaitToSetState;
