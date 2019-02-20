
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl=>{
      tbl.increments();
      tbl.string('name').notNullable();
      tbl.string('username').notNullable().unique();
      tbl.string('password').notNullable();
      tbl.string('profileImage');
      tbl.integer('age');
      tbl.string('title');
      tbl.string('tagline');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
