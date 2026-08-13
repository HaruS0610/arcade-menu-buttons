namespace menuButtons {
    let selected = 0
    let buttonCount = 2
    let labels: string[] = []

    let action1: (() => void) = null
    let action2: (() => void) = null
    let action3: (() => void) = null
    let action4: (() => void) = null

    let menuImage: Image = null
    let menuSprite: Sprite = null
    let menuActive = false
    let controlsStarted = false

    // ========================================
    // 1～4番のハイスコア
    // ========================================

    let highScore1 = 0
    let highScore2 = 0
    let highScore3 = 0
    let highScore4 = 0

    // 今プレイしているモード
    let playMode = 1

    const MenuKind = SpriteKind.create()

    // ========================================
    // メニュー描画
    // ========================================

    function drawMenu() {
        if (!menuImage) {
            return
        }

        menuImage.fill(0)

        if (buttonCount == 2) {
            for (let i = 0; i < 2; i++) {
                let y = 25 + i * 35

                menuImage.drawRect(25, y, 110, 25, 1)

                if (i == selected) {
                    menuImage.print(">", 32, y + 8, 1)
                }

                menuImage.print(labels[i], 50, y + 8, 1)
            }
        } else {
            for (let i = 0; i < 4; i++) {
                let x = 10 + (i % 2) * 80
                let y = 20 + Math.floor(i / 2) * 40

                menuImage.drawRect(x, y, 65, 28, 1)

                if (i == selected) {
                    menuImage.print(">", x + 4, y + 9, 1)
                }

                menuImage.print(labels[i], x + 20, y + 9, 1)
            }
        }
    }

    // ========================================
    // コントローラー
    // ========================================

    function setupControls() {
        if (controlsStarted) {
            return
        }

        controlsStarted = true

        // 上
        controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!menuActive) {
                return
            }

            if (buttonCount == 2) {
                selected = 0
            } else if (selected >= 2) {
                selected -= 2
            }

            drawMenu()
        })

        // 下
        controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!menuActive) {
                return
            }

            if (buttonCount == 2) {
                selected = 1
            } else if (selected < 2) {
                selected += 2
            }

            drawMenu()
        })

        // 左
        controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!menuActive || buttonCount != 4) {
                return
            }

            if (selected % 2 == 1) {
                selected -= 1
            }

            drawMenu()
        })

        // 右
        controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!menuActive || buttonCount != 4) {
                return
            }

            if (selected % 2 == 0 && selected < 3) {
                selected += 1
            }

            drawMenu()
        })

        // Bで決定
        controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!menuActive) {
                return
            }

            menuActive = false

            // 選択した番号をモードとして保存
            playMode = selected + 1

            if (menuSprite) {
                menuSprite.destroy()
                menuSprite = null
            }

            menuImage = null

            if (selected == 0 && action1) {
                action1()
            } else if (selected == 1 && action2) {
                action2()
            } else if (selected == 2 && action3) {
                action3()
            } else if (selected == 3 && action4) {
                action4()
            }
        })
    }

    // ========================================
    // 2つのボタン
    // ========================================

    //% block="2つのボタンを作る %label1 %label2"
    //% label1.defl="1"
    //% label2.defl="2"
    export function createTwoButtons(
        label1: string,
        label2: string
    ) {
        labels = [label1, label2]
        buttonCount = 2
        selected = 0
        menuActive = true

        if (menuSprite) {
            menuSprite.destroy()
            menuSprite = null
        }

        menuImage = image.create(160, 100)
        drawMenu()

        menuSprite = sprites.create(menuImage, MenuKind)
        menuSprite.setPosition(80, 60)
        menuSprite.z = 1000

        setupControls()
    }

    // ========================================
    // 4つのボタン
    // ========================================

    //% block="4つのボタンを作る %label1 %label2 %label3 %label4"
    //% label1.defl="1"
    //% label2.defl="2"
    //% label3.defl="3"
    //% label4.defl="4"
    export function createFourButtons(
        label1: string,
        label2: string,
        label3: string,
        label4: string
    ) {
        labels = [label1, label2, label3, label4]
        buttonCount = 4
        selected = 0
        menuActive = true

        if (menuSprite) {
            menuSprite.destroy()
            menuSprite = null
        }

        menuImage = image.create(160, 100)
        drawMenu()

        menuSprite = sprites.create(menuImage, MenuKind)
        menuSprite.setPosition(80, 60)
        menuSprite.z = 1000

        setupControls()
    }

    // ========================================
    // ボタン1～4
    // ========================================

    //% block="ボタン1がBで選択されたとき"
    export function button1Selected(action: () => void) {
        action1 = action
    }

    //% block="ボタン2がBで選択されたとき"
    export function button2Selected(action: () => void) {
        action2 = action
    }

    //% block="ボタン3がBで選択されたとき"
    export function button3Selected(action: () => void) {
        action3 = action
    }

    //% block="ボタン4がBで選択されたとき"
    export function button4Selected(action: () => void) {
        action4 = action
    }

    // ========================================
    // 選択中のボタン
    // ========================================

    //% block="選択中のボタン"
    export function selectedButton(): number {
        return selected + 1
    }

    // ========================================
    // メニューを消す
    // ========================================

    //% block="メニューを消す"
    export function closeMenu() {
        menuActive = false

        if (menuSprite) {
            menuSprite.destroy()
            menuSprite = null
        }

        menuImage = null
    }

    // ========================================
    // メニューが表示中
    // ========================================

    //% block="メニューが表示中"
    export function isMenuActive(): boolean {
        return menuActive
    }

    // ========================================
    // ハイスコアをとった数 1～4
    // 実際の中身は各モードのハイスコア
    // ========================================

    //% block="ハイスコアをとった数 1"
    export function highScoreCountButton1(): number {
        return highScore1
    }

    //% block="ハイスコアをとった数 2"
    export function highScoreCountButton2(): number {
        return highScore2
    }

    //% block="ハイスコアをとった数 3"
    export function highScoreCountButton3(): number {
        return highScore3
    }

    //% block="ハイスコアをとった数 4"
    export function highScoreCountButton4(): number {
        return highScore4
    }

    // ========================================
    // ハイスコアを0にする
    // ========================================

    //% block="1番のハイスコアをとった数を0にする"
    export function resetHighScoreCount1() {
        highScore1 = 0
    }

    //% block="2番のハイスコアをとった数を0にする"
    export function resetHighScoreCount2() {
        highScore2 = 0
    }

    //% block="3番のハイスコアをとった数を0にする"
    export function resetHighScoreCount3() {
        highScore3 = 0
    }

    //% block="4番のハイスコアをとった数を0にする"
    export function resetHighScoreCount4() {
        highScore4 = 0
    }

    // ========================================
    // ★クリアしたときに呼ぶ
    // ========================================

    //% block="ハイスコアを更新する"
    export function updateHighScore() {
        let score = info.score()

        if (playMode == 1) {
            if (score > highScore1) {
                highScore1 = score
            }
        } else if (playMode == 2) {
            if (score > highScore2) {
                highScore2 = score
            }
        } else if (playMode == 3) {
            if (score > highScore3) {
                highScore3 = score
            }
        } else if (playMode == 4) {
            if (score > highScore4) {
                highScore4 = score
            }
        }
    }

    // ========================================
    // 現在のモード
    // ========================================

    //% block="現在のモード"
    export function currentMode(): number {
        return playMode
    }
}
