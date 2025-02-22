const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Hardcoded user details
const user_id = "john_doe_17091999"; // Replace with your fullname_ddmmyyyy
const email = "john@xyz.com"; // Replace with your college email
const roll_number = "ABCD123"; // Replace with your college roll number

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input format" });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /[a-zA-Z]/.test(item));

        // Find the highest alphabet (case-insensitive)
        let highest_alphabet = [];
        if (alphabets.length > 0) {
            highest_alphabet = [alphabets.reduce((a, b) => 
                a.toLowerCase() > b.toLowerCase() ? a : b
            )];
        }

        // Response
        res.status(200).json({
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error" });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
