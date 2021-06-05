import { Button, Grid, TextField } from '@material-ui/core'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useInput } from '../../hook/useInput'
import { MainLayout } from '../../layouts/MainLayouts'
import { ITrack } from '../../types.ts/track'
import styles from './track.module.scss'

const TrackPage = ({serverTrack}) => {
  const [track, setTrack] = useState<ITrack>(serverTrack)
  const router = useRouter()
  const username = useInput('')
  const text = useInput('')

  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      })
      setTrack({
        ...track,
        comments: [...track.comments, response.data]
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <MainLayout 
      title={`Музыкальная площадка - ${track.name} - ${track.artist}`}
      keywords={`Музыкаб артисты, ${track.name}, ${track.artist}`}
    >
      <Button
        variant={'outlined'}
        className={styles.button}
        onClick={() => router.push('/tracks')}
      >
        К списку
      </Button>
      <Grid container className={styles.content}>
        <img 
          src={'http://localhost:5000/' + track.picture} 
          alt="track"
          width={200}
          height={200}
        />
        <div className={styles.track}>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div> 
      </Grid>
      <h1>Слова в треке</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid container className={styles.container}>
        <TextField
          {...username}
          className={styles.name}
          label="Ваше имя"
          fullWidth
          variant="outlined"
        />
        <TextField
          {...text}
          label="Комментарий"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment, index) => (
          <div key={index}>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id)
  return {
    props: {
      serverTrack: response.data
    }
  }
}
