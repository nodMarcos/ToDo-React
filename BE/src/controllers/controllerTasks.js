const connection = require('../models/connection.js')

module.exports = {
    async create(req, res){
        try{
            const {title, description, userId } = req.body;

            const [taskId] = await connection('tasks').insert({
                title,
                description,
                status: false,
                userId
            })
            return res.json({taskId})
        }
        catch(err){
            console.log(err)
        }
    },
    async list(req,res){
        try{
            const {id} = req.params;
            
            const tasks = await connection('tasks')
            .select('title','description','status','taskId')
            .where('userId', id)
            
            return res.json({tasks})

        }
        catch(err){
            console.log(err)
        }
    },
    async update(req,res){
        try{
        const {taskId, userId, status} = req.body

        if(status == 0){
            const response = await connection('tasks').select('status')
            .where({
                userId,
                taskId
            })
            .update({status:1})


            return res.json({response})
        }
        else{
            const response = await connection('tasks').select('status')
            .where({
                userId,
                taskId
            })
            .update({status:0})

            return res.json({response})

        }
            
    }
    catch(err){
        console.log(err)
    }

    },
    async delete(req, res){
        try{
            const {taskId, userId} = req.params
            console.log(taskId, userId)

            const select = await connection('tasks')
            .select('taskId','userId')
            .where({
                userId:userId,
                taskId:taskId
            })

            console.log(select[0].taskId)
            if( userId != select[0].userId || taskId != select[0].taskId ){
                return res.status(401).json({err:'Operation not permitted!'})
            }
                const response = await connection('tasks').select('taskId').where({taskId: select[0].taskId}).delete()

                console.log(response)
                return res.status(204).send('Task excluded successfully')
        }
        catch(err){
            console.log(err)
        }
    }

}