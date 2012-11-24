// Handles query to Wordnik API

function WordnikCtrl($scope, Wordnik) {
  var cache = {}

  // List of all the actions to be queried to Wordnik API
  $scope.actions = Object.keys(Wordnik.actions)
  $scope.results = {}

  // Queries Wordnik API for results
  $scope.search = function() {
    $scope.results = {}

    // Defaults to all possible defined actions.  Reference Wordnik.actions in
    // `/javascripts/app.js`
    $scope.actions.forEach(function(action) {
      var queryFn = Wordnik.q[Wordnik.actions[action]]
        , results = retrieveCache($scope.query) ||
                    queryFn(  { action: action
                              , word: $scope.query
                              , useCanonical: false
                              }
                              , function success() {
                                $scope.results[action] = Wordnik.parse(action, results)

                                console.log('Cache Miss')
                              }
                              , function error() {
                              }
      )
    })
  }

  function retrieveCache(query) {
    if (cache[query]) {
      console.log('Cache Hit')

      $scope.apply(function cacheToResults(scope) {
        scope.results = cache[query]
      })

      return true
    }
    else
      return false
  }
}

WordnikCtrl.$inject = ['$scope', 'Wordnik']
