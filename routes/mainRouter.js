var express = require('express')

var routes = function(Trip){
  var mainRouter = express.Router()
  
  mainRouter.route('/tours')
      .get(function(req,res){

        Trip.find().sort({ destination: 'asc'}).exec(function(err,trip){
            if(err)
                res.status(500).send(err);
            else
                res.json(trip);
        });
    });

    return mainRouter;
};

module.exports = routes
