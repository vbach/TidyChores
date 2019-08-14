---
name: 'Milestone: Back-end I'
about: Focus on building out models and route structure
title: 'Milestone: Back-end I'
labels: ''
assignees: ''

---

---

name: "Milestone: Back-end I"
about: Focus on building out models and route structure
title: "Milestone: Back-end II"
labels: milestone

---

During this milestone, I will be working on creating my migrations, models, seed data, validation, and CRUD.

###  Models:

1. Parent
  - id (uuid, uuidV4)
  - name (string, notNull, minLength: 4)
  - username (string, notNull, minLength: 4)
  - password (string, notNull, minLength: 8)
  - access_token (string, notNull, minLength: 12)
2. Child
  - id (uuid, uuidV4)
  - name (string, notNull, minLength: 4)
  - pointTotal (int, minLength: 1)
  - parentId (uuid, uuidV4)
3. Chore
  - id (uuid, uuidV4)
  - name (string, notNull, minLength: 4)
  - type (enum['complete', 'incomplete'], notNull)
  - pointValue (int, minLength: 0)
  - childId (uuid, uuidV4)
4. Rewards
  - id (uuid, uuidV4)
  - name (string, notNull, minLength: 4)
  - pointTotal (int, minLength: 1)

### Routes:
### Parent
/api/parent/:id
- Retrieve all children for parent.
  - GET /
    - **Request Body**: id
    - **Response Data**: array of children [{name: ' '}]

### Child
/api/child
- Retrive child and chores for child.
  - GET /:id
    - **Request Body**: id
    - **Response Data**: name, pointValue, chores
- Add a new child.
  - POST /
    - **Request Body**: name
    - **Response Data**: id
- Update a child.
  - PUT /:id
    - **Request Body**: id
    - **Response Data**: name
- Delete a child.
  - DELETE /:id
    - **Request Body**: id
    - **Response Data**: N/A
    
### Chores
/api/chores
- Retrieve a single chore.
  - GET /:id
    - **Request Body**: name, type, pointValue
    - **Response Body**: id
- Create a new chore.
  - POST /
    - **Request Body**: name, type, pointValue
    - **Response Body**: id
- Update a chore
  - PUT /:id
    - **Request Body**: id
    - **Response Body**: name, type, pointValue
- Delete a Chore
  - DELETE /:id
    - **Request Body**: id
    - **Response Body**: N/A

### Rewards
/api/rewards
- Retrieve all rewards.
  - GET /
    - **Request Body**: N/A
    - **Response Body**: name, pointTotal
- Create a new reward.
  - POST /:id
    - **Request Body**: name, pointTotal
    - **Response Body**: id
- Update a reward
  - PUT /:id
    - **Request Body**: id
    - **Response Body**: name, pointTotal
- Delete a reward
  - DELETE /:id
    - **Request Body**: id
    - **Response Body**: N/A
    
### Auth
/api/auth
- Get access token
  - POST /exchange
    - **Request Body**: access_token
    - **Response Body**: N/A
- Create a username and password.
  - POST /signup
    - **Request Body**: name, username, password
    - **Response Body**: id
- Login with a username and password
  - POST /login
    - **Request Body**: username, password
    - **Response Body**: access_token

### Things I might struggle with...
I'm working on further learning with routing and express. I feel comfortable enough with routing that I will be successful however I want to avoid confusion and any issues with not including the appropriate routes for the type of app that I am creating.
