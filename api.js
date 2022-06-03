const input = document.getElementById('search');
const btn = document.getElementById('search-btn');

const requri = 'https://api.github.com/users/';

btn.addEventListener('click', () => {
    if (input.value.length < 1 || input.value === ' ' || input.value === '') return alert('Please enter a username');
    requestinfo();
})

async function requestinfo(user) {
    const resp = await fetch(requri + input.value);
    const json = await resp.json();

    if (json.message === 'Not Found') return alert('User not found');
    if (json) {
        profo(json);
    }
    return user
}

async function profo(user) {
    console.log(user);
    const profile = document.querySelector('.info-holder');
    const name = document.querySelector('.name');
    const desc = document.querySelector('.desc');
    const img = document.querySelector('.pfp');
    const userid = document.querySelector('.userid');
    const fls = document.querySelector('.fls');
    const flg = document.querySelector(".flg")
    const rp = document.querySelector(".rp")

    if (user.name === null || user.name === '') user.name = 'No name set';
    if (user.bio === null || user.bio === '') user.bio = 'No bio set';

    name.innerHTML = user.name;
    desc.innerHTML = user.bio;
    userid.innerHTML = user.login;
    fls.innerHTML = 'Followers: ' + user.followers;
    flg.innerHTML = 'Following: ' + user.following;
    rp.innerHTML = 'Public Repos: ' + user.public_repos;

    img.src = user.avatar_url;

    const seeongithub = document.querySelector('.seeongithub');
    seeongithub.href = user.html_url;

    img.addEventListener('click', () => {
        window.open(user.blog, '_blank');
    })

    document.title = user.name + ' - Github Profile';
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = user.avatar_url;

    input.value = '';

}
// on key press
input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        btn.click();
    }
})