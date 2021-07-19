// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {templates} = require('./data.json')
export default function handler(req, res) {
    const temp = templates.filter(t => t.slug === req.query.slug)
  
    if(req.method === 'GET'){
    res.status(200).json(temp)
  }else{
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}
