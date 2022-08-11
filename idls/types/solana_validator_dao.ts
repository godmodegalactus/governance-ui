export type SolanaValidatorDao = {
  version: '0.1.0'
  name: 'solana_validator_dao'
  instructions: [
    {
      name: 'stake'
      accounts: [
        {
          name: 'governanceId'
          isMut: false
          isSigner: false
        },
        {
          name: 'governanceNativeTreasuryAccount'
          isMut: true
          isSigner: true
        },
        {
          name: 'daoStakeAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'validatorVoteKey'
          isMut: false
          isSigner: false
        },
        {
          name: 'stakeConfig'
          isMut: false
          isSigner: false
        },
        {
          name: 'governanceProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'stakeProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rentProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'clockProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'stakeHistory'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'seed'
          type: 'u8'
        },
        {
          name: 'lamports'
          type: 'u64'
        }
      ]
    },
    {
      name: 'registerValidatorProvider'
      accounts: [
        {
          name: 'owner'
          isMut: true
          isSigner: true
        },
        {
          name: 'providerData'
          isMut: true
          isSigner: false
        },
        {
          name: 'paymentMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'services'
          type: 'u64'
        },
        {
          name: 'name'
          type: 'string'
        },
        {
          name: 'description'
          type: 'string'
        }
      ]
    },
    {
      name: 'addRegisteredProviderToGovernance'
      accounts: [
        {
          name: 'governanceAi'
          isMut: false
          isSigner: false
        },
        {
          name: 'governanceNativeTreasury'
          isMut: true
          isSigner: true
        },
        {
          name: 'providerData'
          isMut: true
          isSigner: false
        },
        {
          name: 'governanceProviderData'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'clock'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'createGovernanceContract'
      accounts: [
        {
          name: 'governanceAi'
          isMut: false
          isSigner: false
        },
        {
          name: 'providerData'
          isMut: true
          isSigner: false
        },
        {
          name: 'governanceProviderData'
          isMut: true
          isSigner: false
        },
        {
          name: 'governanceContract'
          isMut: true
          isSigner: false
        },
        {
          name: 'paymentMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenAccount'
          isMut: false
          isSigner: false
        },
        {
          name: 'providersTokenAccount'
          isMut: false
          isSigner: false
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'contractSeed'
          type: 'u64'
        },
        {
          name: 'services'
          type: 'u64'
        },
        {
          name: 'contractStartUnixTimestamp'
          type: 'u64'
        },
        {
          name: 'contractEndUnixTimestamp'
          type: 'u64'
        },
        {
          name: 'initialAmount'
          type: 'u64'
        },
        {
          name: 'recurringAmount'
          type: 'u64'
        },
        {
          name: 'periodicity'
          type: 'u8'
        },
        {
          name: 'numberOfPeriods'
          type: 'u32'
        }
      ]
    },
    {
      name: 'executeGovernanceContract'
      accounts: [
        {
          name: 'governanceAi'
          isMut: false
          isSigner: false
        },
        {
          name: 'providerData'
          isMut: false
          isSigner: false
        },
        {
          name: 'governanceContract'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenAuthority'
          isMut: false
          isSigner: true
        },
        {
          name: 'paymentMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'providersTokenAccount'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'clock'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    }
  ]
  accounts: [
    {
      name: 'validatorProvider'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'metaData'
            type: {
              defined: 'Metadata'
            }
          },
          {
            name: 'owner'
            type: 'publicKey'
          },
          {
            name: 'paymentMint'
            type: 'publicKey'
          },
          {
            name: 'services'
            type: 'u64'
          },
          {
            name: 'rating'
            type: 'u32'
          },
          {
            name: 'reviewCount'
            type: 'u32'
          },
          {
            name: 'servingGovernanceCount'
            type: 'u32'
          },
          {
            name: 'name'
            type: {
              array: ['u8', 128]
            }
          },
          {
            name: 'description'
            type: {
              array: ['u8', 1024]
            }
          },
          {
            name: 'reserved'
            type: {
              array: ['u8', 256]
            }
          }
        ]
      }
    },
    {
      name: 'governanceProvider'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'metaData'
            type: {
              defined: 'Metadata'
            }
          },
          {
            name: 'governanceId'
            type: 'publicKey'
          },
          {
            name: 'validatorProvider'
            type: 'publicKey'
          },
          {
            name: 'validatorProviderOwner'
            type: 'publicKey'
          },
          {
            name: 'addedTimestamp'
            type: 'u64'
          },
          {
            name: 'contractCount'
            type: 'u32'
          }
        ]
      }
    },
    {
      name: 'governanceContract'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'metaData'
            type: {
              defined: 'Metadata'
            }
          },
          {
            name: 'governanceId'
            type: 'publicKey'
          },
          {
            name: 'contractCreator'
            type: 'publicKey'
          },
          {
            name: 'validatorProvider'
            type: 'publicKey'
          },
          {
            name: 'validatorProviderOwner'
            type: 'publicKey'
          },
          {
            name: 'providerTokenAccount'
            type: 'publicKey'
          },
          {
            name: 'servicesToBeProvided'
            type: 'u64'
          },
          {
            name: 'contractStartTimestamp'
            type: 'u64'
          },
          {
            name: 'contractEndTimestamp'
            type: 'u64'
          },
          {
            name: 'initialAmountPaid'
            type: 'u64'
          },
          {
            name: 'recurringAmountToBePaid'
            type: 'u64'
          },
          {
            name: 'recurringAmountAlreadyPaid'
            type: 'u64'
          },
          {
            name: 'periodicity'
            type: {
              defined: 'PaymentPeriodicity'
            }
          },
          {
            name: 'numberOfPeriods'
            type: 'u32'
          },
          {
            name: 'paymentMint'
            type: 'publicKey'
          },
          {
            name: 'daoPaymentAccount'
            type: 'publicKey'
          },
          {
            name: 'hasSignedByProvider'
            type: 'bool'
          },
          {
            name: 'executed'
            type: 'bool'
          },
          {
            name: 'reserved'
            type: {
              array: ['u8', 256]
            }
          }
        ]
      }
    }
  ]
  types: [
    {
      name: 'Metadata'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'datatype'
            type: {
              defined: 'Datatype'
            }
          },
          {
            name: 'isInitialized'
            type: 'bool'
          },
          {
            name: 'reserved'
            type: {
              array: ['u8', 8]
            }
          }
        ]
      }
    },
    {
      name: 'Datatype'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'ValidatorProvider'
          },
          {
            name: 'GovernaceProvider'
          },
          {
            name: 'Contract'
          }
        ]
      }
    },
    {
      name: 'PaymentPeriodicity'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Yearly'
          },
          {
            name: 'Monthly'
          },
          {
            name: 'Weekly'
          },
          {
            name: 'Daily'
          },
          {
            name: 'Unknown'
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 6000
      name: 'NameTooLarge'
      msg: 'Name too large'
    },
    {
      code: 6001
      name: 'DescriptionTooLarge'
      msg: 'Description too large'
    },
    {
      code: 6002
      name: 'ContractNotYetStarted'
      msg: 'Contract has not started yet'
    },
    {
      code: 6003
      name: 'ContractNotSignedByProvider'
      msg: 'Contract not yet signed by the provider'
    },
    {
      code: 6004
      name: 'UnknownPeriodicity'
      msg: 'Unknown periodicity'
    },
    {
      code: 6005
      name: 'Default'
      msg: 'default'
    }
  ]
}

export const IDL: SolanaValidatorDao = {
  version: '0.1.0',
  name: 'solana_validator_dao',
  instructions: [
    {
      name: 'stake',
      accounts: [
        {
          name: 'governanceId',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'governanceNativeTreasuryAccount',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'daoStakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'validatorVoteKey',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeConfig',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'governanceProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rentProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clockProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeHistory',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'seed',
          type: 'u8',
        },
        {
          name: 'lamports',
          type: 'u64',
        },
      ],
    },
    {
      name: 'registerValidatorProvider',
      accounts: [
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'providerData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'services',
          type: 'u64',
        },
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
      ],
    },
    {
      name: 'addRegisteredProviderToGovernance',
      accounts: [
        {
          name: 'governanceAi',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'governanceNativeTreasury',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'providerData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'governanceProviderData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createGovernanceContract',
      accounts: [
        {
          name: 'governanceAi',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'providerData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'governanceProviderData',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'governanceContract',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'providersTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'contractSeed',
          type: 'u64',
        },
        {
          name: 'services',
          type: 'u64',
        },
        {
          name: 'contractStartUnixTimestamp',
          type: 'u64',
        },
        {
          name: 'contractEndUnixTimestamp',
          type: 'u64',
        },
        {
          name: 'initialAmount',
          type: 'u64',
        },
        {
          name: 'recurringAmount',
          type: 'u64',
        },
        {
          name: 'periodicity',
          type: 'u8',
        },
        {
          name: 'numberOfPeriods',
          type: 'u32',
        },
      ],
    },
    {
      name: 'executeGovernanceContract',
      accounts: [
        {
          name: 'governanceAi',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'providerData',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'governanceContract',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'providersTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'validatorProvider',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'metaData',
            type: {
              defined: 'Metadata',
            },
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'paymentMint',
            type: 'publicKey',
          },
          {
            name: 'services',
            type: 'u64',
          },
          {
            name: 'rating',
            type: 'u32',
          },
          {
            name: 'reviewCount',
            type: 'u32',
          },
          {
            name: 'servingGovernanceCount',
            type: 'u32',
          },
          {
            name: 'name',
            type: {
              array: ['u8', 128],
            },
          },
          {
            name: 'description',
            type: {
              array: ['u8', 1024],
            },
          },
          {
            name: 'reserved',
            type: {
              array: ['u8', 256],
            },
          },
        ],
      },
    },
    {
      name: 'governanceProvider',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'metaData',
            type: {
              defined: 'Metadata',
            },
          },
          {
            name: 'governanceId',
            type: 'publicKey',
          },
          {
            name: 'validatorProvider',
            type: 'publicKey',
          },
          {
            name: 'validatorProviderOwner',
            type: 'publicKey',
          },
          {
            name: 'addedTimestamp',
            type: 'u64',
          },
          {
            name: 'contractCount',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'governanceContract',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'metaData',
            type: {
              defined: 'Metadata',
            },
          },
          {
            name: 'governanceId',
            type: 'publicKey',
          },
          {
            name: 'contractCreator',
            type: 'publicKey',
          },
          {
            name: 'validatorProvider',
            type: 'publicKey',
          },
          {
            name: 'validatorProviderOwner',
            type: 'publicKey',
          },
          {
            name: 'providerTokenAccount',
            type: 'publicKey',
          },
          {
            name: 'servicesToBeProvided',
            type: 'u64',
          },
          {
            name: 'contractStartTimestamp',
            type: 'u64',
          },
          {
            name: 'contractEndTimestamp',
            type: 'u64',
          },
          {
            name: 'initialAmountPaid',
            type: 'u64',
          },
          {
            name: 'recurringAmountToBePaid',
            type: 'u64',
          },
          {
            name: 'recurringAmountAlreadyPaid',
            type: 'u64',
          },
          {
            name: 'periodicity',
            type: {
              defined: 'PaymentPeriodicity',
            },
          },
          {
            name: 'numberOfPeriods',
            type: 'u32',
          },
          {
            name: 'paymentMint',
            type: 'publicKey',
          },
          {
            name: 'daoPaymentAccount',
            type: 'publicKey',
          },
          {
            name: 'hasSignedByProvider',
            type: 'bool',
          },
          {
            name: 'executed',
            type: 'bool',
          },
          {
            name: 'reserved',
            type: {
              array: ['u8', 256],
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'Metadata',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'datatype',
            type: {
              defined: 'Datatype',
            },
          },
          {
            name: 'isInitialized',
            type: 'bool',
          },
          {
            name: 'reserved',
            type: {
              array: ['u8', 8],
            },
          },
        ],
      },
    },
    {
      name: 'Datatype',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'ValidatorProvider',
          },
          {
            name: 'GovernaceProvider',
          },
          {
            name: 'Contract',
          },
        ],
      },
    },
    {
      name: 'PaymentPeriodicity',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Yearly',
          },
          {
            name: 'Monthly',
          },
          {
            name: 'Weekly',
          },
          {
            name: 'Daily',
          },
          {
            name: 'Unknown',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'NameTooLarge',
      msg: 'Name too large',
    },
    {
      code: 6001,
      name: 'DescriptionTooLarge',
      msg: 'Description too large',
    },
    {
      code: 6002,
      name: 'ContractNotYetStarted',
      msg: 'Contract has not started yet',
    },
    {
      code: 6003,
      name: 'ContractNotSignedByProvider',
      msg: 'Contract not yet signed by the provider',
    },
    {
      code: 6004,
      name: 'UnknownPeriodicity',
      msg: 'Unknown periodicity',
    },
    {
      code: 6005,
      name: 'Default',
      msg: 'default',
    },
  ],
}
