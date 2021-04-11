new Vue
({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    image: { url: ""},
    origin: "",
    name: "",
    life_span: "",
    temperament: "",
    description: ""
  },
  created(){
    this.loadNextImage();
  },
    methods:
    {
    async loadNextImage()
    {
      try{
        axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY"
        let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } )
        this.image = response.data[0]
        console.log(response.data) //Inspect to see what the endpoint is returning
        console.log("-- Image from TheCatAPI.com")
        console.log("id:", this.image.id)
        console.log("url:", this.image.url)
        this.loadNextBreed();
        }catch(err){
          console.log(err)
        }
      },
      async loadNextBreed()
      {
        let catBreed = ["siamese", "munchkin", "savannah", "scottish Fold", "norwegian Forest"];
        var selectedBreed = catBreed[Math.floor(Math.random() * 5)];
        console.log(selectedBreed);
          try{
            let response = await axios.get('https://api.thecatapi.com/v1/breeds/search?q=' + selectedBreed)
            this.origin = response.data[0].origin
            this.name = response.data[0].name
            this.life_span = response.data[0].life_span
            this.temperament = response.data[0].temperament
            this.description = response.data[0].description
            console.log(response.data[0])
            }
            catch(err){
              console.log(err)
          }
        },
        async loadNextDog()
        {
          try{
            axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY"
            let response = await axios.get('https://api.thedogapi.com/v1/images/search', { params: { limit:1, size:"full" } } )
            this.image = response.data[0]
            this.name = (response.data[0].breeds[0].name)
            this.life_span = (response.data[0].breeds[0].life_span)
            this.temperament = response.data[0].breeds[0].temperament
            this.origin = response.data[0].breeds[0].country_code
            this.description = response.data[0].breeds[0].bred_for
            console.log(response.data) //Inspect to see what the endpoint is returning
            console.log("-- Image from TheDogAPI.com")
            console.log("id:", this.image.id)
            console.log("url:", this.image.url)
            }catch(err){
              console.log(err)
            }
        }
    }
})
