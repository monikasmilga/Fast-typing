
var FastTyping = function () {


    const STATE_REGISTER = 'registration state',
        STATE_LEVEL = 'level selection state',
        STATE_GAME = 'game state',
        STATE_END = 'game over state';

    var name,
        lastState;

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
            levelRadio = $('input[name=inlineRadioOptions]:checked').val();

        this.show = function () {
            view.removeClass('invisible');
            enableLevel();
        };

        this.hide = function () {
            view.addClass('invisible')
            disableLevel();
        };

        function enableLevel() {

            levelButton.click(function (){
                changeState(STATE_GAME);
            })



        }
    };

    function disableLevel() {


    }
    var level = new LevelLogic();

    // -------------------------------Game logic--------------------------------------------
// set timeout
// set interval
    var GameLogic = function() {

        var view = $('#game')

        this.show = function () {
            view.removeClass('invisible');
            enableLevel();
        };

        this.hide = function () {
            view.addClass('invisible')
            disableLevel();
        };

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
                lastState = level;
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
