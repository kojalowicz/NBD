var mapJob  = function() {emit (this.job, 1);};

var reduceJob = function(key, value) {
    return key, Array.sum(value);
 };

printjson(db.people.mapReduce(
    mapJob,
    reduceJob,
    { out: "mrJob" }
 ));
printjson(db.mrJob.find().toArray().map((value) => value._id));