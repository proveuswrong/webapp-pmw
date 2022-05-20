import styles from "./index.module.scss"
import {useEffect, useState, useContext} from "react";
import {contractInstances, sendTransaction, EthereumContext} from "../../data/ethereumProvider";
import FormCreate from "/src/components/formCreate";
import ConfirmCreate from "/src/components/confirmCreate";
import {ethers} from "ethers";


export default function Index() {
  const ethereumContext = useContext(EthereumContext);
  const [createFlowProgress, setCreateFlowProgress] = useState(0)


  function handleSave() {
    console.log('saved')
    setCreateFlowProgress(1)
  }

  async function handleCreate() {
    console.log(ethereumContext.contractInstance)
    const unsignedTx = await ethereumContext.contractInstance.populateTransaction.initializeClaim('invalidIpfsPath', 0, 0, {value: 123000000000})

    ethereumContext.ethersProvider.getSigner().sendTransaction(unsignedTx).then(console.log)
  }

  function handleGoBack() {
    setCreateFlowProgress(0)
  }


  return (
    <section>

      <h1>Create</h1>
      <small style={{marginBottom: '32px', display: 'block'}}>Component rendered at: {ethereumContext.blockNumber}</small>
      {createFlowProgress === 0 && <FormCreate handleSave={handleSave}/>}
      {createFlowProgress === 1 &&
        <ConfirmCreate title='a title' description='a description' bounty={0.123} categoryNo={1} handleCreate={handleCreate}
                       handleGoBack={handleGoBack}/>}

    </section>

  );
}
