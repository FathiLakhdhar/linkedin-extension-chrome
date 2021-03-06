let api = (function(){

    var count = 0;
    var index = -1;
    var stop = true;
    function periodicall(){
        var btnInvites = document.querySelectorAll(".search-result__actions button");
        if(stop) return;
        index++;
        scroll(0, document.body.clientHeight * (index / 10));
        if(index >= btnInvites.length){
            index = 0;
            console.info("load next page");
            document.querySelector("button.next").click()
            setTimeout(function(){
                periodicall();
                scroll(0, document.body.clientHeight);
            }, 20000);
        }else{
            
            console.log("index : ",index);        
            if(btnInvites[index] && btnInvites[index].innerText == "Se connecter"){
                console.log("before click")
                btnInvites[index].click();
                count++;
                console.log("after click")
    
                setTimeout(function(){
                    var envoyer = document.querySelector("div.send-invite__actions button.button-primary-large");
                    if(envoyer.innerText == "Envoyer maintenant"){
                        envoyer.click();
                    }else{
                        document.querySelector("button.send-invite__cancel-btn").click();
                    }
                    setTimeout(periodicall, 3000);
    
                }, 2000);
            }else{
                setTimeout(periodicall, 1000);
            }
        }

        
    };


    return {
        stop : ()=> stop = true,
        start : ()=> {
            if(stop){
                stop = false;
                periodicall();
            }
        },
        count: ()=> count
    } 
})();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch(request.action) {
            case "start":
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