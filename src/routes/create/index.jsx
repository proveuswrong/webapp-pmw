import styles from "./index.module.scss"
import {useEffect, useState, useContext} from "react";
import {contractInstances, EthereumContext} from "../../data/ethereumProvider";
import FormCreate from "/src/components/formCreate";
import ConfirmCreate from "/src/components/confirmCreate";


export default function Index() {
  const ethereumContext = useContext(EthereumContext);
  const [createFlowProgress, setCreateFlowProgress] = useState(0)
  console.log(ethereumContext)


  function handleSave() {
    console.log('saved')
    setCreateFlowProgress(1)
  }

  function handleCreate() {
    console.log('created')
  }

  function handleGoBack() {
    setCreateFlowProgress(0)
  }


  return (
    <section>
      <h1>Create</h1>
      {createFlowProgress === 0 && <FormCreate handleSave={handleSave}/>}
      {createFlowProgress === 1 &&
        <ConfirmCreate title='a title' description='a description' bounty={0.123} category={1} handleCreate={handleCreate}
                       handleGoBack={handleGoBack}/>}

    </section>

  );
}
