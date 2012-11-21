// #LeX#
// The personal vocabulary builder
//
// LeX is a lightweight web application (and browser plugin) to help in
// building one's vocabulary from scratch.  It aims to allow users to easily
// search for words and optionally save the word and its discovery context.

var lex = angular.module('LeX', ['ngResource'])

// ##The Wordnik Interfact
//
// LeX does not store its own vocabulary database.  It instead uses the JSON
// API interface provided by [Wordnik Developers](http://developer.wordnik.com/)
//
// This creates a resourceful interface for querying the Wordnik API (though
// it can argued that it should not treated as a resource at all.)
lex.factory('Wordnik', function($resource) {
  var baseUrl = 'http://api.wordnik.com/v4'
    , apiKey = 'd25b766254dd7337441237e86ca0f9460f6037ff7432ae240'
    , querySize = 5
    , wordnik = {}
    , params =  { api_key: apiKey           // common query parameters
                , limit: querySize
                , callback: 'JSON_CALLBACK'
                }
    , exampleKeys = ['year', 'url', 'text'] // topExample is a singleton from examples

  // Default list of possible queries and the resource method they need to
  // call.  The difference between 'get' and 'query' is that 'query' returns
  // an array, while 'get' returns an object
  wordnik.actions = { 'examples' : 'get'
                    , 'definitions' : 'query'
                    , 'topExample' : 'get'
                    , 'relatedWords' : 'query'
                    , 'pronunciations' : 'query'
                    //, 'etymologies' : 'query'
                    , 'audio' : 'query'
                    }

  // The querying interface that assists in communicating with Wordnik API
  wordnik.q =
          $resource(
                    baseUrl + '/word.json/:word/:action'
                    , {}
                    , { get:  { method: 'JSONP'
                              , params: params
                              }
                      , query:  { method: 'JSONP'
                                , params: params
                                , isArray: true
                                }
                      }
                    )

  // A mapping between query parameters (:action) and important attributes to
  // extract
  wordnik.keyMaps = { 'definitions' : ['text', 'partOfSpeech', 'attributionText']
                    , 'examples' : exampleKeys
                    , 'topExample' : exampleKeys
                    , 'relatedWords' : ['words', 'relationshipType']
                    , 'pronunciations' : ['raw']
                    , 'audio' : ['duration', 'fileUrl', 'attributionText']
                    }

  // Function used to parse the query result down to only the necessary
  // information based on keyMaps
  wordnik.parse = function(action, result) {
    var results = result
      , parsed = []

    // Result from topExample and examples query is an object instead of an
    // array.  Because there are many more array results, I've decided to
    // stupidly wrap the example results with an array.
    if (action === 'topExample') {
      results = [result]
    } else if (action === 'examples') {
      results = result[action]
    }

    // Given an array, loop their every element `res` and extract the useful
    // information, based on keyMaps, into the returned object
    results.forEach(function(res) {
      var obj = {}

      wordnik.keyMaps[action].forEach(function(key) {
        obj[key] = res[key]
      })

      parsed.push(obj)
    })

    return parsed
  }

  // Helper function

  // Extract Key Value Pairs
  // Given an object and a set of keys, return an array with only those set of
  // keys
  function extractKeyValuePairs(array, keys) {
    var result = []

    for (var key in keys)
      result.push({key: array[key]})

    return result
  }

  return wordnik
})
