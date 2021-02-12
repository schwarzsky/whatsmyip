<script>
export default {
    name: 'IPDetails',
    props: ['data', 'useragent']
}
</script>
<template>
  <section>
        <h2>{{this.$store.state.IP}}</h2>
        <section class="desc">
            <zi-description title="Country"><span>{{this.data.country_code + ' ' + this.data.country_name}}</span></zi-description>
            <zi-description title="Longitude/Latitude"><span><zi-code>{{this.data.latitude + '/' + this.data.longitude}}</zi-code></span></zi-description>
            <zi-description title="City"><span>{{this.data.city}}</span></zi-description>
            <zi-description title="ISP"><span>{{this.data.org}}</span></zi-description>
            <zi-description title="User Agent" style="width: 40%;"><span>{{this.useragent}}</span></zi-description>
        </section>
  </section>
</template>
<style scoped>
section {
    margin-left: 0px !important;
}
</style>