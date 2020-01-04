const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const { user } = req.headers;    

    const loogedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loogedDev.likes } },
        { _id: { $nin: loogedDev.dislikes } },
      ]
    })

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const userExist = await Dev.findOne({ user: username });

    if (userExist) {
      return res.json(userExist);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);

    /* verifica se o usuário existe */
    if (!response.data){
      return res.json({ error: `usuário não encontrado (${username}) !`})
    }

    const { name, bio, avatar_url } = response.data;

    if (!name) {
      return res.json({ error: 'Nome não informado !'});
    }

    if (!bio) {
      return res.json({ error: 'Bio não informada !' });
    }

    if (!avatar_url) {
      return res.json({ error: 'Avatar não informado !' });
    }

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar: avatar_url
    })

    return res.json(dev);
  }
}