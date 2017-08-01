/**
 * Created by Monika on 8/1/2017.
 */
$("h1").click(function () {
    $("h1").hide();
})

var FastTyping = function () {

    const STATE_REGISTER = 'registration state',
        STATE_LEVEL = 'level selection state',
        STATE_GAME = 'game state',
        STATE_END = 'game over state';

    function changeState(value) {

        switch (value) {
            case STATE_REGISTER:
                break;
            case STATE_LEVEL:
                break;
            case STATE_GAME:
                break;
            case STATE_END:
                break;
            default:
                break;
        }

    }

    function initialize() {
        console.log('working');


    }

};