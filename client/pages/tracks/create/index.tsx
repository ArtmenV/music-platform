import { Grid, Card, Button, Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { StepWrapper } from '../../../components/StepWrapper'
import { MainLayout } from '../../../layouts/MainLayouts'
import styles from './create.module.scss'

const Index = () => {
  const router = useRouter()
  return (
    <MainLayout>
      <StepWrapper activeStep={2}>
        <h1>Загрузка трека</h1>
      </StepWrapper>
    </MainLayout>
  )
}

export default Index; 
