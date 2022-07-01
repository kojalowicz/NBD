printjson(db.people_converted.aggregate([
    {$match: {"nationality": "Poland", "sex": "Female"}},
    {$unwind: "$credit"},
    {$group: {
        _id: "$credit.currency",
        avg_credit: {$avg: "$credit.balance"},
        sum_credit: {$sum: "$credit.balance"}
}},
{$project: {
    "_id": 0, 
    "waluta": "$_id",
    "średnia liczba środków": {$trunc: ["$avg_credit", 2]},
    "łączna liczba środków": "$sum_credit"
}}
]
).toArray())
