# Run API locally

You can this api locally in 2 ways

- **With docker**
- **with a local Accor DB postgreSQL**

## With docker

- the first time you run locally the API with docker, you have to : 
  
  * on folder **lambda_api_user_channels/lambda_api_user_channels** **integrated terminal**
    
    * run **docker-compose up --build**
  
  * open **pgAdmin** :
    
    * there should have only one database : **postgres**
    
    * right click on it and select query tool
    
    * copy/paste from **backup/login.sql** to **pgadmin query tool**
      
      * execute the sql script that should create two **users / roles** postgresql : **ngd_us**er and **ngd_master_user**
    
    * create database "**Accor**"
    
    * restore db "Accor" from backup/backup.tar (right click on db Accor, select restore then select backup.tar file)
    
    * ==> you should have a correct db "**Accor**" and the API runing in docker
  
  * Now you can test the API with **postman**, the base uri of all actions is http://localhost:3000
    
    * ==> add to this uri the entity operation to run (subcros, maincros, ...), all the actions exists in **GET**, **POST**, **PUT**, **DELETE**, to query/update datas

## With a local "Accor" DB postgreSQL

- Before runnig the api locally **without** docker, you must have a **postgresql** database (and then have installed postgresql **17** on your computer)

- do the previous steps to **create/restore** the db "**Accor**" (previously : **<u>open pgAdmin</u>**, ....)

- once the postgresql environment is installed

- update the **db.config.json** file :
  
  - replace  ** "host": "db"**    **with  **** "host": "localhost"**

- open package.json, above the scripts section, click on "Debug" then select "dev"
  
  - this will (self) launch the api

- Now you can test the API with **postman**, the base uri of all actions is http://localhost:3000
  
  * ==> add to this uri the entity operation to run (subcros, maincros, ...), all the actions exists in GET, POST, PUT, DELETE, to query/update datas

## Authors

The following is a list of contributors to this project:

- Karim Cheurfi <karim.cheurfi@consulting-for.accor.com>
- Gabriel Bruno <gabriel.bruno@accor.com>
- Youssef Ascour <youssef.ascour@accor.com>
- Frédéric GUIGUI <frederic.guigui@consulting-for.accor.com>
