// user-model
const db = require('../../data/db-config')

module.exports = {
  async getPostsBy(user_id) {
    const result = await db('posts as p')
      .join('users as u', 'p.user_id', '=', 'u.id') // the '=' is optional
      .select('p.id as post_id', 'contents', 'username')
      .where('u.id', user_id) // CAREFUL WITH AMBIGUOUS COLUMN NAMES

    return result
  },

  async getUserBy(id) {
    // STEP 1 - BUILD IT IN RAW SQL
    // STEP 2 - USE KNEX DOCS TO BUILD IT IN KNEX
    const rows = await db('users as u')
      .leftJoin('posts as p', 'p.user_id', '=', 'u.id') // the '=' is optional
      .select('p.id as post_id', 'contents', 'username', 'u.id as user_id')
      .where('u.id', id) // CAREFUL WITH AMBIGUOUS COLUMN NAMES

    // STEP 3 - HAMMER THE ROWS INTO THE DESIRED SHAPE
    const result = { // this will not work for hypatia
      user_id: rows[0].user_id,
      username: rows[0].username,
      posts: rows.map(r => ({
        contents: r.contents,
        post_id: r.post_id,
      })),
    }

    return result
  }
}
