export const abi = [
  {
    type: 'function',
    name: 'getHealthData',
    inputs: [
      {
        name: '_user',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_date',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct HealthDataStorage.HealthData',
        components: [
          {
            name: 'date',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'ouraHealthDataBlob',
            type: 'string',
            internalType: 'string',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'healthDataRecords',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'string', internalType: 'string' },
    ],
    outputs: [
      {
        name: 'date',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'ouraHealthDataBlob',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'storeHealthData',
    inputs: [
      {
        name: '_date',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_ouraHealthDataBlob',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;
