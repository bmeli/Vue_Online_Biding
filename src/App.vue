<template>
  <div id="app">
    <div class="title">
      E-Bid
    </div>
    <BidForm />
  </div>
</template>

<script>
import BidForm from './components/BidForm.vue';

export default {
  name: 'app',
  components: {
    BidForm
  }
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
.title {
  font-size: 52px;
  font-family: 'Fredericka the Great', cursive;
  color: #20ecf7;
}
</style>
