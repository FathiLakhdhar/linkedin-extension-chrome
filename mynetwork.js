let api = (function () {
    var stop = false;
    var count = 0;
    var singleton = null;
    var time = Math.floor((Math.random() * 9000) + 9000);
    var clientHeight = document.body.clientHeight;

    function periodicall() {
        if (stop) return;
        if ((clientHeight * 1.5) > document.body.clientHeight) {
            scrollDown();
        }
        time = Math.floor((Math.random() * 9000) + 9000);
        sendRequest();
        setTimeout(periodicall, time);
    };

    function sendRequest() {
        var btn = document.querySelector("button.button-secondary-small");
        if (btn) {
            count++;
            btn.click();
            console.log('Clicked : ', btn.querySelector("span.visually-hidden").innerText.trim());
        }
    }
    function scrollDown() {
        scroll(0, 0);
        scroll(0, document.body.clientHeight);
        setTimeout(function () {
            scroll(0, 0);
        }, 1000)
    }

    return {
        start: () => {
            stop = false;
            if (singleton == null) {
                singleton = {};
                singleton.periodicall = periodicall;
                console.log("started...");
                scrollDown();
                singleton.periodicall();
            } else {
                console.log("is run")
                return;
            }
        },
        stop: () => {
            stop = true;
            singleton = null;
            console.log("stoped...")
            console.info("Nombre invitation : ", count)
        },
        count: () => count
    }
})();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch(request.action) {
            case "start":
                console.log("start")
                sendResponse({ farewell: "start send invites" });
                api.start();
                break;
            case "stop":
                sendResponse({ farewell: "stop send invites" });
                api.stop();
                break;
            case "count":
                sendResponse({ farewell: `count ${api.count()}` });
                break;
            default:
                break;
        }
});