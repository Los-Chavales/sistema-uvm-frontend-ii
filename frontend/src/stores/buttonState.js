import { defineStore } from "pinia";

export const buttonStateStore = defineStore( 'buttonState', { 
    state: () => {
        return { bState: false, dState: false, eState: false, MState: false, M2State: false, periodTable: false }
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
                console.log( `Andamos en administrar ${this.MState}`)
            }if ( toggle == 'manage2' ){
                this.M2State = !this.M2State;
                console.log( `Andamos en administrar 2 ${this.M2State}`)
            }
            if ( toggle == 'periodTable' ){
                this.periodTable = !this.periodTable;
                console.log( `Andamos en periodos tabla ${this.periodTable}`)
            }
        }
    }
})

