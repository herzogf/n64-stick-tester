def processYStep(directionModifier: number):
    global Y_ABSOLUTE
    if pins.digital_read_pin(DigitalPin.P8) == pins.digital_read_pin(DigitalPin.P12):
        Y_ABSOLUTE += directionModifier
    else:
        Y_ABSOLUTE += -1 * directionModifier

def on_button_pressed_a():
    basic.clear_screen()
    basic.show_string("X")
    basic.show_number(X_ABSOLUTE)
    basic.pause(500)
    basic.show_string("Y")
    basic.show_number(Y_ABSOLUTE)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global X_ABSOLUTE, Y_ABSOLUTE
    X_ABSOLUTE = 0
    Y_ABSOLUTE = 0
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_pressed_b)

def processXStep(directionModifier: number):
    global X_ABSOLUTE
    if pins.digital_read_pin(DigitalPin.P0) == pins.digital_read_pin(DigitalPin.P1):
        X_ABSOLUTE += directionModifier
    else:
        X_ABSOLUTE += -1 * directionModifier
YB_NEW_STATE = 0
YA_NEW_STATE = 0
XB_NEW_STATE = 0
XA_NEW_STATE = 0
Y_ABSOLUTE = 0
X_ABSOLUTE = 0
pins.set_pull(DigitalPin.P0, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P1, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P8, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P12, PinPullMode.PULL_UP)
X_ABSOLUTE = 0
XA_OLD_STATE = pins.digital_read_pin(DigitalPin.P0)
XB_OLD_STATE = pins.digital_read_pin(DigitalPin.P1)
Y_ABSOLUTE = 0
YA_OLD_STATE = pins.digital_read_pin(DigitalPin.P8)
YB_OLD_STATE = pins.digital_read_pin(DigitalPin.P12)
COUNTER = 0

def on_forever():
    global XA_NEW_STATE, XB_NEW_STATE, YA_NEW_STATE, YB_NEW_STATE, X_ABSOLUTE, Y_ABSOLUTE, XA_OLD_STATE, XB_OLD_STATE, YA_OLD_STATE, YB_OLD_STATE, COUNTER
    while True:
        XA_NEW_STATE = pins.digital_read_pin(DigitalPin.P0)
        XB_NEW_STATE = pins.digital_read_pin(DigitalPin.P1)
        YA_NEW_STATE = pins.digital_read_pin(DigitalPin.P8)
        YB_NEW_STATE = pins.digital_read_pin(DigitalPin.P12)
        if XA_NEW_STATE != XA_OLD_STATE:
            if XA_NEW_STATE == XB_NEW_STATE:
                X_ABSOLUTE += 1
            else:
                X_ABSOLUTE += -1
        elif XB_NEW_STATE != XB_OLD_STATE:
            if XA_NEW_STATE != XB_NEW_STATE:
                X_ABSOLUTE += 1
            else:
                X_ABSOLUTE += -1
        if YA_NEW_STATE != YA_OLD_STATE:
            if YA_NEW_STATE == YB_NEW_STATE:
                Y_ABSOLUTE += 1
            else:
                Y_ABSOLUTE += -1
        elif YB_NEW_STATE != YB_OLD_STATE:
            if YA_NEW_STATE != YB_NEW_STATE:
                Y_ABSOLUTE += 1
            else:
                Y_ABSOLUTE += -1
        XA_OLD_STATE = XA_NEW_STATE
        XB_OLD_STATE = XB_NEW_STATE
        YA_OLD_STATE = YA_NEW_STATE
        YB_OLD_STATE = YB_NEW_STATE
        COUNTER += 1
        if COUNTER >= 1000:
            COUNTER = 0
            serial.write_value("x", X_ABSOLUTE)
            serial.write_value("y", Y_ABSOLUTE)
basic.forever(on_forever)
