export default function updateIce (id, postToUpdate) {
    const options = {
method: "PATCH",
body: JSON.stringify(postToUpdate),
headers: {
"Content-Type": "application/json; charset=UTF-8",
},

};
    return fetch(`http://localhost:3000/icecream/${id}`, options).then(res => res.json())
}