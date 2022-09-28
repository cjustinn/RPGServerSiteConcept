export default function handler(req, res) {
    const { uuid } = req.query;

    fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`).then(r => r.json()).then(data => {
        res.status(200).json({ name: data.name });
    }).catch(err => res.status(200).json({ error: err }));
}