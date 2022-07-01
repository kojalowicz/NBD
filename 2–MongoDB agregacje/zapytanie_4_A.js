var bmi = {$divide: 
    ["$weight", 
    {$pow: ["$height", 2]}
]
}

printjson(db.people_conv.aggregate([
    {$group: {
        _id: "$nationality",
        avg_bmi: {$avg: bmi},
        min_bmi: {$min: bmi},
        max_bmi: {$max: bmi}
}},
{$project: {
    "_id": 0, 
    "narodowość": "$_id",
    "średnie BMI": {$trunc: [{$multiply: ["$avg_bmi", 10000]}, 2]},
    "minimalne BMI": {$trunc: [{$multiply: ["$min_bmi", 10000]}, 2]},
    "maksymalne BMI": {$trunc: [{$multiply: ["$max_bmi", 10000]}, 2]}
}}
]
).toArray())
