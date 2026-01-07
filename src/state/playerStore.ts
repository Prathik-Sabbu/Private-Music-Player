import { Song } from "../data/types"

export type PlayerStatus =
  | "idle"
  | "loading"
  | "playing"
  | "paused"
  | "ended"
  | "error"

export type PlayerState = {
  status: PlayerStatus
  currentSong: Song | null
  queue: Song[]
  positionSec: number
  volume: number
  isShuffle: boolean
  isRepeat: boolean
}

export const initialPlayerState: PlayerState = {
  status: "idle",
  currentSong: null,
  queue: [],
  positionSec: 0,
  volume: 1,
  isShuffle: false,
  isRepeat: false,
}

export function playSong(state: PlayerState, song: Song, queue: Song[] = []): PlayerState {
  return {
    ...state,
    status: "playing",
    currentSong: song,
    queue,
    positionSec: 0,
  }
}

export function pause(state: PlayerState): PlayerState {
    if (state.status !== "playing") return state

    return{
        ...state,
        status: 'paused',
    }
}

export function resume(state: PlayerState): PlayerState{
    if (state.status !== "paused") return state

    return{
        ...state,
        status: 'playing',
    }
}

export function playNext(state: PlayerState): PlayerState{
    if (state.queue.length === 0) {
        return {
            ...state,
            status: 'ended'
        }
    }

    const [nextSong, ...rest] = state.queue

    return {
        ...state,
        status: 'playing',
        currentSong: nextSong,
        queue: rest,
        positionSec: 0,
    }
}
