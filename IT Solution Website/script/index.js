$(document).ready(function(){
    $('.filter').click(function(){

        $(this).addClass('active').siblings().removeClass('active');
    
        var filter = $(this).attr('data-filter')
    
        if(filter == 'all') {
            $('.image').show(400);
            console.log('ok');
        } else {
            $('.image').not('.'+filter).hide(200);
            $('.image').filter('.'+filter).show(400);
        }
    
    });
});

$(document).ready(function(){
    $("#search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#products .image").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});

$(function(){
    $('.image a').click(function(event){
       console.log("hello")
       var title = $(this).attr('data-title');
       var description = $(this).attr('data-description');
       var image = $(this).attr('data-image');
       $("#products-data").empty();
       $("#products-data").append(`
            <div class="row d-flex justify-content-center pt-3">
                <div class="col-lg-5 col-md-12">
                    <h1 class="headline ps-lg-5 pt-5">${title}</h1>
                    <p class="message ps-lg-5">
                    ${description}
                    </p>      
                    <div class="row d-grid d-md-flex justify-content-md-start ps-lg-5 pt-3">
                    <div class="col-lg-10">
                        <div class="input-group">
                        <input type="email" class="form-control py-2" placeholder="Email" aria-label="Email" aria-describedby="getBtn">
                        <button class="btn btn-primary rounded" type="button" id="getBtn">Get Started</button>
                        </div>
                    </div>                 
                    </div>
                </div>
                <div class="col-lg-5">                
                    <img src="${image}" class="img-fluid">               
                </div>
            </div>
       `)
    });
});

$(function(){
    $('#home-image a').click(function(event){
        console.log("awit")
    });
});

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

var owl = $('.owl-carousel');
owl.owlCarousel();
// Go to the next item
$('.customNextBtn').click(function() {
    owl.trigger('next.owl.carousel');
})
// Go to the previous item
$('.customPrevBtn').click(function() {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owl.trigger('prev.owl.carousel', [300]);
})

/*
$(document).ready(function(){
    $("#onSale").modal('show');
});
*/

$("#toTop").click(function () {
    $("html, body").animate({scrollTop: 0}, 100);
});

var typed = new Typed(".auto-type", {
  strings: ["Storage", "Archiving", "Backups"],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true
})

