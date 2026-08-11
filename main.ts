namespace menuButtons {
    let selected = 0
    let labels: string[] = []
    let action1: () => void = null
    let action2: () => void = null

    //% block="2つのボタンを作る %label1 %label2"
    export function createButtons(label1: string, label2: string) {
        labels = [label1, label2]
        selected = 0

        controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            selected = 0
            draw()
        })

        controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
            selected = 1
            draw()
        })

        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (selected == 0 && action1) {
                action1()
            }

            if (selected == 1 && action2) {
                action2()
            }
        })

        draw()
    }

    function draw() {
        screen.fill(0)

        for (let i = 0; i < labels.length; i++) {
            let y = 35 + i * 30

            if (i == selected) {
                screen.print(">", 20, y)
            }

            screen.print(labels[i], 35, y)
        }
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
