import { defineStore } from "pinia";
import { ref } from "vue";

export const buttonStateStore = defineStore( 'buttonState', { 
    state: () => {
        return { bState: false, dState: false, eState: false, MState: false }
    },
    actions: {
        changeState( toggle ){
            if ( toggle == 'create' ){
                this.bState = !this.bState;
                console.log( `I'm a create button and my actual state is ${this.bState}`)
            }if ( toggle == 'details' ){
                this.dState = !this.dState;
                console.log( `I'm a show details button and my actual state is ${this.dState}`)

            }if ( toggle == 'edit' ){
                this.eState = !this.eState;
                console.log( `I'm a edit button and my actual state is ${this.eState}`)

            }if ( toggle == 'manage' ){
                this.MState = !this.MState;
                console.log( `Andamos en administrar ${this.eState}`)

            }
        }
    }
})

