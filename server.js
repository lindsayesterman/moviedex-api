const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const MOVIEDEX = require('./moviedex.json')


console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }  
    next()
})

function handleGetMovies(req, res) {
    let response = MOVIEDEX
    
    if (req.query.genre){
        response = response.filter(response => 
            response.genre.toLowerCase().includes(req.query.genre.toLowerCase())
            )
        }
        
        if (req.query.country){
            response = response.filter(response => 
                response.country.toLowerCase().includes(req.query.country.toLowerCase())
                )
            }
            
            if (req.query.avg_vote){
                response = response.filter(response => 
                    response.avg_vote >= req.query.avg_vote
                    )
                }
                
                res.json(response)
            }
            
            app.get('/movie', handleGetMovies)
            
            const PORT = 8000
            
            app.listen(PORT, () => {
                console.log(`Server listening at http://localhost:${PORT}`)
            })