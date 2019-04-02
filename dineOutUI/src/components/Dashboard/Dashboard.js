export default {
  name: 'Dashboard',
  data () {
    return {
      input: {
        keyword: '',
        location: '',
      },
      restaurants: [],
      history: []
    }
  },
  methods: {
    handleSearch (event) {
      this.$http.get(`http://localhost:5000/restaurants?query="${this.input.keyword} in ${this.input.location}"`)
        .then(response => {
          (this.restaurants = response.data.restaurants)
        })
    },
    handleLogout (event) {
      localStorage.removeItem('jwt');
      this.$router.push('/')

    },

    handleHistory () {
      console.log(localStorage.username)
      this.$http.get(`http://localhost:5000/users/${localStorage.getItem("username")}/restaurants`)
        .then(response => {
          this.history = response.data.restaurants
        })
    },

    handleVisit (name) {
      console.log(name)
      this.$http.post(`http://localhost:4000/users/${localStorage.getItem("username")}/restaurants/${name}/visit`)
    },

    handleLike (place_id) {
      this.$http.post(`http://localhost:4000/users/${localStorage.getItem("username")}/restaurants/${place_id}/like`)
        .then( () => {
          console.log(place_id);
          this.$http.post(`http://localhost:4000/restaurants/${place_id}/like`)});

    },

    handleDislike (place_id) {
      this.$http.post(`http://localhost:4000/users/${localStorage.getItem("username")}/restaurants/${place_id}/dislike`)
        .then( () => {
          console.log(place_id);
          this.$http.post(`http://localhost:4000/restaurants/${place_id}/dislike`)});
    }
  },
  beforeMount () {
    this.handleHistory()
  }
}
