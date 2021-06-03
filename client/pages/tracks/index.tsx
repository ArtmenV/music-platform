import { useRouter } from 'next/router'
import { Grid, Card, Button, Box } from '@material-ui/core'
import React from 'react'
import { MainLayout } from '../../layouts/MainLayouts'
import styles from './tracks.module.scss'
import { ITrack } from '../../types.ts/track'
import { TrackList } from '../../components/TrackList'
import { useTypedSelector } from '../../hook/useTypeSelector'
import { useActions } from '../../hook/useActions'
import {nextThunkDispatch, wrapper} from "../../store/index";
import { fetchTracks } from '../../store/actions/track'

const Index = () => {
  const router = useRouter()
  // const tracks: ITrack[] = [
  //   {
  //     _id: '1',
  //     name: 'Трек 1',
  //     artist: 'Испольнитель 1',
  //     text: 'Какой-то текст',
  //     listens: 5,
  //     audio: 'http://localhost:5000/audio/5bc4930b-7e65-483f-afe0-bd1f4bf9b17f.mp3',
  //     picture: 'http://localhost:5000/image/1fe0086d-fe31-4436-ad0c-2f9e1305bc6c.jpg',
  //     comments: [],
  //   },
  //   {
  //     _id: '2',
  //     name: 'Трек 2',
  //     artist: 'Испольнитель 2',
  //     text: 'Какой-то текст',
  //     listens: 7,
  //     audio: 'http://localhost:5000/audio/6a62fe89-5998-4ccc-af52-270c2a360107.mp3',
  //     picture: 'http://localhost:5000/image/3b3035b9-2d74-4ddd-891a-08a11d79b735.jpg',
  //     comments: [],
  //   },
  //   {
  //     _id: '3',
  //     name: 'Трек 3',
  //     artist: 'Испольнитель 3',
  //     text: 'Какой-то текст',
  //     listens: 2,
  //     audio: 'http://localhost:5000/audio/c526352f-2df9-4036-b566-42e59f526ea4.mp3',
  //     picture: 'http://localhost:5000/image/e931cbba-1f0f-42e4-8fb2-aa582c53ac0d.jpg',
  //     comments: [],
  //   },
  // ]
  const {tracks, error} = useTypedSelector(state => state.track)

  if (error) {
    return (
      <MainLayout>
        <h1>{Error}</h1>
      </MainLayout>
    ) 
  }
  
  return (
    <MainLayout>
      <Grid container justify="center">
        <Card className={styles.card}>
          <Box p={3}>
            <Grid container justify="space-between">
              <h1>Список треков</h1>
              <Button 
                onClick={() => router.push('/tracks/create')}
              >
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Index; 

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
  const dispatch = store.dispatch as nextThunkDispatch
  await dispatch(await fetchTracks())
}) 