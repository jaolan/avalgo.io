import React, { useEffect, useState } from "react";
import { Moralis } from 'moralis';
import { Card } from "react-bootstrap";
import { ABI, AvaxOracleAddress } from '../contracts/abi/AvaxOracle'

import styles from '/styles/Home.module.css'

// Display AVAX price, tap to refresh
//
//  Uses react-bootstrap styling
//  Smart contract uses Chainlink as a price oracle
const AvaxPrice = () => {
  const [price, setPrice] = useState<number>(0)
  // time interval for refreshing price component
  const [count, setCount] = React.useState<number>(0);

  // Fetch AVAX price from contract every X seconds
  useEffect(() => {
    // set a minor delay to fetch price the first time
    setTimeout(function (){
      handlePrice()
    }, 10);

    // check price subsequently every 10 seconds
    const timer = window.setInterval(() => {
      setCount(count => count + 1)
      handlePrice()
    }, 10000);

    return () => {
      window.clearInterval(timer);
    };
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  // interact w/ chainlink contract we deployed to track AVAX price
  //  contract addy: 0x8705A5883B520a672fB89865ed8Afa66828f3987
  const handlePrice = async () => {
    try {
      const options = {
        chain: "0xa869",
        address: AvaxOracleAddress,
        function_name: "getLatestPrice",
        abi: ABI
      };
      // The below moralis func will NOT run in typescript as of 1/1/2022, use ignore
      // @ts-ignore
      const price = await Moralis.Web3API.native.runContractFunction(options);
      // writing numbers in javascript is fun
      const fmtPrice: number = parseFloat((Number(price) * 10**-8).toFixed(2))
      setPrice(fmtPrice)
      return true
    } catch (e) {
      console.log(e)
      setPrice(0)
      return false
    }
  }

  return (
      <Card border="danger" text="danger" className={styles.avaxPrice}>
        <Card.Body>1 🔺 = ${price}</Card.Body>
      </Card>
  )
}

export default AvaxPrice;