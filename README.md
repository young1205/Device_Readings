# Project

This project is designed to solve the `Device Readings Interview Project`. This implements a web API that receives and processes device readings. 

# Setup Instructions

## Mac + Linux

First install homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install node
```
brew install node
```

Check to make sure that node + npm were installed correctly
```
node -v && npm -v
```

Install the packages
```
npm install
```

## Windows

Navigate to https://nodejs.org/en/download and chose the windows installer. 

Open the command prompt or (Power Shell). (Access to the Windows command line (search > cmd > right-click > run as administrator) OR Windows PowerShell (Search > Powershell > right-click > run as administrator))

Check to make sure that node + npm were installed correctly
```
node -v && npm -v
```

Install the packages
```
npm install
```

# Run the API

In the base directory run 
```
npm run dev
```

## Commands

There are initially no device readings stored. To add a device reading 
```
curl -i -X POST \
    -H "Content-Type: application/json" \
    -d '{ "id": "36d5658a-6908-479e-887e-a949ec199272", "readings": [{
"timestamp": "2021-09-29T16:08:15+01:00",
"count": 2
}, {
"timestamp": "2021-09-29T30:09:15+01:00",
"count": 5
},{
"timestamp": "2021-09-29T30:09:16+01:00",
"count": 5
}]
 }' \
    http://localhost:1337/api/v1/readings
```

To get information on the device you just added you can use
```
curl -i -X GET http://localhost:1337/api/v1/readings/36d5658a-6908-479e-887e-a949ec199272
```

This endpoint works where id is the desired entry for the device you are looking for
```
curl -i -X GET http://localhost:1337/api/v1/readings/{id}
```

To add a new device it will need a new id
```
curl -i -X POST \
    -H "Content-Type: application/json" \
    -d '{ "id": "5555658a-6908-479e-887e-a949ec199272", "readings": [{
"timestamp": "2021-09-29T16:08:15+01:00",
"count": 1
}, {
"timestamp": "2021-09-29T30:09:15+01:00",
"count": 1
}]
 }' \
    http://localhost:1337/api/v1/readings
```

To get a list of all the readings present
```
curl -i -X GET http://localhost:1337/api/v1/readings
```

To test a malformed reading you can try
```
curl -i -X POST \
    -H "Content-Type: application/json" \
    -d '{ "id": "5555658a-6808-479e-887e-a949ec199272", "readings": [{
"timestamp": "2021-09-29T16:08:15+01:00",
"count": 19
}, {
"timestamp": "2021-09-29T30:09:15+01:00",
"count": "a"
}]
 }' \
    http://localhost:1337/api/v1/readings
```
which will produce an error message.

## Testing

I was not able to get the unit testing working in the specified time. To run the testing you would normally run 
```
npm run test
```

# Summary + Extensions

This project is designed to meet the requirements as outlined but there are several areas that I would improve on. I would get the unit testing working as previously outlined and add testing for each endpoint. I would also add more methods for dealing with malformed entries. For example I was not sure if the id passed was not a valid UUID if it should be rejected. 