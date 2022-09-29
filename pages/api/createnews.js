import prisma from "../../services/PrismaService";

export default function handler(req, res) { 
    if (!req.body.article) { res.status(400).json({ error: `You must provide article content.` }); }
    else {

        prisma.newsArticle.create({
            data: req.body.article
        }).then(() => {
            res.status(201).json({ message: `Successfully created the article.` });
        }).catch(err => res.status(500).json({ error: err }));

    }
}