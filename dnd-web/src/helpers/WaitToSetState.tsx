function WaitToSetState(setFunction: any, value: any, timeout: number) {
    window.setTimeout(function () {
        setFunction(value);
    }, timeout)
}

export default WaitToSetState;