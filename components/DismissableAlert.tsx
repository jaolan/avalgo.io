import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import MintButton from './MintButton';
import styles from '/styles/Home.module.css'
import NFTBalance from "./NFTBalance"

// interface for passing num credits property down to component
interface alertProps {
  title: string
  body: string
}

const AlertDismissable: React.FC<alertProps> = ({title, body}) => {
  const [show, setShow] = useState(true);


  const getBalWrapper = () => {
    const bal = NFTBalance.getBalance()
    return Number(bal) > 0
  }
  
  if (show &&  getBalWrapper() ) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <div className={styles.center}>
        <Alert.Heading>{title}</Alert.Heading>
        <p>
          {body}
        </p>
        <MintButton/>
        </div>
      </Alert>
    )
  } else {
    return (
      <div>

      </div>
    )
  }

}

export default AlertDismissable