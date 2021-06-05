import { Grid, Card, Button, Box, TextField } from '@material-ui/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FileUpload } from '../../../components/FileUpload'
import { StepWrapper } from '../../../components/StepWrapper'
import { useInput } from '../../../hook/useInput'
import { MainLayout } from '../../../layouts/MainLayouts'
import styles from './create.module.scss'

const Index = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [picture, setPicture] = React.useState(null)
  const [audio, setAudio] = React.useState(null)
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const router = useRouter()

  const next = (): void => {
    if (activeStep !== 3) {
      setActiveStep(prev => prev + 1)
      return
    }

    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('text', text.value)
    formData.append('artist', artist.value)
    formData.append('picture', picture)
    formData.append('audio', audio)

    console.log('name', name)
    console.log('text', text)
    console.log('artist', artist)
    console.log('picture', picture)
    console.log('audio', audio)
  
    axios.post('http://localhost:5000/tracks', formData)
      .then(response => router.push('/tracks'))
      .catch(e => console.log(e))
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
              {...name}
              className={styles.step__field}
              label={'Название трека'}
            />

            <TextField
              {...artist}
              className={styles.step__field}
              label={'Имя исполнителя'}
            />

            <TextField
              {...text}
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
