// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {templates} = require('./data.json')

export default function handler(req, res) {
  if(req.method === 'GET'){
      res.status(200).json(templates)
  }
  else{
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${res.method} not allowed!`}) //method not allowed
  }
}
