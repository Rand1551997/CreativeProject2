new Vue
({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        image: { url: ""}
    },
    created(){
        this.loadNextImage();
    } ,
    methods:
    {
        async loadNextImage()
        {
          try{
            axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY"
            let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } )
            this.image = response.data[0]
              console.log("-- Image from TheCatAPI.com")
              console.log("id:", this.image.id)
              console.log("url:", this.image.url)
            }catch(err){
              console.log(err)
            }
        }
    }
})
