import { useRouter } from 'next/router'
import { Grid, Card, Button, Box, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { MainLayout } from '../../layouts/MainLayouts'
import styles from './tracks.module.scss'
import { ITrack } from '../../types.ts/track'
import { TrackList } from '../../components/TrackList'
import { useTypedSelector } from '../../hook/useTypeSelector'
import { useActions } from '../../hook/useActions'
import {nextThunkDispatch, wrapper} from "../../store/index";
import { fetchSearchTracks, fetchTracks } from '../../store/actions/track'
import { useDispatch } from 'react-redux'

const Index = () => {
  const router = useRouter()
  const {tracks, error} = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as nextThunkDispatch;
  const [timer, setTimer] = useState(null)

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

    if (timer) {
      clearTimeout(timer)
    }
    
    setTimer(
      setTimeout(async () => {
        await dispatch(await fetchSearchTracks(e.target.value))
      }, 500)
    )
  
  }

  if (error) {
    return (
      <MainLayout>
        <h1>{Error}</h1>
      </MainLayout>
    ) 
  }
  
  return (
    <MainLayout title={'Список треков - музыкальная платформа'}>
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
          <TextField 
            fullWidth
            value={query}
            onChange={search}
          />
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