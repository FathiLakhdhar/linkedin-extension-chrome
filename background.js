chrome.runtime.onInstalled.addListener(function () {

	chrome.storage.local.set({action: "stop"}, function() {
        console.log('action is set to stop');
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'www.linkedin.com' , schemes: ['https', 'http'] },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});