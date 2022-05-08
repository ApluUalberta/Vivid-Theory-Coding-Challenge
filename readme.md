
# Smart Homes Data Visualization

# Introduction

The purpose of this assignment is to evaluate your full stack application development skills. Principles and best practices of front end design, responsive components, DRY, client server model, git-flow, user experience, and page performance will all be tested.

In a project such as this we want you to focus on the things that matter. Code structure, architecture, design patterns, and overall approach is more important than having a great custom webpack configuration. Focus on the main platform features.

Please spend time creating a simple and elegant solution rather than fighting with a framework or library!

## Timeline

The suggested time to complete this challenge is ~8 hours. Upon receiving the challenge you will have three days to make a final submission.

## Problem Definition

Vivid Theory is in need of a simple dashboard for visualizing electrical consumption for a group of homes.

## Data

We have a dataset that includes information collected from multiple smart home electricity monitoring devices. Data is sampled at one minute intervals and contains the following factors:

| Factor           | Units  |                   Explanation |
| ---------------- | :----: | ----------------------------: |
| Serial_Number    | string |                 Unique device |
| DateTime         |  date  |             Date of recording |
| Device_ID        | string |           Instrumented device |
| Device_Name      | string |     User assigned device name |
| User_Device_Name | string |          Detected device type |
| Device_Type      | string | User assigned device category |
| Device_Make      | string |             Manufacturer name |
| Device_Model     | string |       Manufacturer model name |
| Device_Location  | string |          Location within home |
| Wattage          | number |       Sampled wattage reading |

**note**
This is a real dataset. It may contain missing or invalid entries.

### Factor Explanation

- Device_ID
  - main: Main electrical panel within home
  - always_on: Wattage attributed to consistent electrical consumption within the home

Factors of importance are Serial_Number, Device_ID, and wattage. Serial_Number represents a unique device placed within a household. Wattage is monitored at the Device_ID level within the home.

Data can be accessed in the `readings` table at:

`host=smarthomes.postgres.database.azure.com port=5432 dbname=wattage user=smarthomesdashboarduser@smarthomes password=b5zT;q_fS\aAUtpD sslmode=require`

## Business Requirements

Implement a responsive line chart that depicts electrical consumption within the home. Your UI should have the following components

- Line chart

  - Horizontal axis shows the time
  - Vertical axis shows wattage

- Combo box or drop down for Serial_Number

  - The user should be able to either view all data aggregated or filter by specific Serial_Number

- Combo box or drop down for Device_ID
  - As a secondary filter the user should be able to view data or filter to a specific Device_ID
  - Ensure that this filter works appropriately with the Serial_Number filter

## Technical Requirements

Construct a client server application that fulfils the business requirements. Both the client and server should be written in typescript.

### Stack

- Front End
  - [React](https://reactjs.org/)
    - [Create React App](https://github.com/facebook/create-react-app)
  - [Material UI](https://material-ui.com/)
- Back End
  - Framework
    - [Nest.js](https://nestjs.com/)
    - [GraphQL](https://graphql.org/)
  - ORM
    - [sequelize](https://sequelize.org/)
    - or [TypeORM](https://typeorm.io/#/)
    - or no ORM
- Database
  - [PostgreSQL](https://www.postgresql.org/) Provided

#### Acceptable alternatives

- REST over GraphQL
- Express (or any other TS backend framework) over Nest.js
- Any charting library or framework

## Important Considerations

- Performance
  - You are not allowed to load all database rows into the browser at once. Your program should query and load data as needed.
- Patterns
  - Employ reusable/dry principles. Use OOP/Functional patterns as necessary.
- Deployment
  - Provide clear instructions on how to start your project in both a development and production setting

Feel free to make any reasonable assumptions about this assignment, innovate and add your personal
touches as you see fit. Please reach out if you have any questions!
