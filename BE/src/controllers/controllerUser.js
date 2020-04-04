const connection = require('../models/connection.js')

module.exports={
    async create(req, res){
        try{
        const {name,email, password} = req.body;

        const select = await connection('users')
        .select('email')
        .where('email', email)
        
        if(select.length > 0){
            return res.json({err: 'This email is already being used!'})
        }
        else{
            const [id] = await connection('users').insert({
                name,
                email,
                password
            })
            return res.json({id,name})
    }
    }
        catch(err){
            console.log(err)
        }
    },
    async login(req, res){
    try{
        const {email, password} = req.body;

        const response = await connection('users')
        .where({
            email: email,
            password: password
        })
        .select('userId','name')
        .first()
        console.log(response)
        return res.json({response})
    }
    catch(err){
        console.log(err)
    }
    },
    async list(req, res){
        try{
            const response = await connection('users').select('*')

            return res.json({response})
        }catch(err){
            console.log(err)
        }
    }

}