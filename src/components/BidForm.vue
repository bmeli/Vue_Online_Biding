<template>
  <div class="form-container">
    <p class="instruction"> Welcome to E-Bid! Begin by selecting a lot.</p>
    <div class="lot-buttons">
      <md-button class="md-raised lot-button" v-for="lot in lots" v-bind:class="{'md-primary': (lot === selectedLot)}" v-on:click="lotSelected(lot)">
        {{ lot }}
      </md-button>
    </div>
    <div class="lots-container">
      <p class="instruction">Enter your name and amount</p>
      <div class="input-fields">
        <div class="input-amount">
          <md-field>
            <label>Name</label>
            <md-input v-model="name"></md-input>
            <md-icon>person</md-icon>
          </md-field>
        </div>
        <div class="input-amount">
          <md-field>
            <label>Amount</label>
            <md-input v-model="amount" type="number"></md-input>
            <md-icon>attach_money</md-icon>
          </md-field>
        </div>
      </div>
    </div>
    <md-content class="bid-card">
      <div class="bid-info-left">
        <p class="amount-text">{{amount}}$</p>
        <p class="name-text">{{name}}</p>
        <p class="top-bidder-text">Top bidder in {{selectedLot}}</p>
        <div v-bind:style="{'width': `320px`, 'border-bottom': `1px solid grey`, 'padding-bottom': `5px`}">
          <p class="top-bidder-name">{{ topBidderName }}</p>
          <p class="top-bidder-amount">{{ topBidderAmount }}$</p>
        </div>
      </div>
      <div class="bid-info-right">
        <p class="lot-text">{{selectedLot}}</p>
      </div>
      <md-button class="md-primary submit-bid-button" v-bind:disabled="enableSubmitBtn" v-on:click="addBid">Place Bid</md-button>
    </md-content>
    <br/>
    </br/>
    <md-snackbar :md-position="position" :md-active.sync="showSnackbar" md-persistent>
      <span>{{ snackbarMsg }}</span>
      <md-button class="md-primary" @click="viewBids">View Bids</md-button>
    </md-snackbar>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
  name: 'BidForm',
  data: () => ({
    lots: [
      "Lot1",
      "Lot2",
      "Lot3"
    ],
    amount: null,
    name: '',
    selectedLot: '',
    topBidderName: '',
    topBidderAmount: null,
    showSnackbar: false,
    snackbarMsg: '',
    position: 'left',
  }),
  computed: {
    enableSubmitBtn: function () {
      return ((this.amount === null || this.amount < 0) || this.name === '' || this.selectedLot === '')
    }
  },
  methods: {
    lotSelected: function (lot) {
      this.selectedLot = lot;
      fb.db.collection(lot).get()
      .then((querySnapshot) => {
        const bids = [];
        querySnapshot.forEach(doc => bids.push(doc.data()));
        const topBider = bids.reduce(this.getHighestBid, {name: '', amount: null});
        this.topBidderName = topBider.name;
        this.topBidderAmount = topBider.amount;
      })
      .catch((error) => {
          console.log("Error fetching lot bids")
      });
    },
    addBid: function () {
      fb.db.collection(this.selectedLot).add({
        name: this.name,
        amount: this.amount,
      }).then((docRef) => {
          this.snackbarMsg = this.name + "'s bid successfully added!"
      })
      .catch((error) => {
          this.snackbarMsg = "Error adding bid!"
      });
      this.showSnackbar = true
    },
    getHighestBid: function (maxBid, currBid) {
      return maxBid.amount < currBid.amount ? currBid : maxBid;
    },
    viewBids: function () {
      this.$emit('toggleView')
      this.showSnackbar = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {

  }
  .instruction {
    margin-top: 50px;
    font-size: 22px;
    font-family: 'Yantramanav', sans-serif;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .input-fields {
    display: flex;
    flex-direction: row;
    margin-top: 32px;
  }
  .input-amount {
    width: 200px;
    margin-right: 30px;
  }
  .lot-buttons {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 10px
  }
  .lot-button {
    margin-right: 30px;
  }
  .bid-card {
    width: 450px;
    height: 250px;
    margin-top: 50px;
    box-shadow: 1px 1px 4px 0px #141414;
    border-radius: 3px;
  }
  .bid-info-left {
    display: flex;
    flex-direction: column;
    float: left;
    margin-left: 25px;
    margin-top: 25px;
  }
  .amount-text {
    font-size: 25px;
    margin-top: 0;
    margin-bottom: 10px;
    padding-left: 0;
    text-align: left;
  }
  .name-text {
    font-size: 15px;
    color: #adadad;
    margin-top: 0;
    text-align: left
  }
  .bid-info-right {
    display: flex;
    flex-direction: column;
    float: right;
    margin-right: 30px;
    margin-top: 25px;
  }
  .lot-text {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 25px;
  }
  .submit-bid-button {
    clear: both;
    float: right;
    margin-right: 25px;
    margin-top: 28px;
  }
  .top-bidder-text {
    font-size: 15px;
    margin-bottom: 5px;;
    text-align: left;
  }
  .top-bidder-name {
    font-size: 15px;
    color: #adadad;
    text-align: left;
    float: left;
    margin-top: 6px;
    margin-bottom: 0;
  }
  .top-bidder-amount {
    font-size: 15px;
    color: #adadad;
    float: right;
    margin-top: 6px;
    margin-bottom: 0;
  }
</style>
