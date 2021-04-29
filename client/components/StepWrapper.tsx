import { Card, Container, Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'
import styles from './StepWrapper.module.scss'

interface StepWrapperProps {
  activeStep: number,
  children: React.ReactNode
}

const steps = [
  'Информация о треке',
  'Загрузите обложку',
  'Загрузите сам трек'
]

export const StepWrapper: React.FC<StepWrapperProps> = ({
  activeStep,
  children
}) => {

  return (
    <Container>
      <Stepper>
        {steps.map((step, index) => (  
          <Step
            key={index}
            completed={activeStep > index}
          >
            <StepLabel>
              {step}
            </StepLabel>
          </Step>
        ))}  
      </Stepper>        
      <Grid 
        container 
        justify="center"
        className={styles.step}
      > 
        <Card className={styles.card}>
          {children}
        </Card>
      </Grid>
    </Container>
  )
}
