import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from '/styles/Home.module.css'

// Display bounty price in AVAX for corresponding question
//
// Style with react-bootstrap
// Fetch AVAX price and set
//
// TODO: use getters to get each question's bounty from backend
const Bounty = () => {
  const [nativeBounty, setNativeBounty] = useState<number>(0)

  // TODO: Fetch native bounty from question backend
  useEffect(() => {
    getBounty(1)
  }, []);

  // TODO: Fetch native bounty from question backend for specific question
  const getBounty = (question: number) => {
    const bounty: number = 0.04
    setNativeBounty(bounty)
  }

  return (
      <Card border="danger" text="danger" className={styles.avaxBounty}>
          <Card.Body>Bounty: 🔺{nativeBounty}</Card.Body>
      </Card>
  )
}

export default Bounty