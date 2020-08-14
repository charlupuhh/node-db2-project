
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments('id')
      tbl.string('VIN', 17).notNull().unique();
      tbl.string('Make', 256).notNull();
      tbl.string('Model', 256).notNull();
      tbl.integer('Milage', 256).notNull();
      tbl.string('Transmission', 256);
      tbl.string('Title', 256);
      tbl.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
