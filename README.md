# Node DB3 Guided Project

Guided project for **Node DB3** Module.

- [Node DB3 Guided Project](#node-db3-guided-project)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [SQL EXAMPLES](#sql-examples)
    - [Left Join](#left-join)
    - [Grouping & Aggregating](#grouping--aggregating)

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

```sql
INSERT INTO shippers (shppername) VALUES ('UPS')
```

```sql
select
	orderid, customerid, employeeid, orderdate, shippername
from orders
join shippers
	on orders.shipperid = shippers.shipperid;
```
```sql
select
	orderid, customerid, employeeid, orderdate, shippername
from orders as o
join shippers as s
	on o.shipperid = s.shipperid;
```

```sql
select
	orderid, customerid, (firstname || ' ' || lastname) as employee, orderdate, shipperid
from orders as o
join employees as e
	on e.employeeid = o.employeeid;
```

```sql
select
	orderid, customerid, (e.firstname || ' ' || e.lastname) as employee, orderdate, shippername
from orders as o
join employees as e      on e.employeeid = o.employeeid
join shippers as s       on s.shipperid = o.shipperid;
```

### Left Join
Find a single employee that didnt sell anythying
```sql
select
	o.orderid, lastname, firstname
from employees as e
left join orders as o
	on e.employeeid = o.employeeid
where o.orderid is null;
```
### Grouping & Aggregating
```sql
select
	categoryname, count(productid) as prod_count
from products as p
join categories as c
	on p.categoryid = c.categoryid
group by c.categoryid order by prod_count desc;
```

```sql
SELECT
select 
  shippername as Shipper,
  count(o.OrderID) as Number_Of_Shipments
from shippers as s
left join orders as o on s.shipperid = o.shipperid
group by s.shipperid order by Number_Of_Shipments desc;
```
```sql
select
	o.orderid, c.customerName, (e.firstname || ' ' || e.lastname) as employee, o.orderdate, s.shippername
from orders as o
join customers as c
	on c.customerid = o.customerid
left join employees as e
	on e.employeeid = o.employeeid
left join shippers as s
	on o.shipperid = s.shipperid;
```