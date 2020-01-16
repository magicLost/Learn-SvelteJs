
<style>

    .form{
        width: 100%;
        min-width: 300px;
        height: 100%;

        overflow-y: auto;
    }

    .formElements{

        width: 100%;

        margin: 30px auto 40px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;

     }

    .formElementsButtons{
        display: flex;
        justify-content: center;
        padding-top: 20px;
    }

    @media(min-width: 900px){

        .form{
            padding-right: 3%;
            padding-left: 3%;
            width: 94%;
        }

        
    }

      /* .form-elements__form-error {

        padding: 10px;
        color: red;
        text-align: justify;
        text-indent: 12px;

      } */


</style>


<script>

    import RenderElements from './RenderElements.svelte';
    import Button from './../../component/UI/Button/Button.svelte';
    import { button_type } from './../../component/UI/Button/button_type';

    export let elements = null;

    let values = [];
    let data = '';

    const initValues = () => {

        for(let i in elements){
            values[i] = {
                [elements[i].elementAttrs.name]: {
                    value: '',
                    error: ''
                }
            };
        }

    };



    //EVENT LISTENER
    const onSubmit = (event) => {

        event.stopPropagation();

        console.log(values);

        let result = '';

        for(let i in values){

            for(let elem in values[i]){

                result += ' | ' + elem + ": - value - " + values[i][elem].value + " ; - error - " + values[i][elem].error + '; ';

            }


        }

        data = result;

    };

    const onClearButtonClick = (event) => {

        event.preventDefault();
        event.stopPropagation();

        initValues();

    };


    //RENDER
    initValues();



</script>


 <form action={""} class={"form"} on:submit|preventDefault={onSubmit}>

    <div class={'formElements'}>
    
        <RenderElements elements={elements} bind:values />

        <br />

        {#if data !== ''}
        
            <p style="text-align: center;">{ data }</p>

        {/if}

        <br />

        <div class={"formElementsButtons"}>

            <Button label={"Очистить"} type={button_type.TEXT} disabled={false} onClick={onClearButtonClick} />            
            <Button label={"Отправить"} type={button_type.TEXT} disabled={false} style={"color: #cdff9f;"} />            
        
        </div>    
    
    </div> 

</form>