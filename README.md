# Node DB3 Guided Project

Guided project for **Node DB3** Module.

- [Node DB3 Guided Project](#node-db3-guided-project)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [SQL EXAMPLES](#sql-examples)
    - [USERS left joined to posts](#users-left-joined-to-posts)
    - [Users left Joined to posts WITH FILTER](#users-left-joined-to-posts-with-filter)
    - [POSTS left joined to users](#posts-left-joined-to-users)
    - [using alias](#using-alias)
    - [Swap SupplierID & CategoryID with SupplierName & CategoryName... becuase names are easier to read than numbers AND GROUP by a category](#swap-supplierid--categoryid-with-suppliername--categoryname-becuase-names-are-easier-to-read-than-numbers-and-group-by-a-category)
    - [Count the number of products per categoryName](#count-the-number-of-products-per-categoryname)
    - [Count number of products per SupplierName](#count-number-of-products-per-suppliername)

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

### Users left Joined to posts WITH FILTER
```sql
SELECT 
    p.id as post_id,
    p.contents,
    u.username as user,
    u.id as user_id
from users as u
LEFT join posts as p on u.id = p.user_id
WHERE u.id = 4;
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

### using alias
```sql
SELECT 
    p.id as post_id,
    p.contents,
    u.username as user
from posts as p
LEFT join users as u on u.id = p.user_id;
```

### Swap SupplierID & CategoryID with SupplierName & CategoryName... becuase names are easier to read than numbers AND GROUP by a category
```sql
SELECT 
	p.productID, p.productName, s.supplierName, categoryID, p.unit, p.price
FROM [Products] as p
JOIN suppliers as s on p.supplierID = s.supplierID
JOIN categories as c on p.CategoryID = c.CategoryID
```

### Count the number of products per categoryName
```sql
SELECT 
	c.CategoryName, count(p.productName) as ProductCount
FROM [Products] as p
JOIN suppliers as s on p.supplierID = s.supplierID
JOIN categories as c on p.CategoryID = c.CategoryID
group by c.CategoryName
order by productCount desc;
```
### Count number of products per SupplierName

```sql
SELECT 
	s.SupplierName, count(p.productName) as ProductCount
FROM [Products] as p
JOIN suppliers as s on p.supplierID = s.supplierID
JOIN categories as c on p.CategoryID = c.CategoryID
group by s.SupplierName
order by productCount desc;
```