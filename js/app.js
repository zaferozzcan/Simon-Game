
// alert("JS IS ON")
// console.log(typeof $());


$(() => {

    let gameStuff = {
        gameFunctions: {
            userClick: (e) => {

                $(e.target).fadeOut(100).fadeIn(100);
                gameStuff.userGuessSeq.push($(e.target).eq(0)[0].classList[1])
                console.log("user move array", gameStuff.userGuessSeq)

                //click sound 
                // gameStuff.gameFunctions.makeSound($(e.target).eq(0)[0].classList[1]);
                var sound = new Audio(`./sounds/${$(e.target).eq(0)[0].classList[1]}.mp3`)
                sound.play()

                gameStuff.gameFunctions.isGameOver()
            },
            seqEffect: (button) => {
                $(button).fadeOut(100).fadeIn(100); //referenced from https://stackoverflow.com/questions/16344354/how-to-make-blinking-flashing-text-with-css-3
            },
            makeSound: (buttonName) => {
                const soundUrl = `sounds/${buttonName}.mp3`
                var sound = new Audio()
                sound.play()
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
                    console.log(randomButton)
                    //sound
                    // gameStuff.gameFunctions.makeSound(randomButton)
                    var sound = new Audio(`./sounds/${randomButton}.mp3`)
                    sound.play()

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

                    //sound 
                    // gameStuff.gameFunctions.makeSound(randomButton)
                    var sound = new Audio(`./sounds/${randomButton}.mp3`)
                    sound.play()

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
                    //sound
                    var sound = new Audio(`./sounds/game-over.mp3`)
                    sound.play()

                    $("#circle").css("display", "none");
                    $(".game-over").remove();
                    $("#container").prepend(`<img  class="game-over" src="./images/download.png">`);
                    $(".progress-container").css("display", "flex");
                    let time = 1;
                    $(".progress-container").append(`<p class="time-check">New Game is Loading...</p>`);

                    //progress
                    setInterval(() => {
                        time += 1
                        $("progress").attr("value", time)
                    }, 1000);

                    setTimeout(() => {
                        $(".progress-container").remove();
                        $(".game-over").remove();
                        $("#circle").css("display", "flex")
                        $(".small-circle-play").removeClass().addClass("small-circle")
                        $(".button-play").eq(0)[0].innerHTML = "PLAY"

                    }, 10000);

                    gameStuff.userGuessSeq.length = 0;
                    gameStuff.gameSeqArray.length = 0;
                    gameStart = false;
                    round = 0;
                }


            }
        },
        buttonArray: ["top-right", "top-left", "bottom-left", "bottom-right"],
        gameSeqArray: [],
        userGuessSeq: [],
    }


    var gameStart = false;
    var round = 1

    // START GAME
    if (!gameStart) {
        $((".button-play")).on("click", () => {
            gameStart = true
            $(".small-circle").removeClass().addClass("small-circle-play");
            $(".button-play").eq(0)[0].innerHTML = round
            if (gameStart) {
                gameStuff.gameFunctions.startGame();//user see seq
            }
        });
    }


});




