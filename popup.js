let changeColor = document.getElementById('changeColor');
let start = document.getElementById('start');
let stop = document.getElementById('stop');

let isStarted = false;

start.onclick = function (element) {  
    console.log('start');
    if(!isStarted){
        isStarted = !isStarted;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action : "start" }, function (response) {
                console.log(response.farewell);
            });
        });
    }
};

stop.onclick = function (element) {  
    console.log('stop');
    if(isStarted){
        isStarted = !isStarted;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action : "stop" }, function (response) {
                console.log(response.farewell);
            });
        });
    }
};


///////////////////////////////////////////////////////////////////////////
chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});
changeColor.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'document.body.style.backgroundColor = "' + color + '";' }
        );
    });
};