import { defineStore } from 'pinia'
import axios from 'axios'
export const useStoreMovie = defineStore('Movies', () => {
  const Base_Url = 'https://api.themoviedb.org/3'
  const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN
  const headers = {
    Authorization: 'bearer ' + TMDB_TOKEN
  }
  async function getData(url) {
    try {
      const data = await axios.get(Base_Url + url, {
        headers
      })
      return console.log(data)
    } catch (e) {
      console.log(e)
      return e
    }
  }
  getData()
  return { getData }
})
