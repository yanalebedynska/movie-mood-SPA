const API_KEY = '6fa40b1591403fc51e35356a302b42b7';

const genreMap = {
    joy: 35,        // Comedy
    sad: 18,        // Drama
    anger: 28      // Action
};


function getPoster(title) {
    return "images/" + (posterMap[title] || "default.jpg");
}

document.getElementById('fetch-movies').addEventListener('click', async () => {
    const mood = document.getElementById('mood').value;
    const genreId = genreMap[mood];

    if (!genreId) {
        alert("Invalid mood selected.");
        return;
    }

    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        const data = await res.json();

        const moviesList = document.getElementById('movies-list');
        moviesList.innerHTML = '';

        if (!data.results || data.results.length === 0) {
            moviesList.innerHTML = '<p>No movies found for this mood.</p>';
            return;
        }

        data.results.slice(0, 4).forEach((movie) => {
            const card = document.createElement('div');
            card.classList.add('film-card');

            const img = document.createElement('img');
            img.src = getPoster(movie.title);
            img.alt = movie.title;

            const content = document.createElement('div');
            content.classList.add('film-card-content');

            const title = document.createElement('h3');
            title.textContent = movie.title;

            const desc = document.createElement('p');
            desc.textContent = movie.overview?.slice(0, 150) + '...';

            const btn = document.createElement('button');
            btn.textContent = 'Details';
            btn.onclick = () => loadDetails(movie.id, movie.title);

            content.appendChild(title);
            content.appendChild(desc);
            content.appendChild(btn);
            card.appendChild(img);
            card.appendChild(content);
            moviesList.appendChild(card);
        });
    } catch (err) {
        alert("Something went wrong. Check API key or internet.");
        console.error(err);
    }
});

async function loadDetails(id, title) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    const detail = await res.json();

    const block = document.getElementById('movie-details');
    block.innerHTML = '';

    const card = document.createElement('div');
    card.classList.add('film-card');

    const img = document.createElement('img');
    img.src = getPoster(title);
    img.alt = title;

    const content = document.createElement('div');
    content.classList.add('film-card-content');

    const titleEl = document.createElement('h3');
    titleEl.textContent = title;

    const rating = document.createElement('p');
    rating.textContent = 'Rating: ' + detail.vote_average;

    const release = document.createElement('p');
    release.textContent = 'Release Date: ' + detail.release_date;

    const desc = document.createElement('p');
    desc.textContent = detail.overview;

    content.appendChild(titleEl);
    content.appendChild(rating);
    content.appendChild(release);
    content.appendChild(desc);
    card.appendChild(img);
    card.appendChild(content);
    block.appendChild(card);

    notifyViewedMovie(title);

    const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`);
    const similarData = await similarRes.json();

    const similarBlock = document.getElementById('similar-movies');
    similarBlock.innerHTML = '';

    if (similarData.results && similarData.results.length > 0) {
        similarData.results.slice(0, 3).forEach((movie) => {
            const simCard = document.createElement('div');
            simCard.classList.add('film-card');

            const simImg = document.createElement('img');
            simImg.src = getPoster(movie.title);
            simImg.alt = movie.title;

            const simContent = document.createElement('div');
            simContent.classList.add('film-card-content');

            const simTitle = document.createElement('h3');
            simTitle.textContent = movie.title;

            const simDesc = document.createElement('p');
            simDesc.textContent = movie.overview?.slice(0, 100) + '...';

            simContent.appendChild(simTitle);
            simContent.appendChild(simDesc);
            simCard.appendChild(simImg);
            simCard.appendChild(simContent);
            similarBlock.appendChild(simCard);
        });
    } else {
        similarBlock.innerHTML = '<p>No similar movies found.</p>';
    }
}

function notifyViewedMovie(title) {
    socket.emit('viewedMovie', { title });
}

socket.on('userViewed', (data) => {
    const feed = document.getElementById('live-feed-content');
});


const posterMap = {
    "A Minecraft Movie": "minecraft.jpg",
    "Brave Citizen": "braven_citizens.jpg",
    "Conjuring the Cult": "conjuring_the_cult.jpg",
    "Death of a Unicorn": "death_of_unikorn.jpg",
    "Exterritorial": "exterritorial.jpg",
    "Gerry": "gerry.jpg",
    "Karate Kid Legends": "karate_kid.jpg",
    "Moana 2": "moana2.jpg",
    "The Accountant": "the_accountant.jpg",
    "Last Bullet": "the_last_bullet.jpg",
    "The Monkey": "the_monkey.jpg",
    "Thunderbolts*": "thundebolts.jpg",
    "Tin Soldier": "tin_soldie.jpg",
    "Walking Out": "walking_out.jpg",
    "Warfare": "warfare.jpg",
    "Bad Influence": "bad_influence.jpg",
    "Fantastic Four: Rise of the Silver Surfer": "fantastic4.jpg",
    "Superman III": "superman3.jpg",
    "Asterix & Obelix Take on Caesar": "asterix.jpg",

    "Red Sonja": "red.jpg",
    "Psycho": "psycho.jpg",
    "The Poseidon Adventure": "adventure.jpg",
    "Spider-Man": "spiderman.jpg",
    "Transamerica": "transameica.jpg",
    "Constantine": "constantine.jpg",
    "Ladies in Lavender": "ladies.jpg",
    "Candyman": "candyman.jpg",
    "Red Dragon": "dragon.jpg",
    "Woodpeckers": "wood.jpg",
    "The Butterfly Effect": "effect.jpg",
    "Live and Become": "live.jpg",
    "Full Metal Jacket": "full.jpg",
    "Under Siege 2: Dark Territory": "under.jpg",
    "Redacted": "redacted.jpg",
    "Last Action Hero": "hero.jpg"
};