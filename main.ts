namespace menuButtons {
    let selected = 0
    let labels: string[] = []

    let action1: (() => void) = null
    let action2: (() => void) = null

    let menuImage: Image = null
    let menuSprite: Sprite = null

    let active = false
    let started = false

    // 1番・2番のハイスコア更新回数
    let highScoreCount1 = 0
    let highScoreCount2 = 0

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

            // メニューを消す
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

    // ========================================
    // メニュー
    // ========================================

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

    // ========================================
    // ハイスコアをとった数
    // ========================================

    //% block="ハイスコアをとった数 1"
    export function highScoreCountButton1(): number {
        return highScoreCount1
    }

    //% block="ハイスコアをとった数 2"
    export function highScoreCountButton2(): number {
        return highScoreCount2
    }

    // ========================================
    // ハイスコア更新回数を増やす
    // ========================================

    //% block="1番のハイスコアを1増やす"
    export function addHighScoreCount1() {
        highScoreCount1 += 1
    }

    //% block="2番のハイスコアを1増やす"
    export function addHighScoreCount2() {
        highScoreCount2 += 1
    }

    // ========================================
    // ハイスコア更新回数を0にする
    // ========================================

    //% block="1番のハイスコアをとった数を0にする"
    export function resetHighScoreCount1() {
        highScoreCount1 = 0
    }

    //% block="2番のハイスコアをとった数を0にする"
    export function resetHighScoreCount2() {
        highScoreCount2 = 0
    }
}
