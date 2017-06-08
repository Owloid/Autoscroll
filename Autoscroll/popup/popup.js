
function toggleEH(e) {
  loadAndToggle();
}

function scrollRateEH(e) {
  var newRate = e.target.valueAsNumber;
  console.assert(!isNaN(newRate));

  setScrollRate(newRate, function(res) {
    getScrollRate(console.log);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  getScrollRate(function(scrollRate) {
    console.log(scrollRate);
    document.getElementById('scrollrate').value = scrollRate;
  })
  document.getElementById('scrollrate').addEventListener('change', scrollRateEH);
  document.getElementById('toggle').addEventListener('click', toggleEH);
});
