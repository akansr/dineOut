export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to dineOut',
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin (event) {
      event.preventDefault()
      if (this.input.password.length > 0) {
        this.$http.post('http://localhost:4000/login', {
          username: this.input.username,
          password: this.input.password
        })
          .then(response => {
            console.log(this.input.username);
            localStorage.setItem('username', this.input.username)
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
