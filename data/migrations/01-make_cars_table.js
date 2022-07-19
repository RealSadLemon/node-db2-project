exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', table => {
    table.increments();
    table.varchar('vin').notNullable().unique();
    table.varchar('make').notNullable();
    table.varchar('model').notNullable();
    table.decimal('mileage').notNullable();
    table.varchar('title');
    table.varchar('transmission');
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars');
};
