Create table Parks(
    [Park Code] VARCHAR(4),
    [Park Name] varchar(max),
    State varchar(max),
    Acres int,
    Latitude float,
    Longitude float
)

Create table Species(
    [Species ID] varchar(9),
    [Park Name] varchar(max),
    Category varchar(max),
    [Order] varchar(max),
    Family varchar(max),
    [Scientific Name] varchar(max),
    [Common Name] varchar(max),
    [Record Status] varchar(max),
    Occurrence varchar(max),
    Nativeness varchar(max),
    Abudance varchar(max),
    Seasonality varchar(max),
    [Conservation Status] varchar(max)
)