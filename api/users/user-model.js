// user-model
const db = require('../../data/db-config')

module.exports = {

  async getUserBy(id) {
    // STEP 1 - BUILD IT IN RAW SQL
//     SELECT 
//     p.id as post_id,
//     p.contents,
//     u.username as user
// from users as u
// LEFT join posts as p on u.id = p.user_id
// WHERE u.id = 1;
    // STEP 2 - USE www.KNEX.js DOCS TO BUILD IT IN KNEX
    const rows = await db('users as u')
      .leftJoin('posts as p', 'p.user_id', '=', 'u.id') // the '=' is optional
      .select('p.id as post_id', 'contents', 'username', 'u.id as user_id')
      .where('u.id', id) // CAREFUL WITH AMBIGUOUS COLUMN NAMES

    // STEP 3 - HAMMER THE ROWS INTO THE DESIRED SHAPE THE BOSS WANTS
    console.log('rows--->', rows);
    const result = { 
      user_id: rows[0].user_id,
      username: rows[0].username,
      post: rows[0].post.id 
      ? rows.map(row => ({ 
        contents: row.contents,
        post_id: row.post_id,
      })) : []
    }
    
    console.log(result);
    return result
  },

  async getPostsBy(user_id) {
    const result = await db('posts as p')
      .join('users as u', 'p.user_id', '=', 'u.id') // the '=' is optional
      .select('p.id as post_id', 'contents', 'username')
      .where('u.id', user_id) // CAREFUL WITH AMBIGUOUS COLUMN NAMES

    return result
  },
}
