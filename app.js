const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname+"/Date.js");
const app = express();

mongoose.connect('mongodb+srv://yangchulong:yang86832867@cluster0.zypde.mongodb.net/TodoList?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
const itemsSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model('item', itemsSchema);
const item1 = new Item({
  name:"Welcome to the todolist"
})
const item2 = new Item({
  name:"Click + to add a new item"
})
const item3 = new Item({
  name:"<-Click this button to delete this item"
})
const newlist = [item1,item2,item3];


app.use(bodyparser.urlencoded({
  extended: true
}))
app.use(express.static('public'));

app.set('view engine', 'ejs');
//
app.get("/", function(req, res) {
  Item.find(function(err,doc){
    if(err){
      console.log(err);
    }
    else{
      if(doc.length===0){
        Item.insertMany(newlist,function(error,doc){
          if(error){
            console.log(error);
          }
          else{
            console.log("Saved to the database");
          }
        })
        res.redirect("/");
      }

      res.render("list", {
        listTitle: date(),
        Lists: doc

      });
    }
  })

})

//

app.listen(3000, function() {
  console.log("Port 3000 is running");
})


app.post("/", function(req, res) {


  const newitem = new Item({
    name:req.body.new
  })
  newitem.save();
  res.redirect("/");

})
