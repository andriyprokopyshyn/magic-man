var banner = $('.banner');
var prevScrollpos = window.pageYOffset;

$(document).ready(function() {
    
    // smooth scroll to anchor element
    // $(".nav-item > a, a").click(function (e) {
    //     var href = $(this).attr("href");
    //     if(/^#/.test(href)) {
    //         e.preventDefault();
    //         var height = $(href)[0].offsetTop;

    //         $('body, html').animate({scrollTop: height}, 600);
    //         $('.nav-item.active').removeClass('active');
    //         $('a.nav-link[href="' + href + '"]').parent().addClass('active');
    //     }
    // });

    $('#toogler').click(function() {
        $(this).toggleClass('open');
        $('#header .navbar-small .bottom-content').toggleClass('menu-open');
        moveSearchBar();
    });

    $('.product-items').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        freeScroll: true,
        // disable previous & next buttons and dots
        prevNextButtons: false,
        pageDots: false
    });

    var leftAnimationItems = $('.left-animation').find('.item');
    var rightAnimationItems = $('.right-animation').find('.item');  
    animation(leftAnimationItems);
    animation(rightAnimationItems);
});

changeBannerMargin();

function changeBannerMargin() {    
    var prevMargin = parseInt(banner.css('margin-top'));
    var nextMargin = parseInt($('#header').css('height'));
    if (prevMargin != nextMargin) {
        banner.css('margin-top', nextMargin);        
    }
}

$(window).on('scroll', function() {
    scrollHeader();
    changeBannerMargin();
    moveSearchBar();
});

$(window).on('resize', function() {
    scrollHeader();
    changeBannerMargin();
    moveSearchBar();
});

function scrollHeader() {
    var header = $('#header')[0];
    var sticky = parseInt(banner.css('margin-top'));
    (window.pageYOffset > sticky) ? $(header).addClass("sticky") : $(header).removeClass("sticky");
}

function animation(items) {
    var itemsLength = items.length;
    for (var i = 0; i < itemsLength; i++) {
        $(items[i]).attr("data-id", i + 1);
    }
    if (itemsLength === 1) {
        $(items[0]).addClass('d-block');
    } else if (itemsLength > 1) {
        var start = 0;
        $(items[0]).addClass('d-block');
        setInterval(function() {
            start++;
            if (start !== 0) {
                $(items[start - 1]).removeClass('d-block');
            } else {
                $(items[itemsLength - 1]).removeClass('d-block');
            }
            if (start === itemsLength) {
                start = 0;
                $(items[start]).addClass('d-block');              
            }
            $(items[start]).addClass('d-block');
        }, 7000)
    }
}

function calculateHMSleft() {
	//calculate
	var now = new Date();
	var hoursleft = 23 - now.getHours();
	var minutesleft = 59 - now.getMinutes();
    var secondsleft = 59 - now.getSeconds();
    
	//format 0 prefixes
    if(minutesleft < 10) minutesleft = "0" + minutesleft;
    if(hoursleft < 10) hoursleft = "0" + hoursleft;
	if(secondsleft < 10) secondsleft = "0" + secondsleft;

	//display
	$('.timer').html(hoursleft + ":" + minutesleft + ":" + secondsleft);
}

function moveSearchBar() {
    var currentScrollPos = window.pageYOffset;
    var searchBar = document.querySelector(".navbar-small .bottom-content");
    if (prevScrollpos >= currentScrollPos && currentScrollPos < 100) {
        searchBar.style.marginTop = "0";
    } else {
        searchBar.style.marginTop = "-100px";
    }
    var interval = setInterval(function() {
        changeBannerMargin();
    }, 5)
    setTimeout(function() {
        clearInterval(interval)
    }, 750)
    prevScrollpos = currentScrollPos;
}

calculateHMSleft();
setInterval(calculateHMSleft, 1000);


// custome select
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "category-select": */
x = document.getElementsByClassName("category-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);