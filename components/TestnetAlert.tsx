import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import styles from '/styles/Home.module.css'

// interface for passing num credits property down to component
interface alertProps {
  title: string
  body: string
}

const TestnetAlert: React.FC<alertProps> = ({title, body}) => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div className={styles.testnet}>
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{title}</Alert.Heading>
          <p>
            {body}
          </p>
          <a href='https://coinslauncher.com/add-custom-networks-to-metamask/'
            target="_blank" 
            rel="noopener"
          > 
            How to add the AVAX Fuji network to your wallet
          </a>
        </Alert>
      </div>
    )
  } else {
    <div>
      
    </div>
  }
  return (
    <p/>
  )

}

export default TestnetAlert