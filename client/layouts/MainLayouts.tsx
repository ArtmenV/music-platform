import { Container } from '@material-ui/core';
import React from 'react';
import { Navbar } from '../components/Navbar';
import styles  from './MainLayouts.module.scss'

export const MainLayout: React.FC = ({children}) => {
  return (
    <div>
      <Navbar />
      <Container className={styles.container}>
        {children}
      </Container>
    </div>
  )
}