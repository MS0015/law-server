import express from "express";
import { Low, JSONFile } from "lowdb";

const app = express();
//Express json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const adapter = new JSONFile("db.json");
const db = new Low(adapter);
await db.read();
if (db.data) {
  db.data = {
    posts: [
      {
        id: "22222222",
        fh: "222222222",
      },
    ],
  };
}

const { posts } = db.data;

app.get("/posts/:id", async (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  res.send(post);
});

app.post("/posts", async (req, res, next) => {
  const post = posts.push(req.body);
  await db.write();
  res.sendStatus(200).send(post);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
