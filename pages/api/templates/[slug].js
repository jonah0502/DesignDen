// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {templates} = require('./data.json')

export default function handler(req, res) {
    const tmp = templates.filter(tp => tp.attributes.slug === req.query.slug)


  if(req.method === 'GET'){
      res.status(200).json(tmp)
  }
  else{
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${res.method} not allowed!`}) //method not allowed
  }
}
