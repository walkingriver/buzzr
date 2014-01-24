
$(function () {
    var $buzz = $('#buzz'),
        $reset = $('#reset'),
        hub = $.connection.buzzer;

    hub.client.youWin = function () {
        alert('YOU WIN');
    };

    hub.client.sorry = function () {
        $buzz.attr("disabled", "disabled");
        alert('Sorry');
    };

    hub.client.reset = function () {
        console.log('Reset');
        $buzz.removeAttr("disabled");
    };

    $.connection.hub.start().done(function () {
        // Wire up Reset button to call Reset on the server.
        $reset.click(function () {
            hub.server.reset();
        });

        // Wire up the Buzz button to call Buzz on the server.
        $buzz.click(function () {
            $buzz.attr("disabled", "disabled");
            hub.server.buzz();
        });
    });
});
