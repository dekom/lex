// Handles query to Wordnik API

function WordnikCtrl($scope, Wordnik) {

  // Default action to 'definitions'
  $scope.action = 'definitions'
  $scope.actions = Object.keys(Wordnik.actions)

  // Default query word
  $scope.query = 'lexicon'

  $scope.search = function() {
    var results =
        Wordnik.q[Wordnik.actions[$scope.action]](
                              { action: $scope.action
                              , word: $scope.query
                              , useCanonical: true
                              }
                              , function success() {
                                  $scope.results = results
                                }
                              , function error() {
                              
                              }
    )
  }
}

WordnikCtrl.$inject = ['$scope', 'Wordnik']
