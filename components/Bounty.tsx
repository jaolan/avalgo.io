import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from '/styles/Home.module.css'

// Display bounty price in AVAX for corresponding question
//
// Style with react-bootstrap
// Fetch AVAX price and set
//

// interface for nativeBounty passing
interface bountyProps {
  nativeReward: number
}

// TODO: use getters to get each question's bounty from backend
const Bounty: React.FC<bountyProps> = ({nativeReward}) => {

  return (
      <Card border="danger" text="danger" className={styles.avaxBounty}>
          <Card.Body>Bounty: 🔺{nativeReward}</Card.Body>
      </Card>
  )
}

export default Bounty