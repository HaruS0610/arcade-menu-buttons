namespace menuButtons {
    let selected = 0
    let labels: string[] = []
    let action1: () => void = null
    let action2: () => void = null

    function drawMenu() {
        screen.fill(0)

        for (let i = 0; i < labels.length; i++) {
            let y = 40 + i * 30

            if (i == selected) {
                screen.print(">", 20, y)
            }

            screen.print(labels[i], 40, y)
        }
    }

    //% block="2つのボタンを作る %label1 %label2"
    export function createButtons(label1: string, label2: string) {
        labels = [label1, label2]
        selected = 0

        drawMenu()

        controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            selected = 0
            drawMenu()
        })

        controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
            selected = 1
            drawMenu()
        })

        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (selected == 0 && action1) {
                action1()
            } else if (selected == 1 && action2) {
                action2()
            }
        })
    }

    //% block="ボタン1がAで選択されたとき"
    export function button1Selected(action: () => void) {
        action1 = action
    }

    //% block="ボタン2がAで選択されたとき"
    export function button2Selected(action: () => void) {
        action2 = action
    }
}
