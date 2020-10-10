// alert("JS IS ON")
// console.log(typeof $());



$(() => {

    let gameStuff = {
        gameFunctions: {
            buttonClick: (e) => {
                $(e.target).fadeOut(100).fadeIn(100);
                gameStuff.userGuessSeq.push($(e.target))
            },
            seqEffect: (button) => {
                $(button).fadeOut(100).fadeIn(100);
            },
            createRandom: () => {
                let random = Math.floor(Math.random() * 4)
                return random
            },
            startSeq: () => {
                let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()]
                gameStuff.gameFunctions.seqEffect(randomButton);
                gameStuff.gameSeqArray.push(randomButton)
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
            gameStart.gameFunctions.startSeq()
        }
    })


});