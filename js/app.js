// alert("JS IS ON")
// console.log(typeof $());



$(() => {

    let gameStuff = {
        gameFunctions: {
            userClick: (e) => {
                $(e.target).fadeOut(100).fadeIn(100);
                gameStuff.userGuessSeq.push($(e.target).eq(0)[0].classList[1])
                console.log("userGuessSeq", gameStuff.userGuessSeq)
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
                    let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()]
                    gameStuff.gameFunctions.seqEffect(randomButton);
                    gameStuff.gameSeqArray.push(randomButton)
                    console.log("gameSeqArray", gameStuff.gameSeqArray);
                }, 1000)

            },
            makeNewSeq: () => {
                // if game is on 
                let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()]
                gameStuff.gameFunctions.seqEffect(randomButton);
                gameStuff.gameSeqArray.push(randomButton)
            }
        },
        buttonArray: [".top-right", ".top-left", ".bottom-left", ".bottom-right"],
        gameSeqArray: [],
        userGuessSeq: []
    }


    let gameStart = false;
    let round = 1;
    let isGameOver = false;

    // START GAME
    $((".play")).on("click", () => {
        gameStart = true
        $(".small-circle").removeClass().addClass("small-circle-play");
        $(".play").eq(0)[0].innerHTML = round
        if (gameStart) {
            gameStuff.gameFunctions.startSeq();
            console.log(gameStuff.gameSeqArray);
            // here implement a wait time for user move
            $(".button").on("click", gameStuff.gameFunctions.userClick);

        }
    })

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