input.onButtonPressed(Button.A, function () {
    basic.showNumber(X_ABSOLUTE)
    led.toggle(0, 0)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P0, EventBusValue.MICROBIT_EVT_ANY, function () {
	
})
pins.onPulsed(DigitalPin.P0, PulseValue.Low, function () {
    X_ABSOLUTE += 1
    led.toggle(4, 0)
})
input.onButtonPressed(Button.B, function () {
    X_ABSOLUTE = 0
})
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    X_ABSOLUTE += 1
    led.toggle(4, 0)
})
let X_ABSOLUTE = 0
pins.setEvents(DigitalPin.P0, PinEventType.Edge)
X_ABSOLUTE = 0
basic.forever(function () {
	
})
