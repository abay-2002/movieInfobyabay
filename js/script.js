function searchMovie(){
    $('#movie-list').html('');

    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '7c8b6135',
            's': $('#input-movie').val()
        },
        success: function (result){
            // console.log(result);
            if(result.Response == "True"){
                let movies = result.Search;
                $.each(movies, function(i, element){
                    $('#movie-list').append(`
                    <div class="col-md-2 mx-auto my-1">
                        <div class="card">
                            <img src="`+element.Poster+`" class="card-img-top"/>
                            <div class="card-body">
                                <h5 class="card-title">`+element.Title+`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+element.Year+`</h6>
                                <a href="#" class="detail-movie" type="button" data-bs-toggle="modal" data-bs-target="#jokes">Watch now</a>                               
                                <a href="#" class="detail-movie" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+element.imdbID+`">See detail</a>
                            </div>
                        </div>
                    </div> 
                    `);
                });
                $('#input-movie').val('');
            }
            else{
                $('#movie-list').html(`<h1 class="text-center">`+result.Error+` :(</h1>`)
            }
        }
    })//penutup ajax
}

$('#search-button').on('click',function(){
    searchMovie();
});

$('#input-movie').on('keyup', function(event){
    if(event.keyCode === 13){
        searchMovie();
    }
});



$('#movie-list').on('click', '.detail-movie', function(){
    // console.log($(this).data('id'));
    // sampai sini saja tidak tampil pada console, kenapa? karena ada problem yang dinamakan event bubbling.
    // kenapa karena event ini dibuat sebelum class detail-movie dibuat, solusinya adalah menggunakan event delegation yaitu memilih element parentnya yang kemudian apabila ada class detail-movie maka lakukan function.
    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        typeData: 'json',
        data: {
            'apikey': '7c8b6135',
            'i': $(this).data('id')
        },
        success: function(result){
            if(result.Response == "True"){
                $('.appended-json').html(`    
                    <div class="col">Actors: `+result.Actors+`</div>
                    <div class="col">Writer: `+result.Writer+`</div>
                    <div class="row">
                        <div class="col">Director: `+result.Director+`</div>
                        <div class="col">Plot: `+result.Plot+`</div>
                    </div>
                `);
            }
        }
    })
    
});