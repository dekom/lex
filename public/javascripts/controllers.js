// Handles query to Wordnik API

function WordnikCtrl($scope, Wordnik) {
  var cache = {}

  // List of all the actions to be queried to Wordnik API
  $scope.actions = Object.keys(Wordnik.actions)
  $scope.results = {}

  // Queries Wordnik API for results
  $scope.search = function() {

    // Cache hit
    if (cache[$scope.query]) {
      console.log('Cache Hit')
      $scope.results = cache[$scope.query]
      return
    }

    $scope.results = {}

    // Defaults to all possible defined actions.  Reference Wordnik.actions in
    // `/javascripts/app.js`
    $scope.actions.forEach(function(action) {
      var queryFn = Wordnik.q[Wordnik.actions[action]]
        , results = queryFn(  { action: action
                              , word: $scope.query
                              , useCanonical: false
                              }
                              , function success() {
                                console.log('Cache Miss')
                                $scope.results[action] = Wordnik.parse(action, results)
                              }
                              , function error() {
                                console.log('Error')
                              }
      )
    })

    cache[$scope.query] = $scope.results
  }
}

WordnikCtrl.$inject = ['$scope', 'Wordnik']
