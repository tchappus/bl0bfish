<template>
    <div>
        <!-- This is a button toggling the modal -->
        <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #modal-example">Submit an Issue</button>

        <!-- This is the modal -->
        <div id="modal-example" uk-modal >
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">Issue Identification</h2>

                <form class="uk-form-stacked">

                    <div class="uk-margin"> 
                        <label class="uk-form-label" for="form-stacked-text">Title</label>
                        <div class="uk-form-controls">
                            <input v-model="Title" class="uk-input" type="text" placeholder="Title">
                        </div>
                    </div>

                    <div class="uk-margin"> 
                        <label class="uk-form-label" for="form-stacked-text">Severity</label>
                        <div class="uk-form-controls">
                            <select class="uk-select" v-model="Severity">
                                <option>Low</option>
                                <option>Normal</option>
                                <option>High</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                    </div>

                    <div class="uk-margin"> 
                        <label class="uk-form-label" for="form-stacked-text">Must Complete By</label>
                        <div class="uk-form-controls">
                            <select class="uk-select" v-model="CompletionDate">
                                <option>This week</option>
                                <option>This Month</option>
                                <option>Next 3 Months</option>
                                <option>Next 6 Months</option>
                                <option>This Year</option>
                                <option>Next Year</option>
                                <option>Next 2 Year</option>
                                <option>Next 5 Year</option>
                            </select>
                        </div>
                    </div>

                    <div class="uk-margin"> 
                        <label class="uk-form-label" for="form-stacked-text">Summary</label>
                        <div class="uk-form-controls">
                            <textarea class="uk-textarea" type="text" placeholder="Describe the Issue" v-model="Summary"></textarea>
                        </div>
                    </div>

                    <div class="uk-margin"> 
                        <label class="uk-form-label" for="form-stacked-text">Completion Goals</label>
                        <div class="uk-form-controls">
                            <textarea class="uk-textarea" type="text" placeholder="Define what the solution would look like" v-model="CompletionGoals"></textarea>
                        </div>
                    </div>

                </form>
                <p class="uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button class="uk-button uk-button-primary uk-modal-close" type="button" v-on:click="suberino">Submit</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import UIkit from 'uikit';
    export default {
        name: "jimmer",
        data: function(){
            return{
                    Title: null,
                    Severity: null,
                    CompletionDate: null,
                    Summary: null,
                    CompletionGoals: null
                };
        },
        methods: {
            suberino: function (){
                let payload = {
                    title: this.Title,
                    severity: this.Severity,
                    completionDate: this.CompletionDate,
                    summary: this.Summary,
                    completionGoals: this.CompletionGoals,
                    actions: [],
                    author: localStorage.username
                }
                let insertme = JSON.stringify(payload);
                let querystring = `https://jdomaga.lib.id/blobfish-backend/issuecreate/?payload=${insertme}`
                console.log(querystring);
                axios.get(querystring)
                    .then((res)=>{
                        UIkit.notification("Sucessfully Added!", 'success');
                        console.log(res.data); 
                    });
            }
        }
    }
</script>
<style scoped>

.uk-button-primary, .uk-button-default, #modal-example, h2 {
    font-family: "Poppins", sans-serif;
}

.uk-button-primary {
    background-color: #f48fb1;
}

</style>