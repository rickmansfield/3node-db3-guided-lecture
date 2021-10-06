# Node DB3 Guided Project

Guided project for **Node DB3** Module.

- [Node DB3 Guided Project](#node-db3-guided-project)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [SQL EXAMPLES](#sql-examples)
    - [USERS left joined to posts](#users-left-joined-to-posts)
    - [POSTS left joined to users](#posts-left-joined-to-users)

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.
- [This Query Tool Loaded in the browser](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top).
- a rest client like [Insomnia](https://insomnia.rest/download/) or [Postman](https://www.getpostman.com/downloads/) installed.

## Project Setup

- [ ] clone this repository.
- [ ] cd into the project folder.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor creates database access methods for a multi table schema.

## SQL EXAMPLES



### USERS left joined to posts
```sql
SELECT 
    posts.id as post_id,
    posts.contents,
    users.username as user
FROM users
LEFT JOIN posts ON users.id = posts.user_id;
```

### POSTS left joined to users
```sql
SELECT 
    posts.id as post_id,
    posts.contents,
    users.username as user
FROM posts
LEFT JOIN users ON users.id = posts.user_id;
```


```sql

```


```sql

```