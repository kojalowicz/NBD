var mapBMI  = function() {
    var bmi = (this.weight/Math.pow(this.height, 2))*10000;
    emit (this.nationality, {sumBMI: bmi, minBMI: bmi, maxBMI: bmi, count: 1});
};

var reduceBMI = function(key, values) {
    var a = values[0];
    for (var i=1; i < values.length; i++){
        var b = values[i];
        a.sumBMI += b.sumBMI;
        a.count += b.count;
        a.minBMI = Math.min(a.minBMI, b.minBMI);
        a.maxBMI = Math.max(a.maxBMI, b.maxBMI);
    }
    return a;
 };

 var finalizeBMI = function(key, value) {
    value.avgBMI = value.sumBMI / value.count;
    return value;
  };

printjson(db.people_conv.mapReduce(mapBMI, reduceBMI, {out: "maprBMI", finalize: finalizeBMI}));
printjson(db.maprBMI.find({}, {"value.avgBMI": 1, "value.minBMI": 1, "value.maxBMI": 1}).toArray());