// import Raven from 'raven-js';


function init() {
    //need to create account with sentry server to log errors
    // Raven.config('https://053............@sentry.io/12....', {
    //     release: '1-0-0',
    //     environment: 'development-test'
    // }).install()

}

function log(error) {
    console.log(error)
    // Raven.captureException(error)
}


export default { init, log }