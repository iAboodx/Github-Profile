const input = document.getElementById('search');
const btn = document.getElementById('search-btn');

const requri = 'https://api.github.com/users/';
const deletealert = document.querySelector('.delete');
const alertx = document.querySelector('.alerts');

deletealert.addEventListener('click', () => {
    alertx.style.display = 'none';
})

btn.addEventListener('click', () => {
    if (input.value.length < 1 || input.value === ' ' || input.value === '') return alertsss('Type a username between 1 to 32');

    requestinfo();

})

function alertsss(msg) {
    alertx.style.display = 'block';
    alertx.innerHTML = `<div class="alert alert-danger" role="alert">${msg}<i class="fa-solid fa-xmark-circle delete"></i></div>`
    setTimeout(() => {
        alertx.style.display = 'none';
    }, 2500);
}
async function requestinfo(user) {
    const resp = await fetch(requri + input.value);
    const json = await resp.json();

    if (json.message === 'Not Found') return alertsss('User not found')
    if (json) {
        profo(json);
        document.querySelectorAll('.profile-card-social__item').forEach(item => {
            item.remove();
        })
        const items = document.querySelector('.items');
        items.style.height = '11vh';
        const back = document.querySelector('.back');
        back.style.height = '11vh';

    }
    return user
}

async function profo(user) {
    const name = document.querySelector('.profile-card__name');
    const desc = document.querySelector('.profile-card__txt');
    const img = document.getElementById('profile-card__img');
    const userid = document.querySelector('.profile-card__user');
    const fls = document.querySelector('.fls');
    const flg = document.querySelector(".flg")
    const rp = document.querySelector(".rp")
    const rpp = document.querySelector(".rpp")
    const twitter = document.querySelector(".twitter")
    const loc = document.querySelector(".profile-card-loc__txt")
    if (user.name === null || user.name === '') user.name = 'No name set';
    if (user.bio === null || user.bio === '') user.bio = 'No bio set';
    if (user.avatar_url === null || user.avatar_url === '') user.avatar_url = 'https://avatars3.githubusercontent.com/u/' + user.id + '?v=4';
    if (user.location === null || user.location === '') user.location = 'No location set';
    if (user.followers === null || user.followers === '') user.followers = 'No followers';
    if (user.following === null || user.following === '') user.following = 'No following';
    if (user.public_repos === null || user.public_repos === '') user.public_repos = 'No public repos';
    if (user.twitter_username) {
        const append = document.querySelector('.profile-card-social');
        const twitter = document.createElement('a');
        twitter.classList.add('profile-card-social__item');
        twitter.classList.add('twitter');
        twitter.href = 'https://twitter.com/' + user.twitter_username;
        twitter.innerHTML = `<span class="icon-font"><svg class="icon"><use xlink:href="#icon-twitter"></use></svg></span>`;
        append.appendChild(twitter);
    }
    if (user.blog) {
        const append = document.querySelector('.profile-card-social');
        const blog = document.createElement('a');
        blog.classList.add('profile-card-social__item');
        blog.classList.add('link');
        blog.href = +user.blog;
        blog.innerHTML = `<span class="icon-font">
        <svg class="icon">
            <use xlink:href="#icon-link"></use>
        </svg>
    </span>`;
        append.appendChild(blog);

    }
    name.innerHTML = user.name;
    desc.innerHTML = user.bio;
    userid.innerHTML = user.login;
    fls.innerHTML = user.following;
    rp.innerHTML = user.public_repos;
    loc.innerHTML = user.location;
    rpp.innerHTML = user.public_gists;
    img.src = user.avatar_url;



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
