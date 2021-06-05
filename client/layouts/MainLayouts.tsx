import { Container } from '@material-ui/core';
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Player } from '../components/Player'
import styles  from './MainLayouts.module.scss'
import Head from 'next/head'

interface MainLayoutProps {
  title?: string,
  description?: string,
  keywords?: string,
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords
}) => {
  return (
    <>
      <Head>
        <title>{title || 'Музыкальная площадка'}</title>
        <meta 
          name="description" 
          content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым. ${description}`}
        />
        <meta 
          name="robots" 
          content="index, follow"
        />
        <meta 
          name="keywords" 
          content={keywords || 'Музыка, треки, артисты'}
        />
        <meta 
          name="viewport" 
          content="width-device-width, initial-scale=1"
        />
      </Head>
      <Navbar />
      <Container className={styles.container}>
        {children}
      </Container>
      <Player />
    </>
  )
}