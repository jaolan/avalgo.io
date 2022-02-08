import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from '/styles/NFTModal.module.css'
import { useNFTBalances } from "react-moralis";

interface nftProps {
  title?: string
  imageUrl?: string
  description?: string
  show: any // props object to control show/hide
  onHide: any // props object to control show/hide
}

/*
  Modular modal for displaying NFT metadata
*/
const NFTModal: React.FC<nftProps> = ({title, imageUrl, description, show, onHide}) => {
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
  const [nftTitle, setNftTitle] = useState(title)
  const [nftDescription, setNftDescription] = useState(description)
  const [nftImageUrl, setNftImageUrl] = useState(imageUrl)
  const [nftOwner, setNftOwner] = useState('')

  useEffect(() => {
    var ownerOf: string
    const setMetadata = async () => {
      var nftData
      var res
      // @ts-ignore
      await getNFTBalances({ params: { chain: "0xa869" },
        onSuccess: (data) => {
          if (data == null) return
          // Check user's NFT list for Avalgo Pass
          data.result?.forEach(result => {
            // Set metadata
            result.metadata 
              ? nftData = JSON.parse(result?.metadata)
              : nftData = null
            result.owner_of 
              ? ownerOf = result.owner_of
              : ownerOf = ''
            // Check NFT data to ensure we have an avalgo pass as our data
            nftData.name === "Avalgo Pass"
              ? res = nftData//console.log(`NFT: \n${nftData.name}\n${nftData.image}\n${nftData.description}`)
              : res = { }
            console.log('nftdata: ', nftData)
          })
        }
      })

      if (res == undefined) return
      title = res["name"]
      imageUrl = res["image"]
      description = res["description"]

      // Set component data
      setNftTitle(title)
      setNftImageUrl(imageUrl)
      setNftDescription(description)
      setNftOwner(ownerOf)
    }
    setMetadata()
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your new NFT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>{nftTitle}</b>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={nftImageUrl}/>
        </div>
        <p><b>Description</b></p>
        <p>{nftDescription}</p>
        <p><b>Owner</b></p>
        <a className={styles.address} target='_blank' href={'https://testnet.snowtrace.io/address/' + nftOwner}>{nftOwner}</a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NFTModal