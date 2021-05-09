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
input.onButtonPressed(Button.B, function () {
    X_ABSOLUTE = 0
    Y_ABSOLUTE = 0
    basic.clearScreen()
})
let YB_NEW_STATE = 0
let YA_NEW_STATE = 0
let XB_NEW_STATE = 0
let XA_NEW_STATE = 0
let Y_ABSOLUTE = 0
let X_ABSOLUTE = 0
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
X_ABSOLUTE = 0
let X_ABSOLUTE_SENT = 0
let XA_OLD_STATE = pins.digitalReadPin(DigitalPin.P0)
let XB_OLD_STATE = pins.digitalReadPin(DigitalPin.P1)
Y_ABSOLUTE = 0
let Y_ABSOLUTE_SENT = 0
let YA_OLD_STATE = pins.digitalReadPin(DigitalPin.P8)
let YB_OLD_STATE = pins.digitalReadPin(DigitalPin.P12)
let COUNTER = 0
basic.forever(function () {
    while (true) {
        COUNTER += 1
        if (input.buttonIsPressed(Button.B)) {
            X_ABSOLUTE = 0
            Y_ABSOLUTE = 0
        }
        XA_NEW_STATE = pins.digitalReadPin(DigitalPin.P0)
        XB_NEW_STATE = pins.digitalReadPin(DigitalPin.P1)
        YA_NEW_STATE = pins.digitalReadPin(DigitalPin.P8)
        YB_NEW_STATE = pins.digitalReadPin(DigitalPin.P12)
        if (XA_NEW_STATE != XA_OLD_STATE) {
            if (XA_NEW_STATE == XB_NEW_STATE) {
                X_ABSOLUTE += 1
            } else {
                X_ABSOLUTE += -1
            }
            COUNTER = 0
        } else if (XB_NEW_STATE != XB_OLD_STATE) {
            if (XA_NEW_STATE != XB_NEW_STATE) {
                X_ABSOLUTE += 1
            } else {
                X_ABSOLUTE += -1
            }
            COUNTER = 0
        }
        if (YA_NEW_STATE != YA_OLD_STATE) {
            if (YA_NEW_STATE != YB_NEW_STATE) {
                Y_ABSOLUTE += 1
            } else {
                Y_ABSOLUTE += -1
            }
            COUNTER = 0
        } else if (YB_NEW_STATE != YB_OLD_STATE) {
            if (YA_NEW_STATE == YB_NEW_STATE) {
                Y_ABSOLUTE += 1
            } else {
                Y_ABSOLUTE += -1
            }
            COUNTER = 0
        }
        XA_OLD_STATE = XA_NEW_STATE
        XB_OLD_STATE = XB_NEW_STATE
        YA_OLD_STATE = YA_NEW_STATE
        YB_OLD_STATE = YB_NEW_STATE
        if (COUNTER >= 50000) {
            COUNTER = 0
            if (X_ABSOLUTE != X_ABSOLUTE_SENT || Y_ABSOLUTE != Y_ABSOLUTE_SENT) {
                serial.writeValue("x", X_ABSOLUTE)
                serial.writeValue("y", Y_ABSOLUTE)
                X_ABSOLUTE_SENT = X_ABSOLUTE
                Y_ABSOLUTE_SENT = Y_ABSOLUTE
            }
        }
    }
})
