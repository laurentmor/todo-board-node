db.createCollection( "Todo",{
    "storageEngine": {
        "wiredTiger": {}
    },
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "additionalProperties": false,
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },

                "text": {
                    "bsonType": "string"
                },
                "color": {
                    "bsonType": "string"
                },
                "creationdate": {
                    "bsonType": "date"
                },
                "expirationdate": {
                    "bsonType": "date"
                },
                "userid": {
                    "bsonType": "objectId"
                }
            }
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});