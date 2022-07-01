var mapWH  = function() {emit (this.sex, {count: 1, weight: this.weight, height: this.height});};

var reduceWH = function(key, values) {
    reducedValues = {count: 0, weight: 0, height: 0};
    for (var idx = 0; idx < values.length; idx++) {
        reducedValues.count += values[idx].count;
        reducedValues.weight += values[idx].weight;
        reducedValues.height += values[idx].height;
    }
    return reducedValues;
 };

 var finalizeWH = function(key, reducedValues) {
    reducedValues.averageWeight = reducedValues.weight/reducedValues.count;
    reducedValues.averageHeight = reducedValues.height/reducedValues.count;
    return reducedValues;
  };

printjson(db.people_conv.mapReduce(mapWH, reduceWH, {out: "mpWeightHeight", finalize: finalizeWH}));
printjson(db.mpWeightHeight.find({}, {"value.averageWeight": 1, "value.averageHeight": 1}).toArray());