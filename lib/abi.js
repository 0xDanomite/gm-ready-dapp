export const abi = [
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'string', name: '_date', type: 'string' },
    ],
    name: 'getHealthData',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'date', type: 'string' },
          {
            internalType: 'string',
            name: 'ouraHealthDataBlob',
            type: 'string',
          },
          { internalType: 'uint256', name: 'readinessScore', type: 'uint256' },
        ],
        internalType: 'struct HealthDataStorage.HealthData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'string', name: '_date', type: 'string' },
    ],
    name: 'getReadinessScore',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'string', name: '', type: 'string' },
    ],
    name: 'healthDataRecords',
    outputs: [
      { internalType: 'string', name: 'date', type: 'string' },
      { internalType: 'string', name: 'ouraHealthDataBlob', type: 'string' },
      { internalType: 'uint256', name: 'readinessScore', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_date', type: 'string' },
      { internalType: 'string', name: '_ouraHealthDataBlob', type: 'string' },
      { internalType: 'uint256', name: '_readinessScore', type: 'uint256' },
    ],
    name: 'storeHealthData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
