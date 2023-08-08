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
    -d '{ "id": "36", "readings": [{
"timestamp": "2021-09-29",
"count": 2
}, {
"timestamp": "2021-09-30",
"count": 5
},{
"timestamp": "2021-10-1",
"count": 5
}]
 }' \
    http://localhost:1337/api/v1/readings
```

To get information on the device you just added you can use
```
curl -i -X GET http://localhost:1337/api/v1/readings/36
```

This endpoint works where id is the desired entry for the device you are looking for
```
curl -i -X GET http://localhost:1337/api/v1/readings/{id}
```

To add a new device it will need a new id
```
curl -i -X POST \
    -H "Content-Type: application/json" \
    -d '{ "id": "5555", "readings": [{
"timestamp": "2021-07-02",
"count": 1
}, {
"timestamp": "2021-08-12",
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
    -d '{ "id": "5555", "readings": [{
"timestamp": "2021-09-29",
"count": 15
}, {
"timestamp": "2021-10-29",
"count": "a"
}]
 }' \
    http://localhost:1337/api/v1/readings
```
which will produce an error message.
