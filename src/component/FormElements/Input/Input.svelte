
<style>

    .wrapper{
        width: 100%;
        box-sizing: border-box;

        margin-bottom: 12px;

        font-size: 1rem;
          font-weight: 400;
          text-align: left;

          line-height: 1;

          letter-spacing: 0.009em;
    }

    label{
         display: block;
            padding: 0;

            font-size: 0.95rem;

            color: rgba(0,0,0,0.54);
    }

    input{
       outline: none;

           text-align: left;
           color: black;

           border-top: 0;
           border-left: 0;
           border-right: 0;
           border-bottom: 1px solid #00000081;


           background-color: white;
           font: inherit;
           padding: 6px 0 7px;
           display: block;
           width: 100%;
           box-sizing: content-box;
    }

    input:focus{
        outline: none;
        border-bottom: 2px solid rgba(0, 0, 0, 0.849);
    }

    .inputError{
        border-bottom: 2px solid red;
    }
    .inputError:focus{
        border-bottom: 2px solid red;
    }

    .error{
        color: red;
            /* padding-left: 8px; */
            padding-top: 5px;

            font-size: 0.85rem;
            font-weight: 400;
    }

</style>

<script>

    import { beforeUpdate } from 'svelte';
    import {validate} from './../../../helper/Validate'

	beforeUpdate(() => {
		console.log('Input ' + elementAttrs.name + ' is about to update');
	});


    export let value = '';
    export let error = '';
    
    export let elementAttrs = null;
    export let labelValue = 'readonly';
    export let validationRules = {};

    const onChange = (event) => {

        event.preventDefault();
        event.stopPropagation();

        value = event.target.value;

        if(value !== ''){

            error = validate(value, validationRules);
            //console.log(error);

        }else{

            error = '';

        };

    };
    //class:inputError="{error !== ''}"

    $: inputClass = error !== '' ? "inputError" : '';

</script>


 <div class="wrapper" >

            <label htmlFor={elementAttrs.id}>{labelValue}</label>

            <input
                {...elementAttrs}
                value={value}
                on:input={onChange}
                class={inputClass}
            />

            {#if error !== ''}

                <div class={"error"}>
                    <p>{error}</p>
                </div>
            
            {/if}

 </div>