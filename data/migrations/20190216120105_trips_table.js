
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trips', tbl=>{
      tbl.increments();
      tbl.integer('user_id').unsigned()
      tbl.foreign('user_id').references('id').on('users');
      tbl.string('title').notNullable();
      tbl.string('tag');
      tbl.boolean('private').defaultTo(false)
      tbl.float('duration').notNullable();
      tbl.string('date');
      tbl.string('image');

})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('trips')
};
