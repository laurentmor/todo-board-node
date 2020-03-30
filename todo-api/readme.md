Install packages

```
npm install
```

Start server

```
node index
```


Routes:

POST /register : Register a user <br>
```json
{
	"name": "joe",
	"email": "joe@example.io",
	"username": "joe123",
	"password": "mypass123",
	"password2": "mypass123"
}
```

POST /login <br>
```json
{
	"username": "joe123",
	"password": "mypass123"
}
```

GET /logout <br>
GET /user <br>

GET /auth/facebook
