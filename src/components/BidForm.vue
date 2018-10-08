<template>
  <div class="form-container">
    <p class="instruction"> Welcome to E-Bid! Begin by entering your name and amount.</p>
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
          <md-input v-model="money" type="number"></md-input>
          <md-icon>attach_money</md-icon>
        </md-field>
      </div>
    </div>
    <div class="lots-container">
      <p class="instruction">Select a lot</p>
    </div>
    <div class="lot-buttons">
      <md-button class="md-raised lot-button">Lot1</md-button>
      <md-button class="md-raised lot-button">Lot2</md-button>
      <md-button class="md-raised lot-button">Lot3</md-button>
    </div>
    <md-content class="bid-card">
      <div class="bid-info-left">
        <p class="amount-text">3400$</p>
        <p class="name-text">James Milner</p>
      </div>
      <div class="bid-info-right">
        <p class="lot-text">Lot1</p>
        <md-button class="md-primary submit-bid-button">Place Bid</md-button>
      </div>
    </md-content>
  </div>
</template>

<script>
export default {
  name: 'BidForm',
  data: () => ({
    money: null,
    name: '',
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .instruction {
    margin-top: 65px;
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
  }
  .lot-button {
    margin-right: 30px;
  }
  .bid-card {
    width: 600px;
    height: 150px;
    margin-top: 50px;
    box-shadow: 1px 1px 4px 0px #888888;
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
  }
  .bid-info-right {
    display: flex;
    flex-direction: column;
    float: right;
    margin-right: 25px;
    margin-top: 25px;
  }
  .lot-text {
    margin-top: 0;
    margin-bottom: 50px;
    font-size: 25px;
  }
</style>
