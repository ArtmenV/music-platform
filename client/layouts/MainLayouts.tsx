import { Container } from '@material-ui/core';
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Player } from '../components/Player'
import styles  from './MainLayouts.module.scss'
import Head from 'next/head'

interface MainLayoutProps {
  title?: string
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title || 'Музыкальная площадка'}</title>
      </Head>
      <Navbar />
      <Container className={styles.container}>
        {children}
      </Container>
      <Player />
    </>
  )
}