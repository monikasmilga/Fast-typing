var FastTyping = function () {


    const STATE_REGISTER = 'registration state',
        STATE_LEVEL = 'level selection state',
        STATE_GAME = 'game state',
        STATE_END = 'game over state';

    var name,
        lastState,
        level;

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
            levelButton = $('#selectLevel-button');

        this.show = function () {
            view.removeClass('invisible').prepend('<h3>Player ' + name + '</h3>');
            enableLevel();
        };

        this.hide = function () {
            view.addClass('invisible')
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

        }
    };


    var levelSelect = new LevelLogic();

    // -------------------------------Game logic--------------------------------------------
// set timeout
// set interval
    var GameLogic = function () {

        var view = $('#game');
        var letters = 'abcdefghijklmnopqrstuvwxyz',
            timeOut,
            letterKey,
            letterShow = $('h1');

        this.show = function () {
            view.removeClass('hidden').prepend('<h3>Player ' + name + ' plays in level</h3>' + level);
            changeLetter();
        };

        this.hide = function () {
            view.addClass('hidden')

        };
        
        function enable() {
            timeOut = setTimeout(changeLetter, level * 1000);
        }
        
        function changeLetter(){
            letterKey = Math.round(Math.random() * (letters.length -1))
            letterShow.html(letters[letterKey]);
            enable()
        }

    };

    var game = new GameLogic();
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
                break;

            default:
                break;
        }

        lastState.show();
    }


    function initialize() {
        console.log('working');

    }


    changeState(STATE_REGISTER);

};
