import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import Link from 'next/link'
import ConnectWallet from "./ConnectWallet.component"

import styles from '/styles/Navigation.module.css'
import AvaxPrice from "./AvaxPrice"

// Navbar component for navigating site
//
// Uses react-bootstrap styling
// Uses nextjs routing
const Navigation = () => {
  const logo: string = "{🔺}"

  return (
    <>
      <Navbar bg="light" variant="light">
        <div className={styles.container}>
          <Link href='/'>
            <a className={styles.navLink}>
              <Navbar.Brand>Avalgo {logo}</Navbar.Brand>
            </a>
          </Link>
        </div>
        
        <Nav className="me-auto">
          <Link href='/code'>
            <a className={styles.navLink}>
              <Nav.Item>Code</Nav.Item>
            </a>
          </Link>
        </Nav>
        <div className={styles.container}>
          <Link href='/'>
            <a className={styles.navLink}>
              <AvaxPrice/>
            </a>
          </Link>
        </div>
        <div className={styles.container}>
          <ConnectWallet/>
        </div>
      </Navbar>
  </>
  )
}

export default Navigation