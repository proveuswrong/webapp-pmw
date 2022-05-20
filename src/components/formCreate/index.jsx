import styles from "./index.module.scss"
import {useEffect, useState, useContext} from "react";
import {EthereumContext} from "../../data/ethereumProvider";

export default function FormCreate({handleSave}) {

  const ethereumContext = useContext(EthereumContext);

  return (
    <>
      <input className="displayBlock" type="text" id="title" name="title" required minLength="4" maxLength="36" size="40"
             placeholder='A Flashy Title'/>
      <textarea className="displayBlock" id="description" name="description" rows="5" cols="33" placeholder="A juicy description..."/>

      <div>
        <label htmlFor="bounty">Bounty Amount in ETH:</label>

        <input type="number" id="bounty" name="bounty" min="0.001" max="100.000" step="0.001" placeholder='1.000'/>
      </div>

      <div>

        <label htmlFor="selectCategory">Choose a category:</label>

        <select id="selectCategory">
          <option value="">--Please choose an option--</option>
          {ethereumContext.metaEvidenceContents?.map((item, index) => <option key={index}
                                                                              value={item.category}>{index}: {item.category}</option>)}
        </select>

        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

    </>
  );
}
