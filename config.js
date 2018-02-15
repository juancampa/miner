const { imports, schema, dependencies } = program;

program.description = 'Keep track of miner';

imports
  .add('nanopool')
  .add('human')

dependencies
  .add('account', 'nanopool:Account')
  .add('human', 'human:Root')

schema.type('Root')
  .field('account', 'nanopool:Account*')
