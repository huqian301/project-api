$(document).ready(function () {
  const apiKey = 'e6739b112bc9427a98862a95ca09ef9c';
  const baseUrl = `https://api.spoonacular.com/recipes/716429/information?apiKey=${apiKey}&includeNutrition=true`;

  $(document).on('click', function (event) {
    event.preventDefault();
  });
  //open full screen box
  function openSearch() {
    document.getElementById('myOverlay').style.display = 'block';
  }

  // Close the full screen search box
  function closeSearch() {
    document.getElementById('myOverlay').style.display = 'none';
  }
  $.ajax({
    url: `${baseUrl}`,
    method: 'GET',
  }).then(function (response) {
    console.log(response);
  });
});
