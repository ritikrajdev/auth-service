module.exports = {
  'development': {
    'username': 'postgres',
    'password': '123456',
    'database': 'database_dev',
    'host': process.env.HOST ?? '127.0.0.1',
    'dialect': 'postgres',
  }
}; 
