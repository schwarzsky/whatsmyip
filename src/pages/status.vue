<script>
import Mapbox from 'mapbox-gl'
import {MglMap, MglMarker} from 'vue-mapbox'
import mapPin from '@geist-ui/vue-icons/packages/map-pin'

const isIp = require('is-ip')
import IPDetails from '../components/IPDetails.vue'

export default {
    name: 'Status',
    components: {
      MglMap, MglMarker, mapPin, IPDetails
    },
    mounted(){
      let ip = this.$store.state.IP;

      //navigator.geolocation.getCurrentPosition(function(data){
      //  console.log(data.coords.longitude)
      //  this.location.push(data.coords.latitude);
      //  this.location.push(data.coords.longitude);
      //})

      if(!isIp(ip)){
        this.$router.push('/');
      } else {
        this.ip = ip;

        this.axios.get(`https://ipapi.co/${ip}/json/`).then((response) => {
          console.log(response.data);

          this.location.push(response.data.longitude);
          this.location.push(response.data.latitude);

          this.data = response.data;
        })
      }

      this.setMapTheme();
    },
    created(){
      this.mapbox = Mapbox;
    },
    data(){
        return{
            info: 'with my IP →',
            ip: '',
            token: 'pk.eyJ1Ijoic2Nod2FyenNreSIsImEiOiJjazZrcHQycHgwNmJjM21wYjRiZ2FqdmZqIn0.1CHnOJmojDqNnlouN2GeUQ',
            mapStyle: 'mapbox://styles/schwarzsky/ckkxhddjr0jm317od0ln65kzc',
            location: [],
            data: '',
            userAgent: navigator.userAgent,
            theme: localStorage.getItem('theme')
        }
    },
    methods: {
      async onMapLoaded(event){
        const asyncActions = event.component.actions

        await asyncActions.flyTo({
          center: this.location,
          zoom: 10,
          speed: 1
        })
      },
      setMapTheme(){
        if(this.theme == 'light'){
          this.mapStyle = 'mapbox://styles/schwarzsky/ckkxhddjr0jm317od0ln65kzc';
        } else if(this.theme == 'dark'){
          this.mapStyle = 'mapbox://styles/schwarzsky/ck6l2jyev130n1irtqdx43erm';
        }
      }
    }
}
</script>
<template>
  <zi-grid container justify="center" :spacing="0">
      <zi-grid class="text" :xs="24" :sm="24" :xl="12">
        <section>
          <IPDetails :data="this.data" :useragent="this.userAgent"/>
        </section>
        <section class="sign">&lt;/3&gt; schwarzsky, open source at <a href="https://github.com/schwarzsky/whatsmyip" target="_blank">github</a></section>
      </zi-grid>
      <zi-grid class="map" :xs="24" :sm="24" :xl="12">
          <MglMap
            :mapboxGl="Mapbox"
            :accessToken="token"
            :mapStyle.sync="mapStyle"
            @load="onMapLoaded"
          >
            <MglMarker :coordinates="location">
              <mapPin/>
            </MglMarker>
          </MglMap>
      </zi-grid>
  </zi-grid>
</template>
<style>
.text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

.text section {
    margin-left: 5vw;
}

.text .sign {
  position: absolute;
  bottom: 2.5vh;
}

.desc {
  margin-left: 0px !important;
}

.desc * {
  margin-top: 2vh;
}

@media screen and (max-width: 649px) and (min-width: 0px) {
  .text {
      height: 60vh;
  }

  .map {
      height: 40vh;
  }
}

@media screen and (max-width: 1919px) and (min-width: 650px) {
  .text {
      height: 60vh;
  }

  .map {
      height: 40vh;
  }
}

@media screen and (min-width: 1920px) {
  .text {
      height: 100vh;
  }

  .map {
      height: 100vh;
  }
}

</style>