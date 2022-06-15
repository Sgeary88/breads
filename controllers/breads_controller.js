const Baker = require('../models/baker.js');
const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");

// INDEX
breads.get("/", async (req, res) => {
  const foundBakers = await Baker.find().lean();
  const foundBreads = await Bread.find().limit(2).lean();
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
    })
  });

// NEW
breads.get("/new", (req, res) => {
  Baker.find().then(foundBakers => {
    res.render('new', {
      bakers: foundBakers
    })
  })
});

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})


// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        res.render('show', {
            bread: foundBread
        })
      })
      .catch(err => {
        res.send('404')
      })
})


// CREATE
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }

  if (req.body.hasGluten == "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }

  Bread.create(req.body);
  res.redirect("/breads");
});

// UPDATE
breads.put("/:id", (req, res) => {
  console.log(req.body)
  if (req.body.hasGluten == "on") {
    console.log('has gluten')
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  // console.log(req.params.id);
  // console.log(req.body);
  // res.send('debug')
  // return
  Bread.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(updateBread => {
    console.log(updateBread);
    res.redirect(`/breads/${req.params.id}`);
  })
});

// DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then(deletedBread => {
    res.status(303).redirect("/breads");

  });
});

module.exports = breads;


    
