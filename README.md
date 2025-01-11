# Sandbox for testing Apollo Sqlite
A sandbox to test GraphQL(Apollo) with SQLite DB drivers. Data ORM and setup is using Prisma. Database dummy data is generated from Mockaroo.

## Features
- query users (support: limit, offset, and optional search)
- add user

## Test
### Query User
```
query {
  users(limit: 5, offset: 10, search: "") {
    id
    name
    email
  }
}
```
### Add User
```
mutation {
  createUser(name: "alice", email: "alice@example.com") {
    id
    name
    email
  }
}

```