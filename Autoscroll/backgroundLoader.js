(function(document, chrome) {
  function loadScript(scriptName, callback) {
      var scriptEl = document.createElement('script');
      scriptEl.src = chrome.extension.getURL('' + scriptName + '.js');
      scriptEl.addEventListener('load', callback, false);
      document.head.appendChild(scriptEl);
  }

  // TODO in-order multiloader

  loadScript('background');
})(document, chrome);
