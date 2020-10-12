// alert("JS IS ON")
// console.log(typeof $());



$(() => {

    let gameStuff = {
        gameFunctions: {
            userClick: (e) => {
                $(e.target).fadeOut(100).fadeIn(100);
                gameStuff.userGuessSeq.push($(e.target).eq(0)[0].classList[1])
                console.log("user move", gameStuff.userGuessSeq)
                gameStuff.gameFunctions.isGameOver() //checking is game over
            },
            seqEffect: (button) => {
                $(button).fadeOut(100).fadeIn(100);
            },
            createRandom: () => {
                let random = Math.floor(Math.random() * 4)
                return random
            },
            startSeq: () => {
                setTimeout(() => {
                    console.log("game starts");
                    console.log(`round:${round}`);
                    let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()]
                    gameStuff.gameFunctions.seqEffect(`.${randomButton}`);
                    gameStuff.gameSeqArray.push(randomButton)
                    console.log("random sequence", gameStuff.gameSeqArray);
                    $(".button").on("click", gameStuff.gameFunctions.userClick);//  user move / click
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
                    $(".button").on("click", gameStuff.gameFunctions.userClick);//  user move / click

                }, 2000)

            },
            isGameOver: () => {
                console.log("In isGameOver");

                if (gameStuff.userGuessSeq.length === gameStuff.gameSeqArray.length) {
                    for (var i = 0; i < gameStuff.userGuessSeq.length; i++) {
                        if (gameStuff.userGuessSeq[i] === gameStuff.gameSeqArray[i]) {
                            console.log(`sequence ${i} is a match`);
                        } else {
                            console.log("Game Over");
                            return
                        }
                    }
                    round++;
                    $(".play").eq(0)[0].innerHTML = round;
                    gameStuff.gameFunctions.makeNewSeq()
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
    $((".play")).on("click", () => {
        gameStart = true
        $(".small-circle").removeClass().addClass("small-circle-play");
        $(".play").eq(0)[0].innerHTML = round
        if (gameStart) {
            gameStuff.gameFunctions.startSeq();//user see seq
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