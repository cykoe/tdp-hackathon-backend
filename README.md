### TDP-Hackathon API :boy:	:girl:

This is the backend repo for TDP-Hackathon project :stuck_out_tongue_winking_eye:

#### Requirements
- [serverlesss framework](https://serverless.com/) :zap:
- [node >10.16.0](https://nodejs.org/en/) :palm_tree:

### Run

Go [here](https://u26y0c7lh4.execute-api.us-east-2.amazonaws.com/dev/nutrition), then add the queryParameter `country=[COUNTRY_NAME]`. For example,
- Success :joy:
- `https://u26y0c7lh4.execute-api.us-east-2.amazonaws.com/dev/nutrition/?country=ghana` 
- Failure :cry:
- `https://u26y0c7lh4.execute-api.us-east-2.amazonaws.com/dev/nutrition/?country=nooo`

### Response Example
```
// successful response
{
    "success":true,
    "message":{"
        ﻿Country":"Ghana","
        Calcium":"0.2",
        "Fruit":"110",
        "Legumes":"40",
        "Milk":"10",
        "Nuts and seeds":"0",
        "Omega 3":"0.05",
        "Processed meat":"1",
        "Red meat":"4",
        "Salt":"2.5",
        "Sugar-sweetened beverages":"87",
        "Vegetables":"80",
        "Whole grain":"0.1"
     }
}

// failed response
{
    "success":false,
    "message":"country not found",
    "reference":"8e63e75a-bc9e-4a07-a9ec-ff9abae948ec"
}
```



