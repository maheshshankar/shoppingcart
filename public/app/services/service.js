app.factory('AuthService', function($http, $q) {
    var service = {};
    var deferred = $q.defer();
    service.checkAuth = function(credentials) {
        $http.post('/api/login', credentials)
            .success(function(data) {
                //console.log(data);
                deferred.resolve(data);
            })
            .error(function(data) {
                //console.log('not found....!');
                deferred.reject(data);
            })
        return deferred.promise;
    }
    return service;
});
