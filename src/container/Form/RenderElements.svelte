

<script>
    import { element_type } from "./element_type";
    import Input from './../../component/FormElements/Input/Input.svelte';

    export let values = [];//{ name: {value: '', error: ''}}
    export let elements = {};//

    console.log("render values", values);

    //bind:value={values[element.elementAttrs.id]}

</script>


{#each elements as element, index (element.elementAttrs.id)}


    {#if element.elementType === element_type.INPUT}
    
        <Input 
            elementAttrs={element.elementAttrs} 
            labelValue={element.labelValue}  
            validationRules={element.validationRules}
            bind:value={values[index][element.elementAttrs.name].value}
            bind:error={values[index][element.elementAttrs.name].error}
        />

    {:else if  element.elementType === element_type.TEXTAREA}

        <em>Textarea...</em>

    {:else if  element.elementType === element_type.SELECT}

        <em>Select...</em>

    {:else}

        <em>Bad element type...</em>

    {/if}

{/each}