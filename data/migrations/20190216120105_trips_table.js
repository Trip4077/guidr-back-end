
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trips', tbl=>{
      tbl.increments();
      tbl.string('username').notNullable();
      tbl.string('title').notNullable();
      tbl.string('description').notNullable();
      tbl.string('type').notNullable();
      tbl.boolean('private').defaultTo(false)
      tbl.string('duration').notNullable();
      tbl.string('date');
      tbl.string('image');
      // for stretch
      tbl.float('longitude').defaultTo(null);
      tbl.float('latitude').defaultTo(null);

})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('trips')
};
