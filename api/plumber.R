library(plumber)
library(dplyr)
library(ggplot2)
library(gapminder)
library(odbc)

#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

 do_deploy_api(
   'ExampleName2',
   'sqlServerAPI/',
   'C:/info430/430FinalProject/api',
   8001,
   overwrite = TRUE
 )

#* @apiTitle Gapminder API
#* @apiDescription API for exploring Gapminder dataset

#* Returns all park data
#* @get /all_parks
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