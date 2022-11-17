var $ul = document.querySelector('ul');
var targetUrl = encodeURIComponent('http://openlibrary.org/search.json?subject=thriller');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.responseType = 'json';
xhr.addEventListener('load', function (event) {
  for (var i = 0; i < xhr.response.docs.length; i++) {
    data.books.push(xhr.response.docs[i]);
    $ul.appendChild(list(xhr.response.docs[i]));
  }
  for (var a = 0; a < data.entries.length; a++) {
    readinglist(data.entries[a]);
  }
}

);
xhr.send();

function list(book) {
  var list = document.createElement('li');
  list.setAttribute('event-Id', book.key);
  var $image = document.createElement('img');
  var $div = document.createElement('div');
  var $divOne = document.createElement('div');
  var $divTwo = document.createElement('div');
  var $headingThree = document.createElement('h3');
  var $paragraph = document.createElement('p');
  var $paragraphTwo = document.createElement('p');

  $divOne.setAttribute('class', 'row');
  $divTwo.setAttribute('class', 'column-half');
  $ul.appendChild(list);

  list.appendChild($divOne);
  $divOne.appendChild($image);
  $divOne.appendChild($divTwo);
  $divTwo.appendChild($div);
  $div.appendChild($headingThree);
  $div.appendChild($paragraph);
  $div.appendChild($paragraphTwo);

  $image.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg');
  $div.setAttribute('class', 'lists');
  $headingThree.setAttribute('class', 'font-fam');
  $paragraph.setAttribute('class', 'font-fam-two');
  $paragraphTwo.setAttribute('class', 'font-fam-two');

  $headingThree.textContent = book.title;
  $paragraph.textContent = book.author_name;
  $paragraphTwo.textContent = 'Isbn#: ' + book.isbn[0];

  var $addButton = document.createElement('button');
  $addButton.setAttribute('class', 'button-add');
  $addButton.textContent = 'ADD';
  $div.appendChild($addButton);
  return list;
}

$ul.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var listKey = event.target.closest('li').getAttribute('event-Id');
  for (var i = 0; i < data.books.length; i++) {
    if (data.books[i].key === listKey) {
      var key = data.books[i].key;
      var authorName = data.books[i].author_name;
      var isbn = data.books[i].isbn[0];
      var title = data.books[i].title;
      var url = 'https://covers.openlibrary.org/b/id/' + data.books[i].cover_i + '-M.jpg';
    }
  }
  var object = {};
  object.authorName = authorName;
  object.isbn = isbn;
  object.title = title;
  object.url = url;
  object.key = key;
  object.listsKey = listKey;
  data.entries.push(object);
  event.target.className = 'button-added';
  event.target.textContent = 'Added';
}
);

var $readingList = document.querySelector('.readinglist-ul');

function readinglist(entries) {
  var list = document.createElement('li');
  list.setAttribute('event-Id', entries.key);
  var $image = document.createElement('img');
  var $div = document.createElement('div');
  var $divOne = document.createElement('div');
  var $divTwo = document.createElement('div');
  var $headingThree = document.createElement('h3');
  var $paragraph = document.createElement('p');
  var $paragraphTwo = document.createElement('p');

  $divOne.setAttribute('class', 'row width');
  $divTwo.setAttribute('class', 'column-full');
  $readingList.appendChild(list);

  list.appendChild($divOne);
  $divOne.appendChild($image);
  $divOne.appendChild($divTwo);
  $divTwo.appendChild($div);
  $div.appendChild($headingThree);
  $div.appendChild($paragraph);
  $div.appendChild($paragraphTwo);

  $image.setAttribute('src', entries.url);
  $div.setAttribute('class', 'lists');
  $headingThree.setAttribute('class', 'font-fam');
  $paragraph.setAttribute('class', 'font-fam-two');
  $paragraphTwo.setAttribute('class', 'font-fam-two');

  $headingThree.textContent = entries.title;
  $paragraph.textContent = entries.authorName;
  $paragraphTwo.textContent = 'Isbn#: ' + entries.isbn;

  return list;
}

var $listFav = document.querySelector('#favorite-list');
var $apiList = document.querySelector('#api-list');

function viewSwap(string) {
  data.view = string;
  if (string === 'book-list') {
    $apiList.className = 'visible';
    $listFav.className = 'hidden';
  } else if (string === 'reading-list') {
    $listFav.className = 'visible';
    $apiList.className = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  viewSwap(data.view);
});

var readingButton = document.querySelector('.reading-page');
var bookButton = document.querySelector('.book-page');

bookButton.addEventListener('click', function () {
  viewSwap('book-list');
});

readingButton.addEventListener('click', function () {
  viewSwap('reading-list');
});
