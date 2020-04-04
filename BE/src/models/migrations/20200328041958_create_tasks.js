
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table)=>{
        table.increments('taskId').primary()
        table.string('title').notNullable()
        table.string('description')
        table.boolean('status')
        table.integer('userId').notNullable()
        table.foreign('userId').references('userId').inTable('users')

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks')
  
};
