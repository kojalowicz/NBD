printjson(db.people.aggregate([
    {$group: {
        _id: "$job",
        count_jobs: {$sum: 1}
    }},
{$project: {
    "_id": 0, 
    "zawód": "$_id"
}}
]
).toArray())