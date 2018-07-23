const tableName = 'links';

exports.up = function(knex, Promise) {
  return knex.schema.alterTable(tableName, table => {
    // UPDATED
    table.string('sourceURL').notNull().alter();
    table.string('shortURL').notNull().alter();
    table.integer('options').default(0).alter();
    // Add
    table.timestamp('createdAt');
    table.unique('shortURL');
    table.index('expireAt');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable(tableName, table => {
    table.string('sourceURL').alter();
    table.string('shortURL').alter();
    table.integer('options').alter();
    table.dropColumns('createdAt');
  })
};
