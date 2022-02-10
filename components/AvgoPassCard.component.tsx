import React, { useEffect, useState } from "react";
import { Moralis } from 'moralis';
import { Card } from "react-bootstrap";

import styles from '/styles/Home.module.css'
import NFTBalance from "./NFTBalance";

import { useMoralis } from "react-moralis"

// Display AVAX price, tap to refresh
//
//  Uses react-bootstrap styling
//  Smart contract uses Chainlink as a price oracle
const AvgoPass = () => {
  const [status, setStatus] = useState<string>('AvalgoPass: Inactive ❌')
  // NFT holder
  const [count, setCount] = React.useState<number>(0);
  const { authenticate, isAuthenticated, logout, user} = useMoralis()

  // Get NFT balance
  useEffect(() => {
   const getNFTBalance = async () => {
      const bal = await NFTBalance.getBalance()
      setCount(Number(bal))
      if(bal){
        bal > 0 
          ? setStatus('AvalgoPass: Owned ✅') 
          : setStatus('AvalgoPass: Not Owned ❌')
      }
      
   } 
   getNFTBalance()
  }, [count]);

  return (
      <Card border="danger" text="danger" className={styles.avaxPrice}>
        <Card.Body>{status}</Card.Body>
      </Card>
  )
}

export default AvgoPass;