<script>
import sun from '@geist-ui/vue-icons/packages/sun'
import moon from '@geist-ui/vue-icons/packages/moon'
const isIp = require('is-ip');

import GeistUI from '@geist-ui/vue'

export default {
    name: 'Main',
    data(){
        return{
            info: 'with my IP →',
            ipaddr: JSON.parse(localStorage.getItem('store')).IP,
            isValid: 1,
            theme: localStorage.getItem('theme')
        }
    },
    mounted(){
        this.set();

        if(this.theme == 'dark' || this.theme == 'light'){
            console.log('Theme already initted')
            this.initTheme(this.theme)
        } else {
            localStorage.setItem('theme', 'light')
        }

       
    },
    components: {sun, moon},
    methods: {
        onInputChange(){
            if(this.ipaddr == this.$store.state.IP){
                this.info = 'with my IP →'
                this.isValid = 1;
            } else if(this.ipaddr === '127.0.0.1' || this.ipaddr === '192.168.1.1'){
                this.info = "you must enter a valid IP adress."
                this.isValid = 0;
            } else if(!isIp(this.ipaddr)){
                this.info = "you must enter a valid IP adress."
                this.isValid = 0;
            } else if(isIp(this.ipaddr)){
                this.info = 'with input IP →'
                this.isValid = 1;
            }
        },
        set(){
            fetch('https://api.ipify.org?format=json')
            .then(x => x.json())
            .then(({ ip }) => {
                this.$store.commit('set', ip)
            });
        },
        submit(){
            if(!isIp(this.ipaddr)){
                this.info = 'You must enter a valid IP adress.'
            } else {
                this.$store.commit('set', this.ipaddr);
                this.$router.push({path: '/status'})
            }
        },
        changeColorMode(){
            let theme = localStorage.getItem('theme')

            if(theme == 'light'){
                GeistUI.theme.enableDark();
                localStorage.setItem('theme', 'dark')
                this.theme = 'dark';
            } else if(theme == 'dark'){
                GeistUI.theme.enableLight();
                localStorage.setItem('theme', 'light')
                this.theme = 'light';
            }
        },
        initTheme(localtheme){
            if(localtheme == 'light'){
                GeistUI.theme.enableLight()
            } else if(localtheme == 'dark'){
                GeistUI.theme.enableDark()
            }
        }
    }
}
</script>
<template>
  <zi-grid container justify="center" :spacing="0">
      <zi-grid class="input" :xs="24" :sm="24" :xl="12">
         <section class="mode">
             <zi-button class="auto abort medium" style="display: flex; align-items: center; justify-content: center;" v-if="this.theme == 'dark'">
                <sun v-on:click="changeColorMode"/>
             </zi-button>
             <zi-button class="auto abort medium" style="display: flex; align-items: center; justify-content: center;" v-if="this.theme == 'light'">
                <moon v-on:click="changeColorMode"/>
             </zi-button>
         </section>
         <section class="log">
              <h2>IP Adress:</h2>
              <zi-input size="big" v-on:change="onInputChange" v-model="ipaddr" placeholder="192.168.1.1" style="width: 25% !important;"/>
          </section>
          <section class="go">
              <zi-button type="disabled" v-if="this.isValid == 0" v-on:click="submit">Continue</zi-button>
              <zi-button type="success" v-if="this.isValid == 1" v-on:click="submit">Continue</zi-button> <p>{{info}}</p>
          </section>
      </zi-grid>
      <zi-grid class="map" :xs="24" :sm="24" :xl="12">
          <p>🗺️</p>
      </zi-grid>
  </zi-grid>
</template>
<style>
.input {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
}

.input section {
    margin-left: 5vw;
}

.map {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    background-color: var(--accents-2);
}

.go {
    display: flex;
    align-items: center;
    margin-bottom: 2.5vh;
}

.go p {
    font-size: 13px;
    color: #c9c8c7;
    margin-left: 2.5vh;
}

.mode {
    cursor: pointer;
    margin-top: 2.5vh;
}

@media screen and (max-width: 649px) and (min-width: 0px) {
  .input {
      height: 60vh;
  }

  .map {
      height: 40vh;
  }
}

@media screen and (max-width: 1919px) and (min-width: 650px) {
  .input {
      height: 60vh;
  }

  .map {
      height: 40vh;
  }
}

@media screen and (min-width: 1920px) {
  .input {
      height: 100vh;
  }

  .map {
      height: 100vh;
  }
}

</style>