$(document).ready(function () {

    const id =715538
    const apiKey = 'e6739b112bc9427a98862a95ca09ef9c';
    // const baseUrl = `https://api.spoonacular.com/recipes/716429/information?apiKey=${apiKey}&includeNutrition=true`;
    const baseUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;

    $(document).on('click', function (event) {
        event.preventDefault();
    });

    $.ajax({
        url: `${baseUrl}`,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
    })

})

