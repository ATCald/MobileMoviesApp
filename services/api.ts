// Fetch based on our search query

// WE NEED BASE URL, API KEY, FETCH AWAIT RESULTS.
const API_KEY = '4cf945626c0851dea413b7f7abc74320'
const BASE_URL = 'https://api.themoviedb.org/3'

interface MovieResponse {
  results: Movie[],
  pageNumber: number,
  totalPages: number,
}

export const fetchMovies = async (page: number = 1): Promise<MovieResponse>=> {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return {
      results: data.results,
      pageNumber: data.page,
      totalPages: data.total_pages,
    }

  } catch (err) {
    console.error('Fetch failed', err);
    return {
      results: [],
      pageNumber: page,
      totalPages: 0,
    }
  }
};

export const fetchMoviesBySearch = async (searchTerm: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`)
    if (!response.ok) throw new Error("Network response was not ok")
    const data = await response.json()
    return data.results
  } catch (err) {
    console.error("Error fetching movies by search.", err)
  }
}


export const fetchMoviesById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    if (!response.ok) {
      throw new Error("Failed to fetch using Id")
    }
    const data = await response.json()
    return data

  } catch (err) {
    console.error(err)
  }
}
