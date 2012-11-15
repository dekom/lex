// Handles query to Wordnik API

function WordnikCtrl($scope, Wordnik) {
  $scope.search = function() {
    Wordnik.get({action: 'definitions', word: $scope.query}).
      success(function(data, status) {
        $scope.result = data
      })
  }
}

WordnikCtrl.$inject = ['$scope', 'Wordnik']
