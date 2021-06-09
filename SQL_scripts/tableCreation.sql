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

Insert into Parks values (47390, 44.35, -68.21, 'ACAD', 'Acadia National Park', 'ME')

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

EXEC sp_rename 'dbo.Species_Processed', 'Species'; 
Delete from Species;
Delete from ConservationStatus;
Select count(*) from ConservationStatus;
Select count(*) from Species;
INSERT INTO Species VALUES ('ACAD-1000', 'Acadia National Park', 'Mammal', 'Artiodactyla', 'Cervidae', 'Alces alces', 'Moose', 'Approved', 'Present', 'Native', 'Rare', 'Resident', '', '');