db.people_converted.find({
    "credit":{"$exists":true}}).forEach(function(data){
     for(var ii=0;ii<data.credit.length;ii++) {
       db.people_converted.update(
          { 
              "_id": data._id, 
              "credit.number": data.credit[ii].number
          },
          {
              "$set": {
                "credit.$.balance":
                    parseFloat(data.credit[ii].balance)
              }
          }
       );
   }
 })

var mapCredits = function() {
    for (var idx = 0; idx < this.credit.length; idx++) {
       var key = this.credit[idx].currency;
       var value = this.credit[idx].balance;
       emit(key, value);
    }
};

var reduceCredits = function(key, value) {
    return Array.sum(value);
 };

printjson(db.people_converted.mapReduce(
    mapCredits,
    reduceCredits,
    { out: "mrCredits" }
 ));
printjson(db.mrCredits.find().toArray());