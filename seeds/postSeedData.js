const { Post } = require('../models');

const postData = [
    {
      title: 'First Post',
      content: 'This is the first post.',
      user_id: 1,
    }
  ];
  
  const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;