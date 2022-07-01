printjson(db.people_conv.aggregate([
    {$group: {
        _id: "$sex",
        average_weight: {$avg: "$weight"},
        average_height: {$avg: "$height"}
    }
},
{$project: {
    "_id": 0, 
    "płeć": "$_id", 
    "średnia waga": {$trunc: ["$average_weight", 2]}, 
    "średni wzrost" : {$trunc: ["$average_height", 2]}}
}
]
).toArray())