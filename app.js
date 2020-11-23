const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/Date.js");
const app = express();

mongoose.connect('mongodb+srv://******:*******@cluster0.zypde.mongodb.net/TodoList?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const itemsSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model('item', itemsSchema);

const item1 = new Item({
  name: "Welcome to the todolist"
})
const item2 = new Item({
  name: "Click + to add a new item"
})
const item3 = new Item({
  name: "<-Click this button to delete this item"
})
const item4 = new Item({
  name: "Create a new list by adding a name to the url"
})
const item5 = new Item({
  name: "eg. url/home"
})


const newlist = [item1, item2, item3, item4, item5];


const listsSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});
const List = mongoose.model('list', listsSchema);





app.use(bodyparser.urlencoded({
  extended: true
}))
app.use(express.static('public'));

app.set('view engine', 'ejs');
//
app.get("/", function(req, res) {
  Item.find(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      if (doc.length === 0) {
        Item.insertMany(newlist, function(error, doc) {
          if (error) {
            console.log(error);
          } else {
            console.log("Saved to the database");
          }
        })
        res.redirect("/");
      } else {
        res.render("list", {
          listTitle: date(),
          Lists: doc
        });
      }

    }
  })

})
//

app.get("/:categoryId", function(req, res) {
  var categoryName = req.params.categoryId

  List.findOne({
    name: categoryName
  }, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      if (!doc) {
        const list = new List({
          name: categoryName,
          items: newlist
        })
        list.save()
        res.redirect("/" + categoryName)
      } else {
        res.render("list", {
          listTitle: categoryName,
          Lists: doc.items
        })
      }
    }
  })

})


//
app.post("/delete", function(req, res) {

  if (req.body.custId === date()) {
    Item.findByIdAndDelete(req.body.checkbox, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted");
      }
    })

    res.redirect("/");
  } else {
    List.findOneAndUpdate({
      name: req.body.custId
    }, {
      $pull: {
        items: {
          _id: req.body.checkbox
        }
      }
    }, function(error, doc) {
      if (error) {
        console.log(err);
      } else {
        console.log("deleted");
        res.redirect("/" + req.body.custId);
      }
    })
  }
  //
})


app.listen(3000, function() {
  console.log("Port 3000 is running");
})


app.post("/", function(req, res) {
  if (req.body.button === date()) {
    const newitem = new Item({
      name: req.body.new
    })
    newitem.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: req.body.button
    }, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        const newitem = new Item({
          name: req.body.new
        })
        doc.items.push(newitem);
        res.redirect("/" + req.body.button);
        doc.save();

      }
    })

  }

})
