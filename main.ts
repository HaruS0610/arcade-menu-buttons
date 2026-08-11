namespace menuButtons {
    let selected = 0
    let labels: string[] = []

    let action1: (() => void) = null
    let action2: (() => void) = null

    let menuImage: Image = null
    let menuSprite: Sprite = null

    let active = false
    let started = false

    const MenuKind = SpriteKind.create()

    function drawMenu() {
        if (!menuImage) {
            return
        }

        menuImage.fill(0)

        for (let i = 0; i < 2; i++) {
            let y = 25 + i * 35

            // ボタンの枠
            menuImage.drawRect(25, y, 110, 25, 1)

            // 選択中のカーソル
            if (i == selected) {
                menuImage.print(">", 32, y + 8, 1)
            }

            // ボタンの文字
            menuImage.print(labels[i], 50, y + 8, 1)
        }
    }

    function setupControls() {
        if (started) {
            return
        }

        started = true

        // 上
        controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!active) {
                return
            }

            selected = 0
            drawMenu()
        })

        // 下
        controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!active) {
                return
            }

            selected = 1
            drawMenu()
        })

        // Aボタン
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!active) {
                return
            }

            // 先にメニューを消す
            active = false

            if (menuSprite) {
                menuSprite.destroy()
                menuSprite = null
            }

            menuImage = null

            // 選択したボタンの処理
            if (selected == 0 && action1) {
                action1()
            } else if (selected == 1 && action2) {
                action2()
            }
        })
    }

    //% block="2つのボタンを作る %label1 %label2"
    //% label1.defl="1"
    //% label2.defl="2"
    export function createButtons(label1: string, label2: string) {
        labels = [label1, label2]
        selected = 0
        active = true

        menuImage = image.create(160, 100)

        drawMenu()

        if (menuSprite) {
            menuSprite.destroy()
        }

        menuSprite = sprites.create(menuImage, MenuKind)
        menuSprite.setPosition(80, 60)
        menuSprite.z = 1000

        setupControls()
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
