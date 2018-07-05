


$(document).ready(()=> {

    // add an evenet listner to the form element

    document.getElementById('searchForm').addEventListener('submit',testFn);


    function testFn(e) {

        // grab the input element in the form

        let searchInput = document.getElementById('searchText');
        let textOfSearch = searchInput.value;

        //console.log(textOfSearch);
        getJokes(textOfSearch);
        

e.preventDefault();
    }


});



function getJokes(searchText){
// GET request for remote image
    axios.defaults.headers.get['Accept'] = 'application/json';


        axios.get('https://icanhazdadjoke.com/search?term='+searchText)
            .then((response) => {
                let arraysOfJoke = response.data.results;
                let heading = response.data.search_term;

                let htmlJokesElement= createJokes(arraysOfJoke,heading);

                console.log(htmlJokesElement);

                appendAllJokes(htmlJokesElement);



            })
            .catch((err) => {
                console.log(err);
            });

}

function appendAllJokes(jokes) {

    let parrent = document.getElementById('listOfjokes');

    for (let i=0; i<jokes.length;i++){

        parrent.appendChild(jokes[i]);
    }

}

function createJokes(arraysOfJoke,searchTerm) {

    const htmlJokesElement= [];


    for (let i=0; i <arraysOfJoke.length ; i++){

        let currentJoke = arraysOfJoke[i];

        htmlJokesElement.push(getJokeCard(currentJoke.id,searchTerm,currentJoke.joke));
        console.log(getJokeCard(currentJoke.id,searchTerm,currentJoke.joke));
    }

    return htmlJokesElement;
}


function getJokeCard(id,subject,joke) {

    // document create a div

    let card = document.createElement('div');

    card.setAttribute('class','card');

    // card body

    let cardBody = document.createElement('div');

    cardBody.setAttribute('class','card-body');

    //append it to the parent

    card.appendChild(cardBody);

    // console.log(card);

    // h1 for subject of the joke

    let headingSubject = document.createElement('h4');

    headingSubject.innerText = subject+ ' is the subject of the joke';
    cardBody.appendChild(headingSubject);


    // paragraf for card of joke

    let p = document.createElement('p');
    p.setAttribute('class','card-text');
    p.innerText = joke ;
    cardBody.appendChild(p);

    // id of it

    let ids = document.createElement('p');
    ids.setAttribute('class','badge badge-info');
    ids.innerText = id ;
    cardBody.appendChild(ids);




return card;


}