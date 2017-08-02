var FastTyping = function () {


    const STATE_REGISTER = 'registration state',
        STATE_LEVEL = 'level selection state',
        STATE_GAME = 'game state',
        STATE_END = 'game over state';

    var name,
        lastState,
        level,
        score;


    // -------------------------------Register name logic--------------------------------------------


    var RegisterLogic = function () {

        var view = $('#register');
        var registerButton = $('#register-button');
        var registerInput = $('#register-input');

        this.show = function () {
            view.removeClass('invisible');
            enableReg();
        };

        this.hide = function () {
            view.addClass("invisible");
            disableReg();
        };

        function enableReg() {

            registerInput.keyup(function () {
                if (registerInput.val().length >= 3) {
                    registerButton.attr('disabled', false)
                } else {
                    registerButton.attr('disabled', true)
                }
            });

            registerButton.click(function () {
                name = registerInput.val();
                changeState(STATE_LEVEL);
            });
        }

        function disableReg() {

            registerInput.val('');
            registerInput.unbind();
            registerButton.unbind();
        }
    };

    var register = new RegisterLogic();


    // -------------------------------Select level logic--------------------------------------------

    var LevelLogic = function () {

        var view = $('#selectLevel'),
            levelButton = $('#selectLevel-button'),
            welcomeUser = $('#welcome-user');

        this.show = function () {
            view.removeClass('invisible')
            welcomeUser.html('<h3>Player ' + name + '</h3>');
            enableLevel();
        };

        this.hide = function () {
            view.addClass('invisible');
            disableLevel();
        };

        function enableLevel() {

            levelButton.click(function () {

                level = $('input[name = gamePlay]:checked').val();
                changeState(STATE_GAME);
            })


        }

        function disableLevel() {
            levelButton.unbind();
            // level = $('input[name = gamePlay]').val('');
        }
    };

    //TODO: reset radio box value

    var levelSelect = new LevelLogic();

    // -------------------------------Game logic--------------------------------------------

    var GameLogic = function () {

        var view = $('#game');
        var letters = 'abcdefghijklmnopqrstuvwxyz',
            timeOut,
            letterKey,
            letterShow = $('h2'),
            lifeCount,
            userInput,
            userLevel = $('#user-level'),
            letterAppearance,
            keyUpTime,
            timeAmount,
            isGolden;


        this.show = function () {
            lifeCount = 3;
            $('#life').html(lifeCount);
            userInput = true;
            score = 0;
            view.removeClass('invisible');
            userLevel.html('<h6>Player ' + name + ' , you have ' + level + ' s to type the letter</h6>');
            changeLetter();
            enable();
        };

        this.hide = function () {
            view.addClass('invisible');
            disable();
        };

        function updateScore() {

            if (isGolden) {
                isGolden = false;
                for (i = 0; i < 5; i++) {
                    updateScore();
                }
            } else {
                score += 1;
            }

            if (score % 20 === 0) {

                lifeCount += 1;
                $('#life').html(lifeCount);
            }

            $('#score').html(score);
        }


        function removeLife() {

            lifeCount -= 1;
            $('#life').html(lifeCount);

            if (lifeCount === 0)
                changeState(STATE_END);
        }

        function enable() {
            $(window).keyup(
                function (e) {

                    if (e.key === letters[letterKey]) {
                        updateScore()
                    } else {
                        removeLife()
                    }

                    keyUpTime = Date.now();

                    userInput = true;
                    changeLetter();

                    timeAmount = (letterAppearance - keyUpTime);
                    console.log(keyUpTime, letterAppearance, timeAmount);

                }
            )
        }

        function disable() {
            $(window).unbind();
            clearTimeout(timeOut);
        }

        function changeLetter() {


            if (!userInput) {
                removeLife();
            }
            clearTimeout(timeOut);


            if (lifeCount <= 0) {
                return;

            }
            if (Math.random() < 0.1) {
                isGolden = true;
                letterShow.addClass('golden');

            } else {
                isGolden = false;
                letterShow.removeClass('golden');
            }
            userInput = false;
            timeOut = setTimeout(changeLetter, level * 1000);
            letterKey = Math.round(Math.random() * (letters.length - 1));
            letterShow.html(letters[letterKey]);

            letterAppearance = Date.now();
        }


    };

    var game = new GameLogic();
    // -------------------------------Game over --------------------------------------------
    var GameOverLogic = function () {
        var view = $('#gameOver');
        var registerButton = $('#playAgain');

        this.show = function () {
            view.removeClass('invisible');
            // console.log(score)
            $('#lastScore').html(score);
        };

        this.hide = function () {
            view.addClass("invisible");
            disable();

        };

        registerButton.click(function () {
            changeState(STATE_REGISTER);
        });

        function disable() {
            // name = '';
            // score = 0;
            // level = null;

        }
    };


    var gameOver = new GameOverLogic();
    // -------------------------------Change state --------------------------------------------


    function changeState(value) {
        if (lastState) {
            lastState.hide()
        }

        switch (value) {

            case STATE_REGISTER:
                lastState = register;
                break;

            case STATE_LEVEL:
                lastState = levelSelect;
                break;

            case STATE_GAME:
                lastState = game;
                break;

            case STATE_END:
                lastState = gameOver;
                break;

            default:
                break;
        }

        lastState.show();
    }

    changeState(STATE_REGISTER);

};
