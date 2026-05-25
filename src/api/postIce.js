


export default function postIce (data) {
const options = {
method: "POST",
body: JSON.stringify(data),
headers: {
"Content-Type": "application/json; charset=UTF-8",
},
};
    return fetch(`http://localhost:3000/icecream`, options).then(res => res.json())
}