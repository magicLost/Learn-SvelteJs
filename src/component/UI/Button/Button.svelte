<style>

    .btn {

        font: inherit;
        position: relative;

        padding: 6px 8px;
        margin-right: 7px;

        box-sizing: border-box;

        border-radius: 4px;

        line-height: 1.75;
        text-transform: uppercase;
        font-weight: 500;

        cursor: pointer;


        overflow: hidden;

    }

    .label{
        font: inherit;
        font-weight: 700;
    }

    .btn--text{
        border: 0;

        background-color: transparent;
    }

    .btn--outlined{
        color: rgba(33, 150, 243, 0.5);

        border: 1px solid rgba(33, 150, 243, 0.5);

        background-color: transparent;
    }

    .btn--contained{
         color: #fff;

        border: 0;

        box-shadow: 0 1px 5px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);;

        background-color: #2196f3;

    }


</style>


<script>

    import {button_type} from './button_type';

    export let label = "";
    export let type = '';
    export let style = '';
    export let onClick = null;
    export let disabled = false;


    let buttonClasses = 'btn';

    switch(type){

        case button_type.TEXT: buttonClasses += ' ' + "btn--text";break;
        case button_type.OUTLINED: buttonClasses += ' ' + "btn--outlined";break;
        case button_type.CONTAINED: buttonClasses += ' ' + "btn--contained";break;

        default:
            console.error("Bad button type " + type);
            buttonClasses += ' ' + "btn--text";
            break;
    }

</script>


    <button

        class={buttonClasses}
        on:click={onClick}
        disabled={disabled}
        style={style}
    >
        <span class=".label">{ label }</span>
    </button>