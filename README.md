# Stiflix

***Note***: Choose `deploy-test` branch. This branch is the most up-to-date. The `main` branch is outdated at the moment.

This is a clone of Netflix, but with more movies and without ads. The UI is as close
to Netflix as possible, with further changes upcoming to make it exactly like Netflix. I managed
to replicate the first pages, including the page with the movies. I kept a Netflix tab opened and
tried to write code until the UI was the same. However, I had to invent/guess the other 
pages because I don't have Netflix. Any suggestion on what to change or add (including sending screenshots)
are welcome.

Users can register, but this isn't mandatory to watch movies. However, some of the features
of the web app (such as: movie history, watchlist, watch later list, favourites list, etc.) 
are not available to unregistered users. The web app is still in development, so some features
might not work as expected. For more information check the [Task List](#task-list).

User registration and authentication is handled by Firebase. I noticed that when user registers, 
the confirmation email is sent to spam. Don't know why. Once logged in, the session will be stored
so no need to log in the next time you open the app.

**Note**: I don't have access to user passwords. I can only delete users from the Firebase console. You can check this out for yourself on firebase documentation/dashboard

## Running the app
The app has a client-server architecture. The (proxy) server is used to get movie sources. This because
the movie sources use CORS (Cross Origin Resource Sharing) and a cross proxy is needed. Basically, the server
sends https requests to some APIs on client's behalf. Running the server
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
This file contains the route to watch a movie. You need the movieId. Check out the documentation on `FetchedMovieController.js` 
on how the movie data is obtained. **TLDR**: Http requests to tmdb.org APIs that respond with a json that contains an ID among other data. You can 
navigate to this route in this way: localhost:5137/movies/:movieId. `MoviePlaying.jsx` will retrieve the movie id parameter. 
Afterward, check out the APIs in client directory and `FetchedMovieController.js` in client/src/controllers directory. Read the 
documentation to understand how to get the movie details of a movie given the id. Then check out the documentation in 
`FetchLinksControllers.js` in client/src/controllers directory to understand how to get the links. There is a function called 
`fetchLinks` that you have to use. Afterward, add the following code under linkFetcher in `MoviePlaying.jsx`:

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

## Screenshots and demo

### DEMO DESKTOP
https://github.com/stivengjinaj/StiFlix/blob/deploy-test/screenshots/demo_desktop.mp4

### DEMO MOBILE
https://github.com/stivengjinaj/StiFlix/blob/deploy-test/screenshots/movieDemo_mobile.mov

### First page desktop
![](/screenshots/initialPage_desktop.png)
### Login page on desktop
![](/screenshots/loginPage_desktop.png)
### Login page on mobile
![](/screenshots/loginPage_mobile.png)  
### Sign up page on desktop
![](/screenshots/signupPage_desktop.png)
### Sign up page on mobile
![](/screenshots/signupPage_mobile.png)
### Account page on desktop
![](/screenshots/accountPage_desktop.png)
### Account page on mobile
![](/screenshots/accountPage_mobile.png)
### Movies page on desktop
![](/screenshots/moviesPage_desktop.png)
### Clicking "More Info" on the main movie on the movies page.
![](/screenshots/moreinfo_desktop.png)
### Clicking a random movie on the movies page.
![](/screenshots/movieClicked_desktop.png)
### Tv show clicked
![](/screenshots/tvshowClicked_desktop.png)
### Tv show clicked when user is not logged in
![](/screenshots/notLoggedIn_desktop.png)
### User favourites
![](/screenshots/userFavourites_desktop.png)



## Task List

| Task                                                  | Description                                                                                                                                                                                                                        | Priority | Status               |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------|
| Video Player Skin                                     | Add personalized skin to the iframe vide                                                                                                                                                                                           | Optional | Not started          |
| Video Progress                                        | Save the progress of the video watched                                                                                                                                                                                             | High     | Not started          |
| Watch movie UI                                        | Simple UI to watch a movie/tv show, with switch server dropdown.                                                                                                                                                                   | High     | Not started          |
| Category Filter                                       | Filter videos by category                                                                                                                                                                                                          | Medium   | Not started          |
| Login/Register                                        | Add users                                                                                                                                                                                                                          | High     | Done                 |
| More info                                             | Show movie info                                                                                                                                                                                                                    | Medium   | Done                 |
| Favourites                                            | Add a video to the favourites list                                                                                                                                                                                                 | High     | Done                 |
| Favourites page                                       | View favourite movies                                                                                                                                                                                                              | Medium   | Done                 |
| WatchList                                             | Add a video to the watch list                                                                                                                                                                                                      | High     | Done                 |
| Watchlist page                                        | View watchlist movies                                                                                                                                                                                                              | Medium   | Done                 |
| Watch later                                           | Add a video to the to watch list                                                                                                                                                                                                   | High     | Done                 |
| Watch later page                                      | View movies to watch later                                                                                                                                                                                                         | Medium   | Done                 |
| Search                                                | Search for a movie                                                                                                                                                                                                                 | High     | Done                 |
| UI for tv show                                        | Page where you can select the season/episode of a tv show. Can be simply video player with season/episode dropdowns                                                                                                                | Medium   | Done                 |
| My account                                            | Page where you can see/change your account details.                                                                                                                                                                                | Medium   | Done                 |
| Route blocker                                         | Block navigation by link if user is not logged in. E.g: Navigating to favourites takes you to login.                                                                                                                               | High     | Done                 |
| GSAP animations on movies page                        | GSAP animations tend to lag on pages where UI appears after asynchronous requests are done. Refresh is needed to remove lag.                                                                                                       | Medium   | Need further testing |
| Pass user/user authentication state from root App.jsx | User log in state is initially handle from root file App.jsx. Also it is handle in other pages where logged in user is required. Modification is needed to manage this only on App.jsx and pass user state as prop to other routes | Medium   | Done                 |






