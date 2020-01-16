
<style>

    .carousel{
        touch-action: pan-y;
        width: 100%;
    }

    .items-list{
        width: 100%;
        margin: auto;

        /* overflow: hidden;
        border: 1px solid black; */

        list-style: none;

        display: flex;
    }

    


</style>

<script>

    import { beforeUpdate } from 'svelte';
    import CalcOpacity from "./Helper/calcOpacity";

    beforeUpdate(() => {
		console.log('the Carousel is about to update');
	});


    //export let items = [];
    //export let Item = [];
    //export let activeIndex = 0;
    export let increaseActiveIndex = null;
    export let decreaseActiveIndex = null;


    const calc = new CalcOpacity();
    export let opacity = 1;
    export let isTranslated = false;



    const onMouseDown = (event) => {

        event.preventDefault();
        event.stopPropagation();

        calc.onPointerDown(event.pageX, event.pageY);

        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseup', onMouseUp, false);

    };

    const onMouseMove = (event) => {

        console.log("onMouseMove", calc);

        event.preventDefault();
        event.stopPropagation();

        const pageX = event.pageX;
        const pageY = event.pageY;

        calc.onPointerMove(pageX, pageY);

        if(!calc.isYScroll){
            isTranslated = true;
            opacity = calc.calcOpacity(pageX, pageY);

            console.log(isTranslated, opacity);

        }


    };

    const onMouseUp = (event) => {

        //console.log("onMouseUp");

        event.preventDefault();
        event.stopPropagation();

        if(!calc.isYScroll && calc.isEnougthDist()){

            if(calc.isIndexIncrease()){

                increaseActiveIndex();

            }else{

                decreaseActiveIndex();

            }

        }

        calc.isYScroll = false;
        calc.isFirstMove = true;

        isTranslated = false;
        opacity = 1;
        

        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);

        //onPointerUp(increaseActiveIndex, decreaseActiveIndex);
    };

</script>


<div class={"carousel"}>

    <ul
        class={"items-list"}
        on:mousedown={onMouseDown}
    >

        <slot></slot>

        <!-- {#each items as item, }


             
        {/each} -->

    </ul>

</div>