export default function deleteIce (id) {
    return fetch(`http://localhost:3000/icecream/${id}`, {
        method: 'DELETE',
    }).then(res => res.json())
}