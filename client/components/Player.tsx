import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons'
import { Grid, IconButton } from '@material-ui/core'
import React, { useEffect } from 'react'
import styles from './Player.module.scss'
import { ITrack } from '../types.ts/track'
import { TrackProgress } from './TrackProgress'
import { useTypedSelector } from '../hook/useTypeSelector'
import { useActions } from '../hook/useActions'
import { playTrack, setVolume } from '../store/actions/player'

let audio;

export const Player = () => {
  const {
    pause, 
    volume,
    active,
    duration,
    currentTime,
  } = useTypedSelector(state => state.player)

  const {
    playTrack,
    pauseTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions()

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
      return
    }
    
    setAudio()
    play()
  }, [active])


  const setAudio = () => {
    if (active) {
      audio.src = `http://localhost:5000/${active.audio}`
      audio.volume = volume / 100

      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }

      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
    }
  }

  const play = () => {
    if (pause) {
      playTrack()
      audio.play();
      return
    }

    audio.pause()
    pauseTrack()
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  if (!active) return null

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {
          !pause 
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
        <div>{active?.name}</div>
        <div className={styles.track__artist}>{active?.artist}</div>
      </Grid>

      <Grid
        container 
        direction="row"
      >
        <TrackProgress 
          left={currentTime}
          right={duration}
          onChange={changeCurrentTime}
        />
        <VolumeUp style={{marginLeft: 'auto'}}/>
        <TrackProgress 
          left={volume}
          right={100}
          onChange={changeVolume}
        />
      </Grid> 
    </div>
  )
}
