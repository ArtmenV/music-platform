import { Button, Grid, TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { MainLayout } from '../../layouts/MainLayouts'
import { ITrack } from '../../types.ts/track'
import styles from './track.module.scss'

const TrackPage = () => {
  const track: ITrack = {
    _id: '3',
    name: 'Трек 3',
    artist: 'Испольнитель 3',
    text: 'Какой-то текст',
    listens: 2,
    audio: 'http://localhost:5000/audio/c526352f-2df9-4036-b566-42e59f526ea4.mp3',
    picture: 'http://localhost:5000/image/e931cbba-1f0f-42e4-8fb2-aa582c53ac0d.jpg',
    comments: [],
  }
  const router = useRouter()

  return (
    <MainLayout>
      <Button
        className={styles.button}
        onClick={() => router.push('/tracks')}
      >
        К списку
      </Button>
      <Grid container className={styles.content}>
        <img 
          src={track.picture} 
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
          className={styles.name}
          label="Ваше имя"
          fullWidth
          variant="outlined"
        />
        <TextField 
          label="Комментарий"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
        <Button>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map((comment) => (
          <div>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default TrackPage
