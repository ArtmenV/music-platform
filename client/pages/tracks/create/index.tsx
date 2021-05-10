import { Grid, Card, Button, Box, TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FileUpload } from '../../../components/FileUpload'
import { StepWrapper } from '../../../components/StepWrapper'
import { MainLayout } from '../../../layouts/MainLayouts'
import styles from './create.module.scss'

const Index = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [picture, setPicture] = React.useState(null)
  const [audio, setAudio] = React.useState(null)
  const router = useRouter()

  const next = (): void => {
    if (activeStep !== 3) {
      setActiveStep(prev => prev + 1)
    }
  }

  const back = () => {
    setActiveStep(prev => prev - 1)
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && 
          <Grid 
            container 
            direction={'column'}
            className={styles.step__item}
          >
            <TextField
              className={styles.step__field}
              label={'Название трека'}
            />

            <TextField
              className={styles.step__field}
              label={'Имя исполнителя'}
            />

            <TextField
              className={styles.step__field}
              label={'Слова к треку'}
              multiline
              rows={3}
            />

          </Grid> 
        }
        {activeStep === 1 && 
          <FileUpload
            setFile={setPicture}
            accept="image/*"
          >
            <Button>Загрузить изображение</Button>
          </FileUpload> 
        }
        {activeStep === 2 && 
          <FileUpload
            setFile={setAudio}
            accept="audio/*"
          >
            <Button>Загрузить аудио</Button>
          </FileUpload> 
        }
      </StepWrapper>
      <Grid container justify='space-between'>
        <Button
          disabled={activeStep === 0}
          onClick={back}
          >
            Назад
          </Button>
        <Button
          onClick={next}
        >
          Далее
          </Button>
      </Grid>
    </MainLayout>
  )
}

export default Index; 
