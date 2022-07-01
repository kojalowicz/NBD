var mapBalance = function() {
    for (var idx = 0; idx < this.credit.length; idx++) {
       var key = this.credit[idx].currency;
       var value = {count: 1, totalBalance: this.credit[idx].balance};
       emit(key, value);
    }
};

var reduceBalance = function(key, value) {
    reducedValue = {count: 0, totalBalance: 0};
    for (var idx = 0; idx < value.length; idx++) {
        reducedValue.count += value[idx].count;
        reducedValue.totalBalance += value[idx].totalBalance;
    }
    return reducedValue;
 };

var finalizeBalance = function(key, value) {
    value.averageBalance = value.totalBalance/value.count;
    return value;
  };

printjson(db.people_converted.mapReduce(mapBalance, reduceBalance, {query: {nationality: "Poland", sex: "Female"}, out: "mrBalance", finalize: finalizeBalance}));
printjson(db.mrBalance.find({}, {"value.totalBalance": 1, "value.averageBalance": 1}).toArray());