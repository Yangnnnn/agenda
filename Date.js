module.exports = today;


function today(){
  var day = new Date();
  var options = {
    weekday: 'long'
    
  };
  var current = day.toLocaleDateString("en-US", options);
  return current;
}
