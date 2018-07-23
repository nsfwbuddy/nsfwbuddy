const tableName = 'links';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, table => {
    table.increments();
    table.string('sourceURL');
    table.string('shortURL')  ;
    table.integer('options');
    table.timestamp('expireAt');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};
