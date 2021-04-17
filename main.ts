control.onEvent(EventBusSource.MICROBIT_ID_IO_P8, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
    processYStep(-1)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P0, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
    processXStep(1)
})
function processYStep (directionModifier: number) {
    if (pins.digitalReadPin(DigitalPin.P8) == pins.digitalReadPin(DigitalPin.P12)) {
        Y_ABSOLUTE += directionModifier
    } else {
        Y_ABSOLUTE += -1 * directionModifier
    }
}
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showString("X")
    basic.showNumber(X_ABSOLUTE)
    basic.pause(500)
    basic.showString("Y")
    basic.showNumber(Y_ABSOLUTE)
    basic.pause(500)
    basic.clearScreen()
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P8, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    processYStep(-1)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
    processXStep(-1)
})
input.onButtonPressed(Button.B, function () {
    X_ABSOLUTE = 0
    Y_ABSOLUTE = 0
    basic.clearScreen()
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P0, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    processXStep(1)
})
function processXStep (directionModifier: number) {
    if (pins.digitalReadPin(DigitalPin.P0) == pins.digitalReadPin(DigitalPin.P1)) {
        X_ABSOLUTE += directionModifier
    } else {
        X_ABSOLUTE += -1 * directionModifier
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_IO_P12, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    processYStep(1)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P12, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
    processYStep(1)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    processXStep(-1)
})
let Y_ABSOLUTE = 0
let X_ABSOLUTE = 0
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setEvents(DigitalPin.P0, PinEventType.Edge)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setEvents(DigitalPin.P1, PinEventType.Edge)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setEvents(DigitalPin.P8, PinEventType.Edge)
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
pins.setEvents(DigitalPin.P12, PinEventType.Edge)
X_ABSOLUTE = 0
Y_ABSOLUTE = 0
basic.forever(function () {
    serial.writeValue("x", X_ABSOLUTE)
    serial.writeValue("y", Y_ABSOLUTE)
})
