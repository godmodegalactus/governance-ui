import React, { useContext, useEffect, useState } from 'react'

import {
  Governance,
  ProgramAccount,
  serializeInstructionToBase64,
} from '@solana/spl-governance'

import { PublicKey } from '@solana/web3.js'

import {
  UiInstruction,
  AddRegisteredProviderForm,
} from '@utils/uiTypes/proposalCreationTypes'
import { NewProposalContext } from '../../../new'
import useWalletStore from 'stores/useWalletStore'
import {
  web3,
  Program,
  AnchorProvider,
  IdlAccounts,
} from '@project-serum/anchor'
import ValidatorProviderSelect from '../../ValidatorProviderSelect'
import { SolanaValidatorDao } from '../../../../../../../idls/types/solana_validator_dao'
import { ValidatorProvider } from '@utils/uiTypes/assets'
import GovernedAccountSelect from '@components/inputs/GovernedAccountSelect'
import useGovernanceAssets from '@hooks/useGovernanceAssets'

const SOLANA_VALIDATOR_DAO_PROGRAM_ID = new PublicKey(
  'BC9n2UZZP4vebGeHuMAAnSzeRA5rv3hCoPFqsybLLpQv'
)

const AddRegisteredValidatorProvider = ({
  index,
  governance,
}: {
  index: number
  governance: ProgramAccount<Governance> | null
}) => {
  const connection = useWalletStore((s) => s.connection)
  const programId: PublicKey = SOLANA_VALIDATOR_DAO_PROGRAM_ID
  const wallet = useWalletStore((s) => s.current)
  const { governedTokenAccountsWithoutNfts } = useGovernanceAssets()
  const shouldBeGoverned = index !== 0 && governance

  const [form, setForm] = useState<AddRegisteredProviderForm>({
    governedTokenAccount: undefined,
    provider: undefined,
  })
  const [governedAccount, setGovernedAccount] = useState<
    ProgramAccount<Governance> | undefined
  >(undefined)

  const [formErrors, setFormErrors] = useState({})
  const { handleSetInstructions } = useContext(NewProposalContext)

  const handleSetForm = ({ propertyName, value }) => {
    setFormErrors({})
    setForm({ ...form, [propertyName]: value })
  }

  const setValidatorProvider = (value) => {
    handleSetForm({
      value: value,
      propertyName: 'provider',
    })
  }

  const getProgram = async (): Promise<
    Program<SolanaValidatorDao> | undefined
  > => {
    if (!wallet || !wallet.publicKey) {
      return undefined
    }

    const provider = new AnchorProvider(
      connection.current,
      {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      },
      { commitment: 'confirmed' }
    )

    const idl = await Program.fetchIdl(programId, provider)
    if (!idl) {
      console.log('idl is null')
      return undefined
    }
    const program = new Program(
      idl,
      programId,
      provider
    ) as Program<SolanaValidatorDao>
    return program
  }

  const getProviders = async (): Promise<ValidatorProvider[]> => {
    const program = await getProgram()
    if (!program) {
      return []
    }

    type ValidatorProviderPA = Omit<
      IdlAccounts<SolanaValidatorDao>['validatorProvider'],
      'metaData'
    >

    const validatorProviders = await program.account.validatorProvider.all()

    const p: ValidatorProvider[] = validatorProviders.map((x) => {
      const validatorProvider: ValidatorProviderPA = x.account as ValidatorProviderPA
      const name = validatorProvider.name
        .splice(0, validatorProvider.name.indexOf(0))
        .map((x) => String.fromCharCode(x))
        .join('')
      const desc = validatorProvider.description
        .splice(0, validatorProvider.description.indexOf(0))
        .map((x) => String.fromCharCode(x))
        .join('')
      return {
        name: name,
        address: x.publicKey,
        owner: validatorProvider.owner,
        description: desc,
        rating: validatorProvider.rating,
        numberOfGovernanceServing: validatorProvider.servingGovernanceCount,
      }
    })

    return p
  }

  //getStakeAccounts().then(x => setStakeAccounts(x))

  const [validatorProviders, setValidatorProviders] = useState<
    ValidatorProvider[]
  >([])

  const validateInstruction = async (): Promise<boolean> => {
    if (!form.provider) return false
    return true
  }

  async function getInstruction(): Promise<UiInstruction> {
    const isValid = await validateInstruction()
    const returnInvalid = (): UiInstruction => {
      return {
        serializedInstruction: '',
        isValid: false,
        governance: undefined,
      }
    }
    const program = await getProgram()
    if (!connection) {
      console.log('Invalid connection')
    }
    if (!isValid) {
      console.log('Invalid isValid')
    }
    if (!programId) {
      console.log('Invalid programId')
    }
    if (!program) {
      console.log('Invalid program')
    }
    if (!form.governedTokenAccount) {
      console.log('Invalid governance token account')
    }
    if (!form.provider) {
      console.log('Invalid provider')
    }
    if (
      !connection ||
      !isValid ||
      !programId ||
      !program ||
      !form.governedTokenAccount?.isSol ||
      !form.provider
    ) {
      console.log('Invalid form')
      return returnInvalid()
    }
    const governance = form.governedTokenAccount.governance
    const [governanceProvider] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('governance_provider'),
        governance.pubkey.toBuffer(),
        form.provider.address.toBuffer(),
      ],
      programId
    )
    const instruction = await program.methods
      .addRegisteredProviderToGovernance()
      .accounts({
        governanceAi: governance.pubkey,
        governanceNativeTreasury: form.governedTokenAccount.pubkey,
        providerData: form.provider.address,
        governanceProviderData: governanceProvider,
        systemProgram: web3.SystemProgram.programId,
        clock: web3.SYSVAR_CLOCK_PUBKEY,
      })
      .instruction()

    return {
      serializedInstruction: serializeInstructionToBase64(instruction),
      isValid: true,
      governance: governance,
      shouldSplitIntoSeparateTxs: false,
    }
  }

  useEffect(() => {
    setGovernedAccount(form.governedTokenAccount?.governance)
  }, [form.governedTokenAccount])

  useEffect(() => {
    handleSetInstructions(
      {
        governedAccount: governedAccount,
        getInstruction,
      },
      index
    )
  }, [form])

  useEffect(() => {
    handleSetInstructions(
      { governedAccount: governedAccount, getInstruction },
      index
    )
  }, [form])

  useEffect(() => {
    getProviders().then((x) => setValidatorProviders(x))
  }, [form.provider])

  return (
    <>
      <GovernedAccountSelect
        label="Treasury account"
        governedAccounts={governedTokenAccountsWithoutNfts.filter(
          (x) => x.isSol
        )}
        onChange={(value) => {
          handleSetForm({ value, propertyName: 'governedTokenAccount' })
        }}
        value={form.governedTokenAccount}
        error={formErrors['governedTokenAccount']}
        shouldBeGoverned={shouldBeGoverned}
        governance={governance}
      ></GovernedAccountSelect>
      <ValidatorProviderSelect
        label="Registered Validator Provider"
        validatorProviders={validatorProviders}
        value={form.provider}
        error={formErrors['provider']}
        onChange={setValidatorProvider}
      />
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(164, 172, 183, 1)',
          marginTop: '18px',
        }}
      >
        Choose a provider governance want to use from the registed list of
        provider. It is advised that you should know the provider or its owner
        before adding it to your list.
      </div>
    </>
  )
}

export default AddRegisteredValidatorProvider
