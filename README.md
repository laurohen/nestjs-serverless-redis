# nestjs-serverless-redis
Task manager using serverless + nestjs + redis



### How to run whole project?

  Step 1
  
#### with npm
```sh
npm install 
```

  Step 2
  
#### with npm
```sh
npm run serverless
```

#### Testing?

- I got my aggregator api running on `localhost:3000`.

---

- Use via Swagger:
```sh
http://localhost:3000/dev/api//
```
- Use via Postman:
```sh
POST - http://localhost:3000/dev/task
```
`priority (0 = Low, 1 = Medium, 2 = High)`

```
{
  "name": "string",
  "dateExecution": "2022-03-07T11:24:52.912Z",
  "situation": true,
  "priority": 0,
  "dateCompletion": "2022-03-07T11:24:52.912Z"
}
```

```sh
GET - http://localhost:3000/dev/task
```

```sh
GET - http://localhost:3000/dev/task/{id}
```

```sh
PATCH - http://localhost:3000/dev/task/{id}
```

 `priority (0 = Low, 1 = Medium, 2 = High)`

```
{
  "name": "string",
  "dateExecution": "2022-03-07T11:24:52.912Z",
  "situation": true,
  "priority": 0,
  "dateCompletion": "2022-03-07T11:24:52.912Z"
}
```

```sh
DELETE - http://localhost:3000/dev/task/{id}
```


