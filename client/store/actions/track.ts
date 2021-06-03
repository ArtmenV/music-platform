import axios from "axios"
import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types.ts/track"

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:5000/tracks')
      console.log('aaa', response);
      
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: response.data
      })
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR, 
        payload: 'Произошла ошибка при загрузке трека'
      })
    }
  }
}