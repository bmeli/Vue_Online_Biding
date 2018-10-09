<template>
  <div id="app">
    <div class="title">
      E-Bid
      <md-icon class="md-size-2x gavel-icon">gavel</md-icon>
    </div>
    <div class="menu-btn">
      <md-speed-dial :class="topPosition" md-direction="bottom">
        <md-speed-dial-target class="md-primary">
          <md-icon>menu</md-icon>
        </md-speed-dial-target>

        <md-speed-dial-content>
          <md-button class="md-icon-button" v-on:click="showAddBid">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="bottom">Add Bid</md-tooltip>
          </md-button>

          <md-button class="md-icon-button" v-on:click="showAllBids">
            <md-icon>home</md-icon>
            <md-tooltip md-direction="bottom">All Bids</md-tooltip>
          </md-button>
        </md-speed-dial-content>
      </md-speed-dial>
    </div>
    <BidForm v-show="addBidVisible" v-on:toggleView="showAllBids"/>
    <AllBids v-if="allBidsVisible" />
  </div>
</template>

<script>
import BidForm from './components/BidForm.vue'
import AllBids from './components/AllBids'
const fb = require('./firebaseConfig.js')

export default {
  name: 'app',
  components: {
    BidForm,
    AllBids,
  },
  data() {
    return {
      topPosition: 'md-top-right',
      allBidsVisible: false,
      addBidVisible: true,
    }
  },
  methods: {
    showAllBids: function() {
      this.allBidsVisible = true
      this.addBidVisible = false
    },
    showAddBid: function() {
      this.addBidVisible = true
      this.allBidsVisible = false
    }
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
.menu-btn {
  position: relative;
  right: 70px;
  top: -60px;
}
.gavel-icon {
  position: relative;
  bottom: 9px;
  right: 9px;
  color: #20ecf7 !important;
}
</style>
