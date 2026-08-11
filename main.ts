namespace menuButtons {
    let selected = 0
    let labels: string[] = []
    let buttons: TextSprite[] = []
    let action1: () => void = null
    let action2: () => void = null
    let started = false

    class TextSprite extends sprites.ExtendableSprite {
        constructor(text: string) {
            super(image.create(80, 24))
            this.image.fill(0)
            this.image.print(text, 5, 6)
        }
    }

    function redraw() {
        for (let i = 0; i < buttons.length; i++) {
            let img = image.create(80, 24)
            img.fill(0)

            if (i == selected) {
                img.drawRect(0, 0, 79, 23)
                img.print(">", 4, 6)
                img.print(labels[i], 15, 6)
            } else {
                img.print(labels[i], 15, 6)
            }

            buttons[i].setImage(img)
            buttons[i].setPosition(80, 45 + i * 30)
        }
    }

    //% block="2つのボタンを作る %label1 %label2"
    export function createButtons(label1: string, label2: string) {
        labels = [label1, label2]
        selected = 0

        for (let b of buttons) {
            b.destroy()
        }

        buttons = []

        let button1 = new TextSprite(label1)
        let button2 = new TextSprite(label2)

        buttons.push(button1)
        buttons.push(button2)

        redraw()

        if (!started) {
            started = true

            controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
                selected = 0
                redraw()
            })

            controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
                selected = 1
                redraw()
            })

            controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
                if (selected == 0 && action1) {
                    action1()
                } else if (selected == 1 && action2) {
                    action2()
                }
            })
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
