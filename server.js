const http = require('http');
const os = require('os');
const express = require("express");
const res = require("express/lib/response");
const app = express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}
//adding two number
const addTwoNumber = (num1,num2) => {
    return num1+num2;
}

const subTwoNumber = (num1,num2) => {
    return num1-num2;
}

const mulTwoNumber = (num1,num2) => {
    return num1*num2;
}

const divTwoNumber = (num1,num2) => {
    if(num2 == 0){
        logger.error("Division by zero is not possible");
        throw new Error("Division by zero is not possible")
    }
    return num1/num2;
}

const expTwoNumber = (num1,num2) => {
    return Math.pow(num1,num2);
}

const sqTwoNumber = (num1) => {
    return Math.sqrt(num1);
}

const modTwoNumber = (num1,num2) => {
    return num1 % num2;
}

const numberParse = (req)  => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1)) {
        logger.error("num1 is incorrectly defined");
        throw new Error("num1 incorrectly defined");
    }

    if (req.originalUrl.includes("sqTwoNumber")) {
        if (!isNaN(num2)) {
            logger.error("only num1 should be given for square root operation");
            throw new Error("only num1 should be given for square root operation");
        }
        return {num1};
    } else {
        if (isNaN(num2)) {
            logger.error("num2 is incorrectly defined");
            throw new Error("num2 incorrectly defined");
        }
        return {num1,num2};
    }
};

//addTwoNumber endpoint
app.get("/addTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req);
        logger.log({
            level: 'info',
            message: 'New addition operation requested : '+num1+ '+' +num2+ '.', 
        })
        const result = addTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        logger.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    } 
});

//subTwoNumber endpoint
app.get("/subTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req, res);
        logger.log({
            level: 'info',
            message: 'New subtraction operation requested : '+num1+ '-' +num2+ '.', 
        })
        const result = subTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        logger.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }  
});

//mulTwoNumber endpoint
app.get("/mulTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req, res);
        logger.log({
            level: 'info',
            message: 'New multiplication operation requested : '+num1+ '*' +num2+ '.', 
        })
        const result = mulTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        logger.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }   
});

//divTwoNumber endpoint
app.get("/divTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req, res);
        logger.log({
            level: 'info',
            message: 'New division operation requested : '+num1+ '/' +num2+ '.', 
        })
        const result = divTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        logger.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }   
});

//expTwoNumber endpoint
app.get("/expTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req, res);
        logger.log({
            level: 'info',
            message: 'New exponentiation operation requested : '+num1+ '^' +num2+ '.', 
        })
        const result = expTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        logger.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }   
});

//sqTwoNumber endpoint
app.get("/sqTwoNumber", (req,res)=>{
    try{
        const {num1} = numberParse(req, res);
        logger.log({
            level: 'info',
            message: 'New square root operation requested : '+num1+'.', 
        })
        const result = sqTwoNumber(num1);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        logger.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }   
});

//modTwoNumber endpoint
app.get("/modTwoNumber", (req,res)=>{
    try{
        const {num1, num2} = numberParse(req, res);
        logger.log({
            level: 'info',
            message: 'New modulo operation requested : '+num1+ '%' +num2+ '.', 
        })
        const result = modTwoNumber(num1,num2);
        res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        logger.error(error)
        res.status(400).json({statuscode:400, msg: error.toString() })
    }   
});

app.get('/crash', (req, res)=>{
    console.log('Crashing application!!!')
    process.exit(1);
});

app.use(express.static('public'));

//listening port message

const port=3080;
app.listen(port,()=> {
    console.log("hello i'm listening to port "+port);
    console.log('Server starting on host '+os.hostname()+' port '+port+'...');
})
