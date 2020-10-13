
// alert("JS IS ON")
// console.log(typeof $());


$(() => {

    let gameStuff = {
        gameFunctions: {
            userClick: (e) => {
                $(e.target).fadeOut(100).fadeIn(100);
                gameStuff.userGuessSeq.push($(e.target).eq(0)[0].classList[1])
                console.log("user move array", gameStuff.userGuessSeq)
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
                setTimeout(() => {
                    gameStuff.userGuessSeq.length = 0;
                    round++;
                    $(".button-play").eq(0)[0].innerHTML = round;
                    let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()];
                    gameStuff.gameFunctions.seqEffect(`.${randomButton}`);
                    gameStuff.gameSeqArray.push(randomButton);
                }, 2000)

            },
            isGameOver: () => {
                if (gameStuff.gameSeqArray[gameStuff.userGuessSeq.length - 1] === gameStuff.userGuessSeq[gameStuff.userGuessSeq.length - 1]) {
                    if (gameStuff.userGuessSeq.length === gameStuff.gameSeqArray.length) {
                        setTimeout(() => {
                            gameStuff.gameFunctions.makeNewSeq();
                        }, 2000);
                    }
                } else {
                    console.log("game over!");
                    $("#circle").remove()
                    $("#container").prepend(`<img  class="game-over" src="./images/download.png">`)

                }
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
        }
    });

});




