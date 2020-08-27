$(document).ready(function () {

    const $drinkSearch = $('#drinkSearch');
    const $recipeSearchInput = $('#recepieSearch');

    // while hit the api day limit, switch it to one of below
    // const apiKey = 'e6739b112bc9427a98862a95ca09ef9c';
    // const apiKey = '37d6c566dffd4e65af7bad5bf87e9617';
    const apiKey = '55fb145d0676465eb71e005685fdda51';

    // const baseUrl = `https://api.spoonacular.com/recipes/716429/information?apiKey=${apiKey}&includeNutrition=true`;
    const baseUrl = `https://api.spoonacular.com/recipes/`;


    // The cocktail api from TheCocktailDB
    $('#drinkSearch-btn').on('click', function (event) {
        event.preventDefault();
        // console.log($recipeSearchInput);
        const drinkInput = $drinkSearch.val().trim().toLowerCase();
        // console.log(drinkInput);
        $('.container').empty();
        const eBaseUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkInput}`
        $.ajax({
            url: eBaseUrl,
            method: 'GET',
        }).then(function (r) {
            console.log(r.drinks);
            // console.log(r.drinks[1].strInstructions);

            const cardColumn = $('<div>').addClass('card-columns');

            for (i = 0; i < r.drinks.length; i++) {
                // convert an object to array
                const entries = Object.entries(r.drinks[i]);
                console.log(entries);
                // console.log(entries[21+15][1] + entries[21][1]);
                const card = $('<div>').addClass('card booking-card mt-2 mb-4');
                const view = $('<div>').addClass('view overlay');
                const cardBody = $('<div>').addClass('card-body');
                const ingr = $('<h5>').addClass('card-title').text('Ingredients');
                const instructions = $('<h5>').addClass('card-title').text('Instructions');
                const ul = $('<ul>');
                const hr1 = $('<hr>');
                const hr2 = $('<hr>');
                const name = $('<h2>').addClass('card-title').text(r.drinks[i].strDrink);


                for (j = 21; j < 36; j++) {
                    if (entries[j][1] !== null || entries[j + 15][1] !== null) {
                        if(entries[j + 15][1] !== null){
                            const measure = entries[j + 15][1];
                            const ingrLi = $('<li>').text(measure + entries[j][1]);
                        console.log(ingrLi);
                        ul.append(ingrLi);
                        }
                    }
                }
                 const img = $('<img>').addClass('card-img-top').attr({ src: r.drinks[i].strDrinkThumb });
                 const instr = $('<p>').addClass('card-text').text(r.drinks[i].strInstructions);


                 cardBody.append(name,ingr,hr1,ul,instructions,hr2,instr);
                 view.append(img);
                 card.append(view,cardBody);
                 cardColumn.append(card);
                 $('.container').append(cardColumn);
            }
        })
    })


    // The recipe api from Spoonacular
    $('#recepieSearch-btn').on('click', function (event) {
        event.preventDefault();
        // console.log($recipeSearchInput);
        const input = $recipeSearchInput.val().trim().toLowerCase();

        $.ajax({
            url: `${baseUrl}complexSearch?query=${input}&apiKey=${apiKey}`,
            method: 'GET',
        }).then(function (response) {
            console.log(response);

            const $newDiv = $('<div>').addClass('card-columns');

            for (i = 0; i < 10; i++) {
                id = response.results[i].id;

                $.ajax({
                    url: `${baseUrl}${id}/information?apiKey=${apiKey}`,
                    method: 'GET',
                }).then(function (res) {
                    console.log(res);
                    $('.container').empty();

                    // break the paragraph by '.';
                    // console.log(res.instructions.split('.'));
                    // const instructions = res.instructions.replace(/([()])/g, '').split('.');
                    // console.log(instructions);
                    const $step = res.analyzedInstructions[0].steps;
                    const $prep = res.extendedIngredients;
                    // console.log(res.analyzedInstructions[0].steps[1].step);
                    const $newDiv1 = $('<div>').addClass('card booking-card mt-2');
                    // const $newDiv2 = $('<div>').addClass('card');
                    const $newDiv3 = $('<div>').addClass('view overlay');
                    const $img = $('<img>').addClass('card-img-top').attr({ src: res.image });
                    const $newDiv4 = $('<div>').addClass('card-body');
                    const $h4 = $('<h2>').addClass('card-title').text(res.title);
                    const $hr1 = $('<hr>');
                    const $hr2 = $('<hr>');
                    const $ingr = $('<h5>').text('Ingredients');
                    const $Instructions = $('<h5>').text('Instructions');
                    const $ul = $('<ul>');
                    for (i = 0; i < $prep.length; i++) {
                        const $prepLi = $('<li>').text($prep[i].original);
                        console.log($prepLi);
                        $ul.append($prepLi);
                    }
                    const $ol = $('<ol>');
                    for (i = 0; i < $step.length; i++) {
                        // const $ul = $('<ul>');
                        const $instrLi = $('<li>').text($step[i].step);
                        console.log($instrLi);
                        $ol.append($instrLi);
                    }
                    const $button = $('<button>').addClass('btn btn-light-blue btn-md');
                    const $a = $('<a>').attr({ href: res.sourceUrl, target: '_blank' }).text('Read more');

                    $newDiv3.append($img);
                    $button.append($a);
                    $newDiv4.append($h4, $ingr, $hr1, $ul, $Instructions, $hr2, $ol, $button);
                    $newDiv1.append($newDiv3, $newDiv4);
                    // $newDiv1.append($newDiv2);
                    $newDiv.append($newDiv1);
                    $('.container').append($newDiv);
                })
            }
        })
    });


})

