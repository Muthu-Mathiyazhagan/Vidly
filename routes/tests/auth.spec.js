const { signInUserPostApi } = require('../auth')
let req = {
  body: {
    "email": "spain@usa.ca",
    "password": "p@ssw0rd"
}
}

describe('signInUserPostApi', () => {
  it('init call!', () => {
    signInUserPostApi(req, {})
  })
})
