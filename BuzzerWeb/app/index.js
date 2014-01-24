
$(function () {
    var $buzz = $('#buzz'),
        $reset = $('#reset'),
        $youwin = $('#youwin'),
        $sorry = $('#sorry'),
        hub = $.connection.buzzer;

    hub.client.youWin = function () {
        $youwin.removeClass('hidden');
    };

    hub.client.sorry = function () {
        $buzz.attr("disabled", "disabled");
        $sorry.removeClass('hidden');
    };

    hub.client.reset = function () {
        console.log('Reset');
        $buzz.removeAttr("disabled");
        $sorry.addClass('hidden');
        $youwin.addClass('hidden');
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
