let checkbox = document.getElementById('checkbox');

chrome.storage.local.get(['action'], function(data) {
	checkbox.checked = (data.action === "start")?true:false;
});

checkbox.onchange = function(event){
    event.preventDefault();
    let action = (event.target.checked)?"start":"stop";
	chrome.storage.local.set({action: action}, function() {
   		console.log('action is set to ',action);
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action : action }, function (response) {
            console.log(response.farewell);
        });
    });
};