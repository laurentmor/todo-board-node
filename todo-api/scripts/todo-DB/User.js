db.createCollection( "User",{
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

                "mail": {
                    "bsonType": "string"
                },
                "password": {
                    "bsonType": "string"
                },
                "username": {
                    "bsonType": "string"

                },
                "name": {
                    "bsonType": "string"
                }
            }
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});