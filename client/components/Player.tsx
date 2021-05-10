import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons'
import { Grid, IconButton } from '@material-ui/core'
import React from 'react'
import styles from './Player.module.scss'
import { ITrack } from '../types.ts/track'
import { TrackProgress } from './TrackProgress'

export const Player = () => {
  const active = false
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
  return (
    <div className={styles.player}>
      <IconButton onClick={e => e.stopPropagation()}>
        {
          active 
            ? <Pause /> 
            : <PlayArrow />
        }
      </IconButton>

      <Grid 
        xs={3}
        item
        container 
        direction="column"
        className={styles.track}
      >
        <div>{track.name}</div>
        <div className={styles.track__artist}>{track.artist}</div>
      </Grid>

      <Grid
        container 
        direction="row"
      >
        <TrackProgress 
          left={0}
          right={100}
          onChange={() => ({})}
        />
        <VolumeUp style={{marginLeft: 'auto'}}/>
        <TrackProgress 
          left={0}
          right={100}
          onChange={() => ({})}
        />
      </Grid>
    </div>
  )
}
