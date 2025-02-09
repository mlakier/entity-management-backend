# Code Citations

## License: unknown
https://github.com/emmabaye/events-manager/tree/8e94113dfe1864e68ea6d1c0b0ed90f860b23784/server/migrations/20171119184000-create-user.js

```
: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          email: {
              type: Sequelize.STRING,
              unique: true,
              allowNull: false,
          },
          password: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          role: {
              type: Sequelize.
```


## License: MIT
https://github.com/rebirthtobi/nodejs-starterkit/tree/868d6dc86b2e2153587e1d0a2178cb625f4b29c3/src/migrations/20190427134646-user.js

```
: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          last_name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          email: {
              type: Sequelize.STRING,
              unique: true,
              allowNull: false,
          },
          password: {
              type: Sequelize.
```


## License: unknown
https://github.com/alma996/libraryProject/tree/bf9385cb5afecd69ca960b2402f24a18b644cb05/migrations/20200117124352-user.js

```
Users', {
          user_id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false,
          },
          first_name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          last_name: {
              type: Sequelize.STRING,
              allowNull: false,
```


## License: unknown
https://github.com/kleizson/findmovie-api/tree/cc5148db233e9d2f2a6792db5830f65538cc6021/src/models/user.js

```
,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false,
          },
          first_name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          last_name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          email: {
              type: Sequelize.STRING,
              unique
```


## License: unknown
https://github.com/mohammedabboudi/car-rental/tree/2033b2ba3d834eebfa4d7879961494138088ead3/api/migrations/20230312225035-create_users_table.js

```
(queryInterface, Sequelize) => {
      await queryInterface.createTable('Users', {
          user_id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false,
          },
          first_name: {
              type: Sequelize.STRING,
              allowNull: false,
          }
```

