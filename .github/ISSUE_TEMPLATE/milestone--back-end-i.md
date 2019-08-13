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

/api/parent
- Retrieve all children for parent.
  - GET /
    - **Request Body**: N/A
    - **Response Data**: array of children [{name: ''}]
    
/api/child/:id
- Retrive child and chores for child.
  - GET /
    - **Request Body**: id
    - **Response Data**: name, chores
    
/api/child
- Add a new child.
  - POST /
    - **Request Body**: id
    - **Response Data**: N/A

/api/child/:id
- Update a child.
  - PUT /
    - **Request Body**: id
    - **Response Data**: name
    
/api/child/:id
- Delete a child.
  - DELETE /
    - **Request Body**: id
    - **Response Data**: N/A
   
/api/chores/:id
- Retrieve a single chore.
  - GET /
    - **Request Body**: id
    - **Response Data**: name, type, pointValue
    
/api/chores
- Create a new chore.
  - POST /
    - **Request Body**: N/A
    - **Response Body**: name, type, pointValue

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
