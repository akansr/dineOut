export default {
  name: 'Register',
  data () {
    return {
      msg: 'Register',
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleRegister (event) {
      event.preventDefault()
      if (this.input.password.length > 0) {
        this.$http.post('http://localhost:4000/register', {
          username: this.input.username,
          password: this.input.password
        })
          .then(response => {
            console.log(response);
            localStorage.setItem('username', JSON.stringify(this.input.username))
            localStorage.setItem('jwt', response.data.token)
            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
              } else {
                this.$router.push('Dashboard')
              }
            }
          })
          .catch(function (error) {
            console.error(error.response)
          })
      }
    }
  }
}
