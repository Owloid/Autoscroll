/* browserAction */

chrome.browserAction.onClicked.addListener(function(tab) {
  loadAndToggle();
});

/* contextMenus */

chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create({
    id: 'singleClick',
    title: 'Single Click',
    type: 'checkbox',
    checked: true,
    contexts: ['browser_action']
  });
});

function callback(info, tab) {
  if (info.menuItemId === 'singleClick') {
    if (info.checked === true) {
      chrome.browserAction.setPopup({popup: ''});
    }
    else {
      chrome.browserAction.setPopup({popup: 'popup/popup.html'});
    }
  }
}

chrome.contextMenus.onClicked.addListener(callback);
