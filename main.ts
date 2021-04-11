control.onEvent(EventBusSource.MICROBIT_ID_IO_P8, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
    if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        Y_ABSOLUTE += 1
    } else {
        Y_ABSOLUTE += -1
    }
    led.toggle(2, 0)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P0, EventBusValue.MICROBIT_PIN_EVT_RISE, function () {
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        X_ABSOLUTE += 1
    } else {
        X_ABSOLUTE += -1
    }
    led.toggle(0, 2)
})
input.onButtonPressed(Button.A, function () {
    basic.showString("X")
    basic.showNumber(X_ABSOLUTE)
    basic.showString("Y")
    basic.showNumber(Y_ABSOLUTE)
    led.toggle(0, 0)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P8, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    if (pins.digitalReadPin(DigitalPin.P12) == 0) {
        Y_ABSOLUTE += 1
    } else {
        Y_ABSOLUTE += -1
    }
    led.toggle(2, 0)
})
input.onButtonPressed(Button.B, function () {
    X_ABSOLUTE = 0
    Y_ABSOLUTE = 0
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P0, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
        X_ABSOLUTE += 1
    } else {
        X_ABSOLUTE += -1
    }
    led.toggle(0, 2)
})
let Y_ABSOLUTE = 0
let X_ABSOLUTE = 0
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setEvents(DigitalPin.P0, PinEventType.Edge)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setEvents(DigitalPin.P8, PinEventType.Edge)
X_ABSOLUTE = 0
Y_ABSOLUTE = 0
