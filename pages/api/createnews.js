import prisma from "../../services/PrismaService";
import Cors from 'cors';

const cors = Cors({
    methods: [ 'POST', 'GET', 'PUT', 'DELETE' ]
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            } else {
                return resolve(result);
            }
        })
    })
}

export default async function handler(req, res) {
    await runMiddleware(req, res, cors);

    if (!req.body.article) { res.status(400).json({ error: `You must provide article content.` }); }
    else {
        
        prisma.newsArticle.create({
            data: {
                title: req.body.article.title,
                author: req.body.article.author,
                header: req.body.article.header,
                preview: req.body.article.preview,
                content: req.body.article.content,
                displayLarge: req.body.article.displayLarge
            }
        }).then(() => {
            res.status(201).json({ message: `Successfully created the article.` });
        }).catch(err => res.status(500).json({ error: err }));

    }
}