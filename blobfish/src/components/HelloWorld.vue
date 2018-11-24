<template>
  <div class="hello">
    <button v-on:click="makeCall">Make STDLIB Call</button>
    <p>{{result}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      result: "i"
    }
  },
  methods: {
    makeCall: function() {
      var self = this;
      axios.get("https://jdomaga.lib.id/blobfish-backend/accountcreate/?username=Jimmy&password=trent")
      .then(function(res) {
        console.log(res);
        self.result = res.data;
      })
      .catch(function(err) {

      });
      
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
