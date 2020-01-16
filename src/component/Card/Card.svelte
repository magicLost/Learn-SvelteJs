<style>

    .card{

        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);

        min-width: 275px;

        background-color: #fff;

        border-radius: 4px;

    }

    .actions{

        display: flex;
        padding: 8px;
        align-items: center;

    }


    .content{

        padding: 16px;

    }


    .textSecondary{
        color: rgba(0, 0, 0, 0.54);
    }

    .marginBottom{
        margin-bottom: 12px;
    }

</style>


<script>

    import {button_type} from "./../UI/Button/button_type";
    import Button from "./../UI/Button/Button.svelte";

    export let index = 0;
    export let onClick = null;


</script>

<div class={"card"}>

    <div class={"content"}>

        <p class={"textSecondary marginBottom"}>Word of the Day</p>

        <h2>Benevolent - { index }</h2>

        <p class={"textSecondary marginBottom"}>adjective</p>

        <p>
            well meaning and kindly.
            <br />
            "a benevolent smile"
        </p>

    </div>

    <div class={"actions"}>

        <Button label={"подробнее"} type={button_type.TEXT} onClick={onClick} />

    </div>

</div>