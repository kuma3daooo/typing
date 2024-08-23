document.addEventListener('DOMContentLoaded', function () {
    // 変数を定義
    var counter = 0
    var qscounter = 0
    var missCounter = 0
    var startTime 
    var endTime   
    const ques = ["apple", "cat", "bird","suzuki","yamaguchi","html","javascript","css"]
    const startButton = document.getElementById("startButton")
    const vodaiElement = document.getElementById("Vodai")
    const inputElement = document.getElementById("input")
    const missElement = document.getElementById("miss")
    const missMasage = document.getElementById("missMSG")
    const gameTime = document.getElementById("time") 

    // ゲーム開始時の処理
    function startGame() {
        console.log("game start!!")
        counter = 0
        qscounter = 0
        missCounter = 0
        inputElement.textContent = '' 
        vodaiElement.style.display = 'block'
        vodaiElement.textContent = ("お題："+ques[qscounter])
        startButton.disabled = true // 途中でスタートボタンを押されると困るのでゲーム中は非表示
        missElement.style.display='none'
        missMasage.style.display='none'
        gameTime.textContent = '' 

        // ゲーム開始時刻を記録
        startTime = new Date() 
    }

    //キー入力を検知
    document.addEventListener('keydown', function (event) {
        let key = event.key

        // ゲーム終了を判定
        if (qscounter >= ques.length) {
            console.log("finished game!")
            vodaiElement.textContent = "ゲーム終了！！"
            startButton.disabled = false // ゲーム終了後にスタートボタンを再度表示する
            inputElement.style.display='none'
            missElement.textContent = ("ミスは"+missCounter+"回です")
            missElement.style.display='block'
            missMasage.style.display='none'
             // ゲーム終了時刻を記録
            endTime = new Date()

            // 経過時間を計算・表示
            var elapsedTime = (endTime - startTime) / 1000 // ミリ秒を秒に変換
            gameTime.textContent = "経過時間: " + elapsedTime.toFixed(2) + "秒"

            return
        }

        // 入力された文字が正しいか判別
        if (key === ques[qscounter][counter]) {
            //正解時の処理
            console.log('正解')
            counter++
            inputElement.style.display='block'
            missMasage.style.display = 'none'

            // 入力された文字を表示
            inputElement.textContent = ("入力した文字："+key)

            // 文字数カウントのリセットと問題番号の更新
            if (counter >= ques[qscounter].length) {
                console.log('counter reset!!')
                counter = 0
                qscounter++

                // 次の問題に更新
                if (qscounter < ques.length) {
                    vodaiElement.textContent = ("お題："+ques[qscounter])
                    inputElement.style.display='none'
                } else {
                    console.log("finished all questions!")
                    vodaiElement.textContent = "ゲーム終了！！"
                    startButton.disabled = false // 全ての問題が終わったらスタートボタンを表示する
                    missElement.textContent = ("ミスは"+missCounter+"回です")
                    missElement.style.display='block'
                    inputElement.style.display='none'
                    missMasage.style.display='none'
                    
                    endTime = new Date() // ゲーム終了時刻を記録

                    // 経過時間を計算
                    var elapsedTime = (endTime - startTime) / 1000 // ミリ秒を秒に変換
                    gameTime.textContent = "経過時間: " + elapsedTime.toFixed(2) + "秒"
                }
            }
            //不正解時の処理
        } else {
            console.log('不正解')
            inputElement.textContent = ("入力した文字："+key)
            inputElement.style.display='block'
            missCounter++
            missMasage.style.display='block'
            missMasage.textContent = (key+"は間違っています・・・")
        }
    })

    // スタートボタンのクリックイベント
    startButton.addEventListener('click', startGame)
})
