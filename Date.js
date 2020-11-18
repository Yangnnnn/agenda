module.exports = today;


function today(){
  var day = new Date();
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  var current = day.toLocaleDateString("zh-CN", options);
  return current;
}
