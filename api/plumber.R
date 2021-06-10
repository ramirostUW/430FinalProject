library(plumber)
library(dplyr)
library(ggplot2)
library(gapminder)
library(odbc)


#* @get /
#* @serializer html
function(){
  "<html>
    <body>
      <h1>Info 430 Final Project API</h1>
      <p> This API is written in R using the plumber package. It was then 
      deployed using the plumberDeploy package and a DigitalOcean account 
      (plumber has DigitalOcean integration, so this is the simplest option.</p>
    </body>
  </html>"
}

#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

# #* @filter cors
# cors <- function(req, res) {
#   
#   res$setHeader("Access-Control-Allow-Origin", "*")
#   
#   if (req$REQUEST_METHOD == "OPTIONS") {
#     res$setHeader("Access-Control-Allow-Methods","*")
#     res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
#     res$status <- 200 
#     return(list())
#   } else {
#     plumber::forward()
#   }
#   
# }

 # do_deploy_api(
 #   'ExampleName2',
 #   'sqlServerAPI/',
 #   'C:/info430/430FinalProject/api',
 #   8001,
 #   overwrite = TRUE
 # )

#* @apiTitle Gapminder API
#* @apiDescription API for exploring Gapminder dataset

#* Returns all park data
#* @get /test_deploy
function() {
  parks
}

#* Returns the result of the query
#* @param query Query to execute and return
#* @get /sqlQuery
function(query) {
  con <- dbConnect(odbc(),
                   Driver = "ODBC Driver 17 for SQL Server",
                   Server = "finalproject430.database.windows.net",
                   Database = "430finalproject",
                   UID = "finalproject430",
                   PWD = "Password430",
                   Port = 3306)
  dbGetQuery(con, query)
}

#* Returns countries that satisfy condition
#* @get /testQuery
function() {
  con <- dbConnect(odbc(),
                   Driver = "ODBC Driver 17 for SQL Server",
                   Server = "finalproject430.database.windows.net",
                   Database = "430finalproject",
                   UID = "finalproject430",
                   PWD = "Password430",
                   Port = 3306)
  dbGetQuery(con, 'Select * from ConservationStatus')
}

#* Returns countries that satisfy condition
#* @get /getODBCDrivers
function() {
  odbc::odbcListDrivers()
}