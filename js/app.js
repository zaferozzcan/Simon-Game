// alert("JS IS ON")
// console.log(typeof $());


$(() => {

    var gameStuff = {
        gameFunctions: {
            userClick: (e) => {

                $(e.target).fadeOut(100).fadeIn(100);
                gameStuff.userGuessSeq.push($(e.target).eq(0)[0].classList[1])
                console.log("user move array", gameStuff.userGuessSeq)

                //click sound 
                gameStuff.gameFunctions.makeSound($(e.target).eq(0)[0].classList[1]);

                gameStuff.gameFunctions.isGameOver()
            },
            seqEffect: (button) => {
                $(button).fadeOut(100).fadeIn(100); //referenced from https://stackoverflow.com/questions/16344354/how-to-make-blinking-flashing-text-with-css-3
            },
            makeSound: (buttonName) => { //referenced from https://stackoverflow.com/questions/9419263/how-to-play-audio
                const soundUrl = `sounds/${buttonName}.mp3`
                var sound = new Audio(soundUrl)
                sound.play()
            },
            createRandom: () => {
                let random = Math.floor(Math.random() * 4)
                return random
            },
            startGame: () => {
                setTimeout(() => {
                    // console.log("game starts");
                    // console.log(`round:${round}`);
                    let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()]
                    gameStuff.gameFunctions.seqEffect(`.${randomButton}`);
                    console.log(randomButton)
                    //sound
                    gameStuff.gameFunctions.makeSound(randomButton)

                    gameStuff.gameSeqArray.push(randomButton)
                    console.log("random sequence", gameStuff.gameSeqArray);


                }, 500)

            },
            makeNewSeq: () => {
                setTimeout(() => {
                    gameStuff.userGuessSeq.length = 0;
                    round++;
                    $(".button-play").eq(0)[0].innerHTML = round;
                    let randomButton = gameStuff.buttonArray[gameStuff.gameFunctions.createRandom()];
                    gameStuff.gameFunctions.seqEffect(`.${randomButton}`);

                    //sound 
                    gameStuff.gameFunctions.makeSound(randomButton)

                    gameStuff.gameSeqArray.push(randomButton);
                    console.log("random seq array", gameStuff.gameSeqArray)
                }, 500)

            },
            isGameOver: () => {
                console.log("in is game over");
                if (gameStuff.gameSeqArray[gameStuff.userGuessSeq.length - 1] === gameStuff.userGuessSeq[gameStuff.userGuessSeq.length - 1]) {
                    console.log("in first check");
                    if (gameStuff.userGuessSeq.length === gameStuff.gameSeqArray.length) {
                        console.log(" in second check ");
                        setTimeout(() => {
                            gameStuff.gameFunctions.makeNewSeq();
                        }, 0);
                    }
                } else {
                    console.log("game over!");
                    //sound
                    var sound = new Audio(`./sounds/game-over.mp3`)
                    sound.play()

                    gameStuff.gameFunctions.afterGameOver()
                    //progress
                    let time = 1;
                    setInterval(() => {   // referenced from https://www.tutorialrepublic.com/html-reference/html5-progress-tag.php
                        time += 2
                        $("progress").attr("value", time)
                        if (time >= 10) {
                            clearInterval()
                        }
                    }, 1000);
                    $("#container").append($(`<h1 class="score">Your score: ${round}</h1>`))
                    $("#container").append($(`<h1 class="score">Highest score: ${higestScore <= round ? round : higestScore}</h1>`))
                    setTimeout(() => {
                        $(".progress-container").remove();
                        $(".score").remove()
                        $(".game-over").remove();
                        $("#circle").css("display", "flex")
                        $(".small-circle-play").removeClass().addClass("small-circle")
                        $(".button-play").eq(0)[0].innerHTML = "PLAY"
                    }, 5000);


                    gameStuff.gameSeqArray.length = 0;
                    gameStuff.userGuessSeq.length = 0;
                    gameStart = false;
                    round = 1;
                }
            },
            afterGameOver: () => {
                $("#circle").css("display", "none");
                $(".game-over").remove();
                $(".modal-buttons").remove();
                $("#container").prepend(`<img  class="game-over" src="./images/download.png">`);
                $(".progress-container").css("display", "flex");
                $(".progress-container").append(`<p class="time-check">New Game is Loading...</p>`);
            }
        },
        buttonArray: ["top-right", "top-left", "bottom-left", "bottom-right"],
        gameSeqArray: [],
        userGuessSeq: [],
    }
    $(".button").on("click", gameStuff.gameFunctions.userClick);//  user move / click
    var gameStart = false;
    var round = 1
    var higestScore = 0
    // START GAME
    $((".button-play")).on("click", () => {
        if (!gameStart) {
            $()
            gameStart = true;
            gameStuff.gameSeqArray.length = 0;
            round = 1
            $(".small-circle").removeClass().addClass("small-circle-play");
            $(".button-play").eq(0)[0].innerHTML = round
            gameStuff.gameFunctions.startGame();
        }

    });


    $(".modal-buttons").click(function () {  ///   referenced from https://git.generalassemb.ly/seir-9-21/student-resources/tree/master/1_front_end_development/w03d02/morning_exercise
        $(".modal-buttons").css("display", "none");
        $(".modal").css("display", "block");
        $("#container-items").css("display", "none");

    })

    $("span").click(function () {
        $(".modal").css("display", "none");
        $(".modal-buttons").css("display", "block");
        $("#container-items").css("display", "flex");
    })

});




