namespace menuButtons {
    let selected = 0
    let labels: string[] = []

    let action1: (() => void) = null
    let action2: (() => void) = null

    let menuImage: Image = null
    let menuSprite: Sprite = null

    // メニューが表示されている間だけ true
    let active = false

    // Aボタンのイベントを1回だけ登録
    let controlsStarted = false

    // ハイスコア更新回数
    let highScoreCount1 = 0
    let highScoreCount2 = 0

    const MenuKind = SpriteKind.create()

    // ==============================
    // メニューを描画
    // ==============================

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

    // ==============================
    // コントローラー設定
    // ==============================

    function setupControls() {
        if (controlsStarted) {
            return
        }

        controlsStarted = true

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

            // メニューがないときは何もしない
            if (!active) {
                return
            }

            // =================================
            // ここで最初にメニューを無効化
            // =================================
            active = false

            // メニューを消す
            if (menuSprite) {
                menuSprite.destroy()
                menuSprite = null
            }

            menuImage = null

            // =================================
            // 選択したボタンの処理
            // =================================

            if (selected == 0) {
                if (action1) {
                    action1()
                }
            } else {
                if (action2) {
                    action2()
                }
            }

            // ここから先は拡張機能側では
            // Aボタンを処理しない
        })
    }

    // ==============================
    // 2つのボタンを作る
    // ==============================

    //% block="2つのボタンを作る %label1 %label2"
    //% label1.defl="1"
    //% label2.defl="2"
    export function createButtons(label1: string, label2: string) {

        labels = [label1, label2]
        selected = 0
        active = true

        // 以前のメニューがあれば消す
        if (menuSprite) {
            menuSprite.destroy()
            menuSprite = null
        }

        menuImage = image.create(160, 100)

        drawMenu()

        menuSprite = sprites.create(menuImage, MenuKind)

        // 画面中央
        menuSprite.setPosition(80, 60)

        // Bubbleなどより前に表示
        menuSprite.z = 1000

        setupControls()
    }

    // ==============================
    // ボタン1
    // ==============================

    //% block="ボタン1がAで選択されたとき"
    export function button1Selected(action: () => void) {
        action1 = action
    }

    // ==============================
    // ボタン2
    // ==============================

    //% block="ボタン2がAで選択されたとき"
    export function button2Selected(action: () => void) {
        action2 = action
    }

    // ==============================
    // ハイスコアをとった数
    // ==============================

    //% block="ハイスコアをとった数 1"
    export function highScoreCountButton1(): number {
        return highScoreCount1
    }

    //% block="ハイスコアをとった数 2"
    export function highScoreCountButton2(): number {
        return highScoreCount2
    }

    // ==============================
    // ハイスコアを1増やす
    // ==============================

    //% block="1番のハイスコアを1増やす"
    export function addHighScoreCount1() {
        highScoreCount1 += 1
    }

    //% block="2番のハイスコアを1増やす"
    export function addHighScoreCount2() {
        highScoreCount2 += 1
    }

    // ==============================
    // ハイスコアをリセット
    // ==============================

    //% block="1番のハイスコアをとった数を0にする"
    export function resetHighScoreCount1() {
        highScoreCount1 = 0
    }

    //% block="2番のハイスコアをとった数を0にする"
    export function resetHighScoreCount2() {
        highScoreCount2 = 0
    }
}
