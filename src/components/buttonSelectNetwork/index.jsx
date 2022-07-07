import React from "react";
import {EthereumContext, chains} from "../../data/ethereumProvider";
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Dropdown, Menu, message, Space, Tooltip} from 'antd';
import CustomButton from "/src/components/ui/button";
import CustomDropdown from "/src/components/ui/dropdown";

import {utils} from "ethers";

const handleMenuClick = (e) => {
  ethereum
    .request({
      method: "wallet_switchEthereumChain", params: [{"chainId": e.key}
      ]
    })
};


const menu = (
  <Menu
    onClick={handleMenuClick}
    items={
      Object.entries(chains).map(([index, chain]) => {
        return {label: chain.name, key: index}
      })
    }
  />
);


export default function ButtonSelectNetwork() {

  return (
    <EthereumContext.Consumer>
      {(value) => (
        <CustomDropdown modifiers='small secondary' overlay={menu}>
          <Button
            id="buttonSelectNetwork" disabled={false}>
            <span key={value.chainId} className='blink'>{chains[value.chainId]?.shortname || "Unsupported Network"}</span>
            <DownOutlined/>
          </Button>
        </CustomDropdown>

      )}
    </EthereumContext.Consumer>
  );
}
