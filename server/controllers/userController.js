const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel');

//===== Register /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Veuillez remplir tous les champs!')
    }

    // Validate name
    if (name.length < 2) {
        res.status(400);
        throw new Error('Le nom doit comporter au moins 2 caractères');
    }

    // Check if User exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('Cette adresse e-mail est déjà enregistrée.')
    }

    // Nombre de caractères de Password
    if (password.length < 6) {
        res.status(400);
        throw new Error('Le mot de passe doit comporter au moins 6 caractères');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user
    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

//===== Authenticate /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate email
    if (!email) {
        res.status(400);
        throw new Error('Veuillez remplir tous les champs et entrez une adresse mail valide');
    }

    // Validate password
    if (!password || password.length < 6) {
        res.status(400);
        throw new Error('Veuillez remplir tous les champs et le mot de passe doit comporter au moins 6 caractères');
    }

    const user = await UserModel.findOne({ email });


    if (!user) {
        res.status(400)
        throw new Error('Invalid email')
    }

    if (!await bcrypt.compare(password, user.password)) {
        res.status(400)
        throw new Error('Invalid password')
    }

    res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })

    // if (user && (await bcrypt.compare(password, user.password))) {
    //     res.json({
    //         _id: user.id,
    //         name: user.name,
    //         email: user.email,
    //         token: generateToken(user._id)
    //     })
    // } else {
    //     res.status(400)
    //     throw new Error('Invalid credentials')
    // }
});

//===== Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser
}