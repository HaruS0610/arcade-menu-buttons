namespace menuButtons {
    let labels: string[] = []
    let selected = 0
    let menuImage: Image = null
    let handlers: (() => void)[] = []
    let started = false

    function redraw() {
        if (!menuImage) return

        menuImage.fill(0)

        for (let i = 0; i < labels.length; i++) {
            let y = 25 + i * 28
            let x = 40

            menuImage.print(labels[i], x + 5, y + 4)

            if (i == selected) {
                menuImage.drawRect(x - 4, y - 4, 48, 18)
                menuImage.print(">", x - 14, y + 4)
            }
        }
    }

    function setupControls() {
        if (started) return
        started = true

        controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            if (labels.length > 0) {
                selected = (selected + labels.length - 1) % labels.length
                redraw()
            }
        })

        controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
            if (labels.length > 0) {
                selected = (selected + 1) % labels.length
                redraw()
            }
        })

        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (selected < handlers.length && handlers[selected]) {
                handlers[selected]()
            }
        })
    }

    //% block="2つのボタンを作る $label1 $label2"
    //% label1.defl="1"
    //% label2.defl="2"
    export function createTwoButtons(label1: string, label2: string) {
        labels = [label1, label2]
        handlers = [null, null]
        selected = 0

        menuImage = image.create(160, 120)
        scene.setBackgroundImage(menuImage)

        redraw()
        setupControls()
    }

    //% block="ボタン1がAで選択されたとき"
    export function onButton1Selected(handler: () => void) {
        handlers[0] = handler
        setupControls()
    }

    //% block="ボタン2がAで選択されたとき"
    export function onButton2Selected(handler: () => void) {
        handlers[1] = handler
        setupControls()
    }
}
