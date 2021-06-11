Drop table if exists Species;
Drop table if exists ConservationStatus;
drop table if exists Parks;

Create table Parks(
    Acres int,
    Latitude float,
    Longitude float,
    [Park Code] VARCHAR(4) primary key,
    [Park Name] varchar(128) unique,
    State varchar(max)
)

Create table Species(
    [Species ID] varchar(9),
    [Park Name] varchar(128) references Parks([Park Name]),
    Category varchar(max),
    [Order] varchar(max),
    Family varchar(max),
    [Scientific Name] varchar(max),
    [Common Name] varchar(max),
    [Record Status] varchar(max),
    Occurrence varchar(max),
    Nativeness varchar(max),
    Abudance varchar(max),
    Seasonality varchar(max)
)

Create table ConservationStatus (
    [Scientific name] varchar(128),
    [Conservation Status] varchar(max)
)

Select * from ConservationStatus;
Select Distinct Category from Species;

Select Top 50 * from Species Where 1=1 AND category != 'Nonvascular Plant'
