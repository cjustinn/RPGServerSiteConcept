export default function handler(req, res) {
    const { name } = req.query;

    fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(r => r.json()).then(data => {
        res.status(200).json({ uuid: data.id });
    }).catch(err => res.status(200).json({ error: err }));
}