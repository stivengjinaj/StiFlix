# Stiflix

This is a clone of Netflix, but with more movie and without ads. The UI is as close
to Netflix as possible, with further changes upcoming to make it exactly like Netflix.
Users can register, but this isn't mandatory to watch movies. However, some of the features
of the web app (such as: movie history, watchlist, watch later list, favourites list, etc.) 
are not available to unregistered users. The web app is still in development, so some features
might not work as expected. For more information check the [Task List](#task-list).

## Running the app
The app has a client-server architecture. The (proxy) server is used to get movie sources. This because
the movie sources use CORS (Cross Origin Resource Sharing) and a cross proxy is needed. Running the server
is not necessary if you only want to check out the UI or test register/login/other movie features that
don't include watching movies. To run the app, follow the steps below:

### Running client

1. Clone the repository.
2. Run `npm install` in the client directory to install dependencies.
3. Run `npm run dev` in the client directory to run the app.

### Running server

1. Clone the repository.
2. Run `npm install` in the server directory to install dependencies.
3. Run `nodemon server.mjs` or `node server.mjs` in the server directory to run the server.

### Running client and server

1. Open two terminals.
2. Do the steps in [Running client](#running-client) and [Running server](#running-server).

If you want to check out both client and server, and get the links for a movie, you have to modify `MoviePlaying.jsx`.
This file contains the route to watch a movie. You can navigate to this route in this way: localhost:5137/movies/:movieId.
`MoviePlaying.jsx` will retrieve the movie id parameter. Afterward, check out the APIs in client directory and `FetchedMovieController.js`
in client/src/controllers directory. Check out the documentation to understand how to get the movie details of a movie given the id.
Then check out the documentation in `FetchLinksControllers.js` in client/src/controllers directory to understand how to get the links. 
There is a function called `fetchLinks` that you need to use. Afterward, add the following code under linkFetcher in `MoviePlaying.jsx`:

```javascript
useEffect(() => {
    // Add the code to retrieve movie details here
    
    // After getting the movie details use fetchLinks to get the links.
    const fetchLinks = async () => {
        const links = await linkFetcher.fetchLinks(movie.title, "movie", movie.release_date, movie.id);
        setLinks(links);
        console.log(links);
    }
}, [])
```
You can check out the links in console.

## Screenshots

!include[First page](./screenshots/initial%20scr.png)
!include[Login page](./screenshots/login%20scr.png)
!include[Login movile](./screenshots/signin%20mobile.png)
!include[Sign up](./screenshots/signup%20scr.png)
!include[Movies page](./screenshots/main%20scr.png)
!include[Movies page mobile](./screenshots/main%20mobile.png)
!include[More info of main movie](./screenshots/mainmoreinfo%20scr.png)
!include[Movie clicked](./screenshots/movieinfo%20scr.png)
!include[Favourite movie](./screenshots/moviefavourite%20scr.png)


## Task List

| Task              | Description                              | Priority | Status      |
|-------------------|------------------------------------------|----------|-------------|
| Video Player Skin | Add personalized skin to the iframe vide | Optional | Not started |
| Video Progress    | Save the progress of the video watched   | High     | Not started |
| Login/Register    | Add users                                | High     | Done        |
| More info         | Show movie info                          | Medium   | Done        |
| Favourites        | Add a video to the favourites list       | Medium   | Done        |
| Favourites page   | View favourite movies                    | Medium   | Not started |
| WatchList         | Add a video to the watch list            | Medium   | Done        |
| Watchlist page    | View watchlist movies                    | Medium   | Not started |
| Watch later       | Add a video to the to watch list         | Medium   | Done        |
| Watch later page  | View movies to watch later               | Medium   | Not started |
| Search            | Search for a video                       | High     | Done        |
| Category Filter   | Filter videos by category                | Medium   | Not started |



