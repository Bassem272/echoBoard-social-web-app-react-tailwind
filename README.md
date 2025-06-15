Here’s a Markdown block you can include in your README.md file:

markdown
نسخ
تحرير
## 📦 Running JSON Server (Mock Backend)

This project uses [json-server](https://github.com/typicode/json-server) to mock backend API calls.

### 🛠 Installation

Install `json-server` globally:
```bash
npm install -g json-server
Or as a dev dependency:

bash
نسخ
تحرير
npm install --save-dev json-server
🗃 Database
The mock data lives in the db.json file at the root of the project.

Sample db.json:

json
نسخ
تحرير
{
  "posts": [
    { "id": 1, "title": "Hello World", "author": "Bassem" }
  ],
  "users": [
    { "id": 1, "name": "Sara" }
  ]
}
▶️ Run JSON Server
Start the server with:

bash
نسخ
تحرير
json-server --watch db.json --port 3001
The API will be available at: http://localhost:3001

🔗 API Endpoints Examples
GET /posts

GET /posts/1

POST /posts

PUT /posts/1

DELETE /posts/1