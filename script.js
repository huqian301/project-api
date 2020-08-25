$(document).ready(function () {

    const eApiKey = "442982f5fe2e3eca6969e00706b1793f"
    const appId = "fa33474d"
    const eBaseUrl = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${eApiKey}`


    $('#search').on('click', function (event) {
        event.preventDefault();
        console.log($search);
        // let recepieSearch = $recepieSearch.val();
        // const ingredientsSearch = $ingredientsSearch.val();
    });

    // Ajax GET

    //     $.ajax({
    //         url: `${baseUrl}`,
    //         method: 'GET',

    //     }).then(function (response) {
    //         console.log(response);

    //     });

});

