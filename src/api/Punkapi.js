import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.punkapi.com/v2/'
})

export const Punkapi = {
  getBeers: (page = 1) => api.get('beers?page=' + page + '&per_page=9'),
  search: (term) => api.get('beers?beer_name=' + term),
  getIds: (ids) => api.get('beers?ids=' + ids),
  getSimilar: (hops, malt) => api.get('beers?hops=' + hops + '&malt=' + malt)
}