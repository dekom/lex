var lex = angular.module('LeX', ['ngResource'])

// Create Wordnik interface
lex.factory('Wordnik', function($resource) {
  var baseUrl = 'http://api.wordnik.com/v4'
    , apiKey = 'd25b766254dd7337441237e86ca0f9460f6037ff7432ae240'
    , querySize = 5
    , wordnik = {}
    , params =  { api_key: apiKey
                , limit: querySize
                , callback: 'JSON_CALLBACK'
                }

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

  wordnik.keyMaps = { 'definitions' : ['text', 'partOfSpeech', 'attributionText']
                    , 'examples' : ['year', 'url', 'text']
                    , 'topExample' : wordnik.keyMaps.examples
                    , 'relatedWords' : ['words', 'relationshipType']
                    , 'pronunciations' : ['raw']
                    , 'audio' : ['duration', 'fileUrl', 'attributionText']
                    }

  wordnik.parse = { 'definitions' : function(object) {
                      var keys = ['text', 'partOfSpeech', 'attributionText']
                      return extractKeyValuePairs()
                    }
                  , 'examples' : function(object, size) {
                      size = size || querySize
                    }
                  , 'topExample' : function() {}
                  , 'relatedWords' : function() {}
                  , 'pronunciations' : function() {}
                  , 'etymologies' : function() {}
                  , 'audio' : function() {}
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
