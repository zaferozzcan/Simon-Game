// alert("JS IS ON")
// console.log(typeof $());


$(() => {

    let gameStuff = {
        gameFunctions: {
            userClick: (e) => {
                $(e.target).fadeOut(100).fadeIn(100);
                gameStuff.userGuessSeq.push($(e.target).eq(0)[0].classList[1])
                console.log("user move array", gameStuff.userGuessSeq)
                // if (gameStuff.userGuessSeq.length === gameStuff.gameSeqArray.length) {
                //     gameStuff.gameFunctions.isGameOver() //checking is game over
                // }
                gameStuff.gameFunctions.isGameOver()
            },
            seqEffect: (button) => {
                $(button).fadeOut(100).fadeIn(100); //referenced from https://stackoverflow.com/questions/16344354/how-to-make-blinking-flashing-text-with-css-3
            },
            createRandom: () => {
                let random = Math.floor(Math.random() * 4)
                return random
            },
            startGame: () => {
                setTimeout(() => {
                    console.log("game starts");
                    console.log(`round:${round}`);
                    let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()]
                    gameStuff.gameFunctions.seqEffect(`.${randomButton}`);
                    gameStuff.gameSeqArray.push(randomButton)
                    console.log("random sequence", gameStuff.gameSeqArray);
                    $(".button").on("click", gameStuff.gameFunctions.userClick);//  user move / click
                    /// after 
                }, 2000)

            },
            makeNewSeq: () => {
                // if game is on 
                setTimeout(() => {
                    console.log(`Making new sequence in round  ${round}`);
                    let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()]
                    gameStuff.gameFunctions.seqEffect(`.${randomButton}`);
                    gameStuff.gameSeqArray.push(randomButton)
                    console.log("random sequence", gameStuff.gameSeqArray);
                    // $(".button").on("click", gameStuff.gameFunctions.userClick);//  user move / click
                    gameStuff.userGuessSeq.length = 0
                }, 2000)

            },
            isGameOver: () => {
                console.log("In isGameOver");
                if (gameStuff.userGuessSeq[round - 1] === gameStuff.gameSeqArray[round - 1]) {
                    console.log("the last added is a match");
                    round++;
                    $(".button-play").eq(0)[0].innerHTML = round;
                    gameStuff.gameFunctions.makeNewSeq()
                } else {
                    console.log("game over");
                    $("#circle").remove()
                    $("#container").prepend(`<img  class="game-over" src="./images/download.png">`)

                }

                // }
            }
        },
        buttonArray: ["top-right", "top-left", "bottom-left", "bottom-right"],
        gameSeqArray: [],
        userGuessSeq: [],
    }


    let gameStart = false;
    let isGameOver = false;
    let round = 1

    // START GAME
    $((".button-play")).on("click", () => {
        gameStart = true
        $(".small-circle").removeClass().addClass("small-circle-play");
        $(".button-play").eq(0)[0].innerHTML = round
        if (gameStart) {
            gameStuff.gameFunctions.startGame();//user see seq
            // console.log("gameSeq array", gameStuff.gameSeqArray);
        }
    });



    // end jq ready method\\
});


















// progressBar: () => {
//     var time = 10; // reference from  http://vaidehijoshi.github.io/blog/2015/01/06/the-final-countdown-using-javascripts-setinterval-plus-clearinterval-methods/
//     setInterval(function () {
//         $(".play").eq(0)[0].innerHTML = time;
//         time--
//         if (time === 0) {
//             console.log("Game is Over!!")
//             $("body").css("background-color");
//         }
//     }, 1000);
// }