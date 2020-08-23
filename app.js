$(document).ready(function () {

    const recipeSearchInput = $('#recepieSearch');
    const apiKey = 'e6739b112bc9427a98862a95ca09ef9c';
    // const baseUrl = `https://api.spoonacular.com/recipes/716429/information?apiKey=${apiKey}&includeNutrition=true`;
    const baseUrl = `https://api.spoonacular.com/recipes/`;


    $('#search').on('click', function (event) {
        event.preventDefault();
        // console.log(recipeSearchInput);
        const input = recipeSearchInput.val().trim().toLowerCase();
        $('.container').empty();

        $.ajax({
            url: `${baseUrl}complexSearch?query=${input}&apiKey=${apiKey}`,
            method: 'GET',
        }).then(function (response) {
            console.log(response);
            for (i = 0; i < 8; i++) {
                id = response.results[i].id;


                $.ajax({
                    url: `${baseUrl}${id}/information?apiKey=${apiKey}`,
                    method: 'GET',
                }).then(function (res) {
                    console.log(res);

                    const $newDiv = $('<div>').addClass('row row-cols-1 row-cols-md-2');
                    const $newDiv1 = $('<div>').addClass('col mb-4');
                    const $newDiv2 = $('<div>').addClass('card');
                    const $newDiv3 = $('<div>').addClass('view overlay');
                    const $img = $('<img>').addClass('card-img-top').attr({src:res.image,style: 'width: 25rem;'});
                    const $newDiv4 = $('<div>').addClass('card-body');
                    const $h4 = $('<h4>').addClass('card-title').text(res.title);
                    const $hr = $('<hr>');
                    const $p = $('<p>').addClass('card-text').text('Instruction:' +res.instructions);
                    const $button = $('<button>').addClass('btn btn-light-blue btn-md');
                    const $a = $('<a>').attr({href: res.sourceUrl, target :'_blank'}).text('Read more');

                    $newDiv3.append($img);
                    $button.append($a);
                    $newDiv4.append($h4,$hr,$p,$button);

                    $newDiv2.append($newDiv3,$newDiv4);
                    $newDiv1.append($newDiv2);
                    $newDiv.append($newDiv1)


                    $('.container').append($newDiv);


                })
            }
    })
});


})

