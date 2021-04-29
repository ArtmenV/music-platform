import { Card, Grid, IconButton } from '@material-ui/core'
import { Delete, Pause, PlayArrow } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { Interface } from 'node:readline'
import React from 'react'
import { ITrack } from '../types.ts/track'
import styles from './TrackItem.module.scss'

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

export const TrackItem: React.FC<TrackItemProps> = (
  {track, active = false}
) => {
  const router = useRouter()
  
  return (
    <Card 
      className={styles.card}
      onClick={() => router.push(`/tracks/${track._id}`)}
    >
      <div className={styles.track}>
        <IconButton onClick={e => e.stopPropagation()}>
          {
            active 
              ? <Pause /> 
              : <PlayArrow />
          }
        </IconButton>
        <img 
          width={70} 
          height={70} 
          src={track.picture}
          alt=""
        />
        <Grid 
          container 
          direction="column"
          className={styles.track__name}
        >
          <div>{track.name}</div>
          <div className={styles.track__artist}>{track.artist}</div>
        </Grid>
        {active && <div>02:42 / 03:22</div>}
      </div>
 
      <IconButton 
        className={styles.track__delete}
        onClick={e => e.stopPropagation()} 
      >
        <Delete />
      </IconButton>
    </Card>
  )
}
