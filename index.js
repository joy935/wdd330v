import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
 
const app = express();
app.use(cors());
app.use(bodyParser.json());

// temporary storage for registered users
const users = [];

// routes
app.get('/', (req, res) => {
    res.send("Server is running");
});
// register route
app.post('/register', (req, res) => {
    const { fname, lname, email, password } = req.body;

    // validation
    // make it more specific later
    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
    }

    // save the new user
    const newUser = { fname, lname, email, password }; 
    // hash the password before storing ??
    users.push(newUser);

    res.status(201).json({ message: "User successfully registered" });
});

// login route
// create later


// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});