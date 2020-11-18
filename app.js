const express = require("express");
const bodyparser = require("body-parser");
const app = express();
var newlist = [];
var worklist = [];
app.use(bodyparser.urlencoded({
  extended: true
}))
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  var day = new Date();
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  console.log(day.toLocaleDateString("zh-CN", options));
  var current = day.toLocaleDateString("zh-CN", options);

  res.render("list", {
    listTitle: current,
    Lists: newlist

  });
})

app.listen(3000, function() {
  console.log("Port 3000 is running");
})


app.post("/", function(req, res) {
  if (req.body.button === "Work"){
    worklist.push(req.body.new);
    res.redirect("/work");
  }
  else{
    newlist.push(req.body.new);
    res.redirect("/");
  }

})

app.get("/work", function(req, res) {
  var day = new Date();
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  console.log(day.toLocaleDateString("zh-CN", options));
  var current = day.toLocaleDateString("zh-CN", options);

  res.render("list", {
    listTitle: "Work",
    Lists: worklist
  });
})
