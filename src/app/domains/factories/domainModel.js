angular.module('proton.domains')
.factory('domainModel', ($rootScope, domainApi) => {
    let domains = [];
    function get() {
        return domains;
    }
    function set(newDomains) {
        domains = newDomains;
    }
    function fetch() {
        return domainApi.query()
        .then(({ data = {} } = {}) => {
            if (data.Code === 1000) {
                domains = data.Domains;
                return data.Domains;
            }
            throw new Error(data.Error || 'Domain request failed');
        });
    }
    function clear() {
        domains = [];
    }
    $rootScope.$on('deleteDomain', (event, ID) => {
        const index = _.findIndex(domains, { ID });

        if (index > -1) {
            domains.splice(index, 1);
            $rootScope.$emit('domainsChange', domains);
        }
    });
    $rootScope.$on('createDomain', (event, ID, member) => {
        const index = _.findIndex(domains, { ID });

        if (index === -1) {
            domains.push(member);
        } else {
            _.extend(domains[index], member);
        }
        $rootScope.$emit('domainsChange', domains);
    });
    $rootScope.$on('updateDomain', (event, ID, member) => {
        const index = _.findIndex(domains, { ID });

        if (index === -1) {
            domains.push(member);
        } else {
            _.extend(domains[index], member);
        }
        $rootScope.$emit('domainsChange', domains);
    });
    return { get, set, fetch, clear };
});
