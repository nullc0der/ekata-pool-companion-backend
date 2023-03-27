## API Doc

### CoinLogo

All endpoint except get need X-API-KEY header

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

#### Create coinlogo

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coinlogo`

**Method:** `POST`

This needs to be multipart/form-data request

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

#### Delete coinlogo

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coinlogo/<logoId>`

**Method:** `DELETE`

##### Response

```json
{
  "deleted": "boolean"
}
```

### CoinData

All endpoint except get need X-API-KEY header

It also needs "Content-Type": "application/json" header

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

#### Delete coindata

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata/<coinDataId>`

**Method:** `DELETE`

##### Response

```json
  {
    "deleted": boolean
  }
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

#### Delete pool in a coindata

**Endpoint:** `https://poolcompanion.ekata.io/api/v1/coindata/pool/<coinDataId>/<poolDataId>`

**Method:** `DELETE`

On success it will send 200 OK response
