// Handles query to Wordnik API

function WordnikCtrl($scope, Wordnik) {
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
        , results = queryFn(  { action: action
                              , word: $scope.query
                              , useCanonical: true
                              }
                              , function success() {
                                $scope.results[action] = Wordnik.parse(action, results)
                              }
                              , function error() {
                              }
      )
    })
  }
}

WordnikCtrl.$inject = ['$scope', 'Wordnik']
