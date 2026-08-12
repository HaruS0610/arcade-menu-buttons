namespace menuButtons {
    let selected = 0
    let labels: string[] = []

    let menuImage: Image = null
    let menuSprite: Sprite = null

    let menuActive = false

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

            menuImage.drawRect(25, y, 110, 25, 1)

            if (i == selected) {
                menuImage.print(">", 32, y + 8, 1)
            }

            menuImage.print(labels[i], 50, y + 8, 1)
        }
    }

    //% block="2つのボタンを作る %label1 %label2"
    //% label1.defl="1"
    //% label2.defl="2"
    export function createButtons(label1: string, label2: string) {
        labels = [label1, label2]
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
    }

    //% block="上のボタンを選択"
    export function selectUp() {
        if (!menuActive) {
            return
        }

        selected = 0
        drawMenu()
    }

    //% block="下のボタンを選択"
    export function selectDown() {
        if (!menuActive) {
            return
        }

        selected = 1
        drawMenu()
    }

    //% block="選択中のボタン"
    export function selectedButton(): number {
        return selected + 1
    }

    //% block="メニューを消す"
    export function closeMenu() {
        menuActive = false

        if (menuSprite) {
            menuSprite.destroy()
            menuSprite = null
        }

        menuImage = null
    }

    //% block="メニューが表示中"
    export function isMenuActive(): boolean {
        return menuActive
    }

    //% block="ハイスコアをとった数 1"
    export function highScoreCountButton1(): number {
        return highScoreCount1
    }

    //% block="ハイスコアをとった数 2"
    export function highScoreCountButton2(): number {
        return highScoreCount2
    }

    //% block="1番のハイスコアを1増やす"
    export function addHighScoreCount1() {
        highScoreCount1 += 1
    }

    //% block="2番のハイスコアを1増やす"
    export function addHighScoreCount2() {
        highScoreCount2 += 1
    }

    //% block="1番のハイスコアをとった数を0にする"
    export function resetHighScoreCount1() {
        highScoreCount1 = 0
    }

    //% block="2番のハイスコアをとった数を0にする"
    export function resetHighScoreCount2() {
        highScoreCount2 = 0
    }
}
