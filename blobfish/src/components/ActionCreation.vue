<template>
    <div>
        <!-- This is a button toggling the modal -->
        <button
            class="uk-button uk-button-default uk-margin-small-right"
            type="button"
            uk-toggle="target: #Action-create-modal"
        >Add an Action</button>
        <!-- This is the modal -->
        <div id="Action-create-modal" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">Action Creation</h2>
                <form class="uk-form-stacked">
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Action Title</label>
                        <div class="uk-form-controls">
                            <input v-model="Title" class="uk-input" type="text" placeholder="Title">
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Summary</label>
                        <div class="uk-form-controls">
                            <textarea
                                class="uk-textarea"
                                type="text"
                                placeholder="Describe the Action and the reasoning for it"
                                v-model="Summary"
                            ></textarea>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Instructions</label>
                        <div class="uk-form-controls uk-flex uk-flex-middle">
                            <input
                                class="uk-textarea uk-margin-small-right"
                                type="text"
                                placeholder="what steps should be done to complete this Action"
                                v-model="step"
                            >
                            <button
                                class="uk-button uk-button-default uk-margin-small-right"
                                v-on:click="addStep"
                            >add</button>
                        </div>
                    </div>
                    <div v-if="Instructions.length">
                        <div v-for="(step, index) of Instructions">
                            <div class="uk-flex uk-flex-middle">
                                <div class="uk-margin-right" uk-icon="close" v-on:click="removeStep(index)"></div>
                                {{index+1}}) {{step}}
                                
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Add Some Instructions to Submit</p>
                    </div>
                </form>
                <p class="uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button
                        v-if="Instructions.length"
                        class="uk-button uk-button-primary uk-modal-close"
                        type="button"
                        v-on:click="submit"
                    >Submit</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import UIkit from 'uikit';
export default {
  props: ["issueid"],
  data: function() {
    return {
      Title: null,
      Summary: null,
      Instructions: [],
      step: null
    };
  },
  methods: {
    submit: function() {
      let payload = {
        title: this.Title,
        summary: this.Summary,
        instructions: this.Instructions,
        completed: false,
        issueId: this.issueid
      };
      let insertme = JSON.stringify(payload);
      let querystring = `https://jdomaga.lib.id/blobfish-backend/addaction/?payload=${insertme}`;
      console.log(querystring);
      UIkit.notification("Sucessfully Added!", 'success');
      axios.get(querystring).then(res => {
        console.log(res); 
      });
    },

    addStep: function() {
      this.Instructions.push(this.step);
      this.step = "";
    },

    removeStep: function(index) {
      this.Instructions.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.uk-button-primary,
.uk-button-default,
#Action-create-modal,
h2 {
  font-family: "Poppins", sans-serif;
}

.uk-button-primary {
  background-color: #f48fb1;
}
</style>