// importing necessary dependencies
const express = require('express')
const mysql =require('mysql2')
const dotenv =require('dotenv')




const app = express()
dotenv.config()

// create a connecting object
const db =mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
// testing the connection
db.connect((err) =>{
    //connection not successful
    if (err){
        return console.log("Error connecting to MySQL",err)
    }
    //connection successful
    console.log("MySQL connection successful")


})
//question 1
//get patients
app.get('/get-patients',(req,res) =>{
const getPatients = "SELECT * FROM patients"

db.query(getPatients,(err,results) =>{

    //have an error
    if(err){
        return res.status(500).json("failed to fatcht the patients")
    }

    //get back the data/results

    res.status(200).send(results)
})
})

//question 2
//get providers
app.get('/get-providers',(req,res) =>{
    const getProviders = "SELECT * FROM providers"
    
    db.query(getProviders,(err,results) =>{
    
        //have an error
        if(err){
            return res.status(500).json("failed to fatcht the providers")
        }
    
        //get back the data/results
    
        res.status(200).send(results)
    })
    })


    //question 2
   //get patients
    app.get('/get-providers',(req,res) =>{
    const getProviders = "SELECT * FROM providers"
    
    db.query(getProviders,(err,results) =>{
    
        //have an error
        if(err){
            return res.status(500).json("failed to fatcht the providers")
        }
    
        //get back the data/results
    
        res.status(200).send(results)
    })
    })

    //Question 3
    app.get('/patients',  (req, res) => {
        const firstName = req.query.firstName;
    
        if (!firstName) {
            return res.status(400).json({ error: 'First name is required' });
        }
    
        try {
            const patients = db.getPatientsByFirstName(firstName);
    
            if (patients.length === 0) {
                return res.status(404).json({ error: 'No patients found with that first name' });
            }
    
            res.json(patients);
        } catch (error) {
            console.error('Error retrieving patients:', error);
            res.status(500).json({ error: 'Failed to retrieve patients'   
     });
        }
    });
    //question 4
    app.get('/providers', async (req, res) => {
        const { surgery } = req.query;
    
        if (!surgery) {
            return res.status(400).json({ error: 'wacha ujinga  wewe' });
        }
    
        else {
            const getProviders = "SELECT * FROM providers WHERE provider_specialty=Surgery";

            const [rows] = db.query(getProviders, [specialty]);
    
         if  (rows.length === 0) {
                return res.status(404).json({ error: 'No providers found for that specialty' });
            }
   }
    });
    
//declare the port and listen to the server

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})

