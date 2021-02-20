import React, { useState } from 'react'

import MobileMenuLink from './MobileMenuLink'

import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import styles from './MobileMenu.module.css'

export default function MobileMenu(props: MobileMenuProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <div className={styles.alignRight}>
      <IconButton
        className={styles.white}
        aria-label="open-navigation-menu"
        onClick={() => setMenuIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Modal
        open={menuIsOpen}
        onClose={() => setMenuIsOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={menuIsOpen}>
          <div className={styles.body}>
            {props.pathArray.map((pathObject, index) =>
              <MobileMenuLink
                key={pathObject.path}
                pathObject={pathObject}
                closeModal={() => setMenuIsOpen(false)}
                isLastItem={index === props.pathArray.length - 1}
              />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}