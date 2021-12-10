<template>
  <div>
    
  </div>
</template>

<script>
export default {
  layout: 'clear',
  created(){
    if(this.$store.getters['login/me']){
      if(this.$store.getters['login/me'].tipo == 'M')
        this.$router.push('/medico/info')
      else
        this.$router.push('/medico')
    } else
      this.$router.push('/login')
  }
}
</script>

<style>

</style>
