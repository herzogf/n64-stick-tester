def on_button_pressed_a():
    basic.show_number(X_ABSOLUTE)
    led.toggle(0, 0)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_microbit_id_io_p0_evt():
    global X_ABSOLUTE
    X_ABSOLUTE += 1
    led.toggle(4, 0)
control.on_event(EventBusSource.MICROBIT_ID_IO_P0,
    EventBusValue.MICROBIT_EVT_ANY,
    on_microbit_id_io_p0_evt)

def on_button_pressed_b():
    global X_ABSOLUTE
    X_ABSOLUTE = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_pulsed_p0_high():
    pass
pins.on_pulsed(DigitalPin.P0, PulseValue.HIGH, on_pulsed_p0_high)

X_ABSOLUTE = 0
pins.set_events(DigitalPin.P0, PinEventType.EDGE)
X_ABSOLUTE = 0

def on_forever():
    pass
basic.forever(on_forever)