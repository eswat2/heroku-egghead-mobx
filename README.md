# heroku-egghead-mobx
[![Dependency Status](https://dependencyci.com/github/eswat2/heroku-egghead-mobx/badge)](https://dependencyci.com/github/eswat2/heroku-egghead-mobx)
[![Heroku](https://heroku-badge.herokuapp.com/?app=egghead-mobx)](https://egghead-mobx.herokuapp.com)

deployed version of the Github Note Taker app:

https://egghead-mobx.herokuapp.com

the source code for the app deployed in this repo can be found here:

https://github.com/eswat2/egghead-mobx



## Reference
this project includes a pre-built **bundle.js** from the **egghead-mobx** repo.
To make this work, the **fauxBase.jsx** file had to be modified as follows:

- set **BASE_URI** to an empty string to allow the api call to go to the local server

<img width="650" alt="screen shot 2016-07-19 at 9 58 02 pm" src="https://cloud.githubusercontent.com/assets/334293/16975568/bda1afe6-4dfc-11e6-984a-d96e828f2e7c.png">
