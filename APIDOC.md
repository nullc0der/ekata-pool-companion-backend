## API Doc

### CoinLogo

All endpoint need X-API-KEY header

#### Get coinlogos

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coinlogo`

**Method:** `GET`

##### Response

```json
[
  {
    "_id": "string",
    "logoUrl": "string",
    "logoPath": "string",
    "coinName": "string"
  }
]
```

**Example**

```bash
curl --request GET --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "X-API-KEY: <API_KEY_HERE>" https://poolcompanion.ekata.io/api/v1/coinlogo
```

#### Get coinlogo

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coinlogo/<logoId>`

**Method:** `GET`

##### Response

```json
{
  "_id": "string",
  "logoUrl": "string",
  "logoPath": "string",
  "coinName": "string"
}
```

**Example**

```bash
curl --request GET --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "X-API-KEY: <API_KEY_HERE>" https://poolcompanion.ekata.io/api/v1/coinlogo/<logoId>
```

#### Create coinlogo

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coinlogo`

**Method:** `POST`

This needs to be a multipart/form-data request

##### Request

```json
{
  "coinName": "string",
  "coinLogo": "File"
}
```

##### Response

```json
{
  "_id": "string",
  "logoUrl": "string",
  "logoPath": "string",
  "coinName": "string"
}
```

**Example**

```bash
curl --request POST --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "X-API-KEY: <API_KEY_HERE>" --form "coinName=<coinName>" --form "coinLogo=@<path/to/logo>" https://poolcompanion.ekata.io/api/v1/coinlogo
```

#### Delete coinlogo

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coinlogo/<logoId>`

**Method:** `DELETE`

##### Response

```json
{
  "deleted": "boolean"
}
```

**Example**

```bash
curl --request DELETE --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "X-API-KEY: <API_KEY_HERE>" https://poolcompanion.ekata.io/api/v1/coinlogo/<logoId>
```

### CoinData

All endpoint except get need X-API-KEY header

It also needs "Content-Type: application/json" header

#### Get coindatas

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata`

**Method:** `GET`

##### Request params

Every params are required

```
  "pageNumber": "int"
  "perPage": "int"
  "alphaSort": "asc|desc"
  "newestFirst": "boolean"
  "cpuMineable": "boolean"
```

##### Response

```json
  [
    {
      "_id": "string",
      "coinName": "string",
      "coinLogoUrl": "string",
      "coinAlgo": "string",
      "cpuMineable": "boolean",
      "supportedMiningEngines": ["string"],
      "pools": [
        {
          "_id": "string",
          "poolName": "string",
          "region": "ISO31661Alpha2 country code",
          "urls":["string/ipv4/ipv6"],
          "ports":[int]
        }
      ]
    }
  ]
```

**Example**

```bash
curl --request GET --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" https://poolcompanion.ekata.io/api/v1/coindata/\?pageNumber\=0\&perPage\=10\&alphaSort\=asc\&newestFirst\=true\&cpuMineable\=false
```

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata/<coinDataID>`

**Method:** `GET`

##### Response

```json
  {
    "_id": "string",
    "coinName": "string",
    "coinLogoUrl": "string",
    "coinAlgo": "string",
    "cpuMineable": "boolean",
    "supportedMiningEngines": ["string"],
    "pools": [
      {
        "_id": "string",
        "poolName": "string",
        "region": "ISO31661Alpha2 country code",
        "urls":["string/ipv4/ipv6"],
        "ports":[int]
      }
    ]
  }
```

**Example**

```bash
curl --request GET --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" https://poolcompanion.ekata.io/api/v1/coindata/<coinDataId>
```

#### Create coindata

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata`

**Method:** `POST`

Every properties are required

##### Request body

```json
  {
      "coinName": "string",
      "coinLogoUrl": "string",
      "coinAlgo": "string",
      "cpuMineable": "boolean",
      "supportedMiningEngines": ["string"],
      "pools": [
        {
          "poolName": "string",
          "region": "ISO31661Alpha2 country code",
          "urls":["string/ipv4/ipv6"],
          "ports":[int]
        }
      ]
    }
```

##### Response

```json
  {
      "_id": "string",
      "coinName": "string",
      "coinLogoUrl": "string",
      "coinAlgo": "string",
      "cpuMineable": "boolean",
      "supportedMiningEngines": ["string"],
      "pools": [
        {
          "_id": "string",
          "poolName": "string",
          "region": "ISO31661Alpha2 country code",
          "urls":["string/ipv4/ipv6"],
          "ports":[int]
        }
      ]
    }
```

// TODO: test and review all

**Example**

```bash
curl --request POST --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "Content-Type: application/json" --header "X-API-KEY: <API_KEY_HERE>" --data @/path/to/coindata.json https://poolcompanion.ekata.io/api/v1/coindata
```

#### Update coindata

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata/<coinDataId>`

**Method:** `PUT`

##### Request body

Every top level properties are optional, but adding data to pools will replace older data and pools properties are required

```json
  {
      "coinName": "string",
      "coinLogoUrl": "string",
      "coinAlgo": "string",
      "cpuMineable": "boolean",
      "supportedMiningEngines": ["string"],
      "pools": [
        {
          "poolName": "string",
          "region": "ISO31661Alpha2 country code",
          "urls":["string/ipv4/ipv6"],
          "ports":[int]
        }
      ]
    }
```

##### Response

```json
  {
      "_id": "string",
      "coinName": "string",
      "coinLogoUrl": "string",
      "coinAlgo": "string",
      "cpuMineable": "boolean",
      "supportedMiningEngines": ["string"],
      "pools": [
        {
          "_id": "string",
          "poolName": "string",
          "region": "ISO31661Alpha2 country code",
          "urls":["string/ipv4/ipv6"],
          "ports":[int]
        }
      ]
    }
```

**Example**

```bash
curl --request PUT --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "Content-Type: application/json" --header "X-API-KEY: <API_KEY_HERE>" --data '{"coinName": "baza"}' https://poolcompanion.ekata.io/api/v1/coindata/<coinDataId>
```

#### Delete coindata

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata/<coinDataId>`

**Method:** `DELETE`

##### Response

```json
  {
    "deleted": boolean
  }
```

**Example**

```bash
curl --request DELETE --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "Content-Type: application/json" --header "X-API-KEY: <API_KEY_HERE>" https://poolcompanion.ekata.io/api/v1/coindata/<coinDataId>
```

#### Add pool to coindata

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata/pool/<coinDataId>`

**Method:** `PUT`

##### Request body

Every properties are required

```json
  [
    {
      "poolName": "string",
      "region": "ISO31661Alpha2 country code",
      "urls":["string/ipv4/ipv6"],
      "ports":[int]
    }
  ]
```

##### Response

All pools in the coindata

```json
  [
    {
      "_id": "string",
      "poolName": "string",
      "region": "ISO31661Alpha2 country code",
      "urls":["string/ipv4/ipv6"],
      "ports":[int]
    }
  ]
```

**Example**

```bash
curl --request PUT --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "Content-Type: application/json" --header "X-API-KEY: <API_KEY_HERE>" --data=@/path/to/pooldata.json https://poolcompanion.ekata.io/api/v1/coindata/pool/<coinDataId>
```

#### Update a pool of a coindata

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata/pool/<coinDataId>/<poolDataId>`

**Method:** `PUT`

##### Request body

Every properties are optional

```json
  {
    "poolName": "string",
    "region": "ISO31661Alpha2 country code",
    "urls":["string/ipv4/ipv6"],
    "ports":[int]
  }
```

##### Response

All pools in the coindata

```json
  [
    {
      "_id": "string",
      "poolName": "string",
      "region": "ISO31661Alpha2 country code",
      "urls":["string/ipv4/ipv6"],
      "ports":[int]
    }
  ]
```

**Example**

```bash
curl --request PATCH --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "Content-Type: application/json" --header "X-API-KEY: <API_KEY_HERE>" --data='{"poolName": "Baza Official"}' https://poolcompanion.ekata.io/api/v1/coindata/pool/<coinDataId>/<poolDataId>
```

#### Delete pool in a coindata

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata/pool/<coinDataId>/<poolDataId>`

**Method:** `DELETE`

On success it will send 200 OK response

**Example**

```bash
curl --request DELETE --header "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0" --header "Content-Type: application/json" --header "X-API-KEY: <API_KEY_HERE>" https://poolcompanion.ekata.io/api/v1/coindata/pool/<coinDataId>/<poolDataId>
```
