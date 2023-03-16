import { AVAILABLE_MINING_ENGINES, REGIONS } from "@/utils/constants";
import { AllowedSchema } from "express-json-validator-middleware";

export const coinDataGetSchema: AllowedSchema = {
  type: "object",
  properties: {
    pageNumber: {
      minLength: 1,
      type: "string",
    },
    perPage: {
      minLength: 1,
      type: "string",
    },
    alphaSort: {
      type: "string",
      enum: ["asc", "desc"],
    },
    newestFirst: {
      type: "string",
    },
  },
  required: ["pageNumber", "perPage", "alphaSort", "newestFirst"],
};

const coinDataSchema: AllowedSchema = {
  type: "object",
  properties: {
    coinName: {
      minLength: 1,
      type: "string",
    },
    coinLogoUrl: {
      type: "string",
      format: "uri",
    },
    coinAlgo: {
      type: "string",
      minLength: 1,
    },
    cpuMineable: {
      type: "boolean",
    },
    supportedMiningEngines: {
      type: "array",
      minItems: 1,
      items: [
        {
          type: "string",
          enum: AVAILABLE_MINING_ENGINES,
        },
      ],
    },
    pools: {
      type: "array",
      minItems: 1,
      items: [
        {
          type: "object",
          properties: {
            poolName: {
              minLength: 1,
              type: "string",
            },
            region: {
              type: "string",
              enum: REGIONS,
            },
            urls: {
              type: "array",
              minItems: 1,
              items: {
                anyOf: [
                  {
                    type: "string",
                    format: "hostname",
                  },
                  {
                    type: "string",
                    format: "ipv4",
                  },
                  {
                    type: "string",
                    format: "ipv6",
                  },
                ],
              },
            },
            ports: {
              type: "array",
              minItems: 1,
              items: [
                {
                  type: "integer",
                },
              ],
            },
          },
          required: ["poolName", "region", "urls", "ports"],
        },
      ],
    },
  },
  required: [
    "coinName",
    "coinLogoUrl",
    "coinAlgo",
    "cpuMineable",
    "supportedMiningEngines",
    "pools",
  ],
};

export default coinDataSchema;
