# To-Do-list-Challenge

This is a to-do list application challenge of Blue Windows LTD. <br/>
### Requirements
     # Frontend:
        - angular
        - bootstrap CDN

    # Backend:
        - express
        - cors
        - bodyparser
        - nodemon
        - mysql2

    #Database:
        - MySQL

## Run  the application locally

To run the application locally you have to run "npm install" after init -y the main folder and  after installing all the required package by running the command `npm install` in both frontend and backend, you have to install concurrently via npm(`npm install concurrently)` in the main folder of the app and then configure the package.json of this main folder by adding:<br/>
    -` "server":"npm start --prefix backend"`<br/>
    - `"client":"npm start --prefix frontend"`<br/>
    - `"dev":"concurrently \"npm run server\" \"npm run client\" "`<br/>


inside the "scripts" key. And after that you will be able to run the command "npm run dev" to launch both the frontend and the backend.

In the backend you have to setup the value for your mysql database in the `index.js` (a sql file `todolist.sql` will be provided to facilitate work evaluation by adding table and row in the database).


## Navigate in the application
The authentication is implemented so to add a task or to see them you have to sign in or sign up to add a task, you can create, see them, edit them and delete. You can filter using the title. You have to add your value for the required filed such as the database name, root, password and so on in the .env
the application communicate with the database so to see results you have to resfresh the page to see results of operations communicating with the database

## Containerize the application

Now To build to containerize the full application, you have to run the `start.sh` using a linux terminal terminal (iff you are a windows user you have to had a linux terminal in your computer). Otherwise you have to run the 3 commands inside the `start.sh` yourself in a windows terminal(comments has been made to explain each of the command).





       