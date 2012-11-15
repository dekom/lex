'use strict'
angular.module('LeX', ['ngResource']).
  factory('Wordnik', function($resource) {
    var baseUrl = 'http://api.wordnik.com/v4'
      , apiKey = 'd25b766254dd7337441237e86ca0f9460f6037ff7432ae240'
      , querySize = 5

    return  $resource(baseUrl + '/word.json/:word/:action',
                      {}, {
                            get:  {
                                    method: 'JSONP',
                                    params: {
                                              api_key: apiKey,
                                              callback: 'JSON_CALLBACK'
                                            }
                                  }
                          }
                      )
  })
