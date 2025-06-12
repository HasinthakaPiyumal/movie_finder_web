export const trendingMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    poster: "/placeholder.svg?height=400&width=300",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    duration: "152 min",
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    writer: "Jonathan Nolan, Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Maggie Gyllenhaal", "Gary Oldman"],
  },
  {
    id: 2,
    title: "Inception",
    poster: "/placeholder.svg?height=400&width=300",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    duration: "148 min",
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    writer: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page", "Ken Watanabe", "Cillian Murphy"],
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/placeholder.svg?height=400&width=300",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.6,
    duration: "169 min",
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    writer: "Jonathan Nolan, Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon", "Mackenzie Foy"],
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "/placeholder.svg?height=400&width=300",
    genre: "Crime",
    year: 1994,
    rating: 8.9,
    duration: "154 min",
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    writer: "Quentin Tarantino, Roger Avary",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis", "Ving Rhames", "Harvey Keitel"],
  },
]

export const movieDatabase = [
  ...trendingMovies,
  {
    id: 5,
    title: "The Matrix",
    poster: "/placeholder.svg?height=400&width=300",
    genre: "Sci-Fi",
    year: 1999,
    rating: 8.7,
    duration: "136 min",
    plot: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    director: "Lana Wachowski, Lilly Wachowski",
    writer: "Lilly Wachowski, Lana Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Gloria Foster", "Joe Pantoliano"],
  },
  {
    id: 6,
    title: "Fight Club",
    poster: "/placeholder.svg?height=400&width=300",
    genre: "Drama",
    year: 1999,
    rating: 8.8,
    duration: "139 min",
    plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.",
    director: "David Fincher",
    writer: "Chuck Palahniuk, Jim Uhls",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter", "Meat Loaf", "Jared Leto", "Zach Grenier"],
  },
  {
    id: 7,
    title: "Goodfellas",
    poster: "/placeholder.svg?height=400&width=300",
    genre: "Crime",
    year: 1990,
    rating: 8.7,
    duration: "146 min",
    plot: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    director: "Martin Scorsese",
    writer: "Nicholas Pileggi, Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci", "Lorraine Bracco", "Paul Sorvino", "Frank Sivero"],
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    poster: "/placeholder.svg?height=400&width=300",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    duration: "142 min",
    plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    director: "Frank Darabont",
    writer: "Stephen King, Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown", "Gil Bellows"],
  },
]

export function getRecommendations(query: string) {
  // Simple recommendation logic based on genre matching
  const searchTerm = query.toLowerCase()

  // Find movies that match the search term
  const exactMatches = movieDatabase.filter((movie) => movie.title.toLowerCase().includes(searchTerm))

  if (exactMatches.length > 0) {
    // Return movies with similar genres
    const genres = exactMatches.map((movie) => movie.genre)
    return movieDatabase
      .filter((movie) => genres.includes(movie.genre) && !exactMatches.some((m) => m.id === movie.id))
      .slice(0, 8)
  }

  // If no exact matches, return popular movies
  return movieDatabase.slice(0, 6)
}

export function getMovieById(id: number) {
  return movieDatabase.find((movie) => movie.id === id)
}
