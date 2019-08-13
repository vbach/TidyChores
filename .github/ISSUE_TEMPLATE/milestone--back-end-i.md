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
[add list of all models and their properties with data types and validation (minimum of 6)]

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
  

Example:
1. Quiz
  - id (uuid, uuidV1)
  - name (string, notNull, minLength: 5)
  - type (enum['private', 'public'], notNull, in: ['private', 'public'])

### Routes:
[add list of all routes in your api, with data that will be sent and received]

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
