import React, { Component } from 'react';
import { useState } from 'react'
import Link from 'next/link'
import styles2 from '/styles/Home.module.css'
import styles from '/styles/Navbar.module.css'
import ConnectButton from './ConnectButton';

const Navbar = () => {
  const [isOpen,setIsOpen] = useState(false);
  const openMenu= ()=> setIsOpen(!isOpen);

  return (
    <header className={styles2.header}>
    <nav className={styles.navbar}>
      <Link href='/'>
        <a className={styles.navlogo}>[Avalgo]</a>
      </Link>
      <div className={styles.navitem}>
      <Link href='/code'>
        <a className={isOpen === false ? 
                  styles.navlink : styles.navlink+' '+styles.active}
                  onClick={openMenu}>Code</a>
      </Link>
      </div>
      <ul className={isOpen === false ? 
        styles.navmenu : styles.navmenu +' '+ styles.active}>
        <div className={styles.navitem}>
          <ConnectButton />
        </div>
      </ul>
      <button className={isOpen === false ? 
        styles.hamburger : styles.hamburger + ' ' + styles.active}
        onClick={openMenu}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
    </nav>
  </header>
  )
}

export default Navbar

