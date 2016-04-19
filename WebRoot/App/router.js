/**
 * Created by duyu on 2016/4/19.
 */
var routes = {
    '/login': author,
    '/logout': [books, function() { console.log("An inline route handler."); }],
    '/books/view/:bookId': viewBook
};