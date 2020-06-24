var banner = $('.banner');
var prevScrollpos = window.pageYOffset;
var selectElements = [".category-select", ".filter-select", ".page-select"];

$(document).ready(function () {
  $('#toogler').click(function () {
    $(this).toggleClass('open');
    $('#header .navbar-small .bottom-content').toggleClass('menu-open');
    moveSearchBar();
  });

  $('.product-items:not(.inside-catalog)').flickity({
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

$(window).on('scroll', function () {
  scrollHeader();
  changeBannerMargin();
  moveSearchBar();
});

$(window).on('resize', function () {
  scrollHeader();
  changeBannerMargin();
  moveSearchBar();
});

$("#filter-sm").on("click", function () {
  $('#modal-container').removeAttr('class').addClass("show");
  $('body').addClass('modal-active')
});

$("#close-modal").on("click", function () {
  $('#modal-container').addClass('out').addClass("remove");
  $('body').removeClass('modal-active');
});

$(".modal #step-2 .clear").on('click', function () {
  var categories = filterSecondSlide.find(".categories.d-block");
  if (categories.length === 1) {
    var id = $(categories[0]).attr("data-id");
    if (id) {
      var checkboxes = $(".categories[data-id='" + id + "'] input:checkbox");
      $(checkboxes).each(function (i) {
        $(checkboxes[i]).prop("checked", false).parent('label').removeClass('checked');
      })
    }
  }
})

$("#clear-filter").on('click', function () {
  filterSecondSlide.find('input:checkbox').prop("checked", false)
})

$("input[name='brand-search']").on('keyup', function () {
  var value = $(this).val();
  var q = value.toLowerCase();
  var items = $(".categories[data-id='brands'] li:not(.search)");
  $(items).removeClass("d-none");
  if (q !== "") {
    items.each(function (item) {
      if (items[item].innerText.toLowerCase().indexOf(q) === -1) {
        $(items[item]).addClass("d-none");
      } else {
        $(items[item]).remove("d-none");
      }
    })
  }
  $("input[name='brand-search']").val(value);
})

var filterFirstSlide = $(".modal #step-1");
var filterSecondSlide = $(".modal #step-2");


$("#categories-sm li").on("click", function () {
  var title = $(this).find("a").html();
  var indexTag = title.indexOf("<");
  var category = $(this).attr("data-id");
  var categoryContainer = filterSecondSlide.find(".categories[data-id='" + category + "']");

  filterFirstSlide.addClass("out").removeClass("in");
  filterSecondSlide.addClass("in").removeClass("out");

  if (indexTag !== -1) {
    title = title.slice(0, indexTag)
  }
  $(".modal #step-2 .title").text(title);
  if (categoryContainer.length > 0) {
    $(categoryContainer[0]).addClass("d-block");
  }
});

$("#back-modal").on("click", function () {
  filterFirstSlide.removeClass("out").addClass("in");
  filterSecondSlide.removeClass("in").addClass("out");
  $(".modal #step-2 .categories").removeClass("d-block");
});

$(".modal #step-2 .categories li").on("click", function (e) {
  var input = $(this).find("input:checkbox");
  if ((e.target.tagName.toLowerCase() === "li" || e.target.tagName.toLowerCase() === "a") && input.length === 1) {
    $(input[0]).prop("checked", !input[0].checked)
  }
});

$("input[type='checkbox']").on("change", function () {
  var anotherCheckbox = $("input[type='checkbox'][name='" + $(this).attr("name") + "']")
  $(anotherCheckbox).prop("checked", this.checked);

  if (this.checked) {
    $(this).parent('label').addClass('checked');
    $(anotherCheckbox).parent('label').addClass('checked');
  } else {
    $(this).parent('label').removeClass('checked');
    $(anotherCheckbox).parent('label').removeClass('checked');
  }
})

$('input:checked').parent('label').addClass('checked');

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
    setInterval(function () {
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
  if (minutesleft < 10) minutesleft = "0" + minutesleft;
  if (hoursleft < 10) hoursleft = "0" + hoursleft;
  if (secondsleft < 10) secondsleft = "0" + secondsleft;

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
  var interval = setInterval(function () {
    changeBannerMargin();
  }, 5)
  setTimeout(function () {
    clearInterval(interval)
  }, 750)
  prevScrollpos = currentScrollPos;
}

calculateHMSleft();
setInterval(calculateHMSleft, 1000);


$(selectElements).each(function (el) {
  var name = selectElements[el];
  x = $(name);
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
    var start = (name === ".filter-select") ? 1 : 0
    for (j = start; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
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
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
})

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