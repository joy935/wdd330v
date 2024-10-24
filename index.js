import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
 
const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [];
// path to json file
// const usersPath = "js/users.json";

// async function loadUsers() {
//     if (fs.existsSync(usersPath)) {
//         const data = await fs.readFileSync(usersPath, 'utf-8');
//         return JSON.parse(data);
//     }
//     return [];
// }

// function saveUsers() {
//     fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
// }

// routes
app.get("/", (req, res) => {
    res.send("Server is running");
});
// register route
app.post("/register", (req, res) => {
    const { fname, lname, email, password } = req.body;

    // validation
    // make it more specific later
    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // const existingUsers = loadUsers();

    // check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
    }

    // save the new user
    const newUser = { fname, lname, email, password }; 
    users.push(newUser);
    // existingUsers.push(newUser);
    // saveUsers();
    // hash the password before storing ??

    res.status(201).json({ message: "User successfully registered" });
});

// login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // const existingUsers = loadUsers();

    // check if the user exists
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
});


// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port http://localhost:${port}`);
});