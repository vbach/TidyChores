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
  - parentId
3. Chore
  - id (uuid, uuidV4)
  - name (string, notNull, minLength: 4)
  - type (enum['complete', 'incomplete'], notNull)
  - pointValue (int, minLength: 0)
  - childId
4. Rewards
  - id (uuid, uuidV4)
  - name (string, notNull, minLength: 4)
  - pointTotal (int, minLength: 1)

### Routes:
[add list of all routes in your api, with data that will be sent and received]

#### Parent
/api/parent/:id
- Retrieve all children for parent.
  - GET /
    - **Request Body**: N/A
    - **Response Data**: array of children [{name: ' '}]

#### Child
/api/child/:id
- Retrive child and chores for child.
  - GET /
    - **Request Body**: id
    - **Response Data**: name, pointValue, chores
- Add a new child.
  - POST /
    - **Request Body**: name
    - **Response Data**: id
- Update a child.
  - PUT /
    - **Request Body**: id
    - **Response Data**: name
- Delete a child.
  - DELETE /
    - **Request Body**: id
    - **Response Data**: N/A

#### Chores
/api/chores/:id
- Retrieve a single chore.
  - GET /
    - **Request Body**: name, type, pointValue
    - **Response Body**: id
- Create a new chore.
  - POST /
    - **Request Body**: name, type, pointValue
    - **Response Body**: id
- Update a chore
  - PUT /
    - **Request Body**: name, type, pointValue
    - **Response Body**: name, type, pointValue
- Delete a Chore
  - DELETE /
    - **Request Body**: id
    - **Response Body**: N/A
    
#### Rewards
/api/rewards/:id
- Retrieve a single reward.
  - GET /
    - **Request Body**: id
    - **Response Body**: name, pointTotal
- Create a new reward.
  - POST /
    - **Request Body**: name, pointTotal
    - **Response Body**: id
- Update a reward
  - PUT /
    - **Request Body**: id
    - **Response Body**: name, pointTotal
- Delete a reward
  - DELETE /
    - **Request Body**: id
    - **Response Body**: N/A

Example:
- /api/quizzes
  - GET /
    - **Request Body**: N/A
    - **Response Data**: array of quizzes [{name: '', type: 'private|public'}]
  - POST /quiz
    - **Request Body**: name, type
    - **Response Data**: id

### Things I might struggle with...
[list anything you can think of that you might want to work on before this week to prepare]
