<style>

    .scroller{

        width: 100%;
        overflow: hidden;
        touch-action: pan-y;

    }

    .items-list{

        list-style: none;
        display: flex;

    }

    .scroller-item{
		
		padding: 10px 10px 20px 10px;
		flex-grow: 0;
      	flex-shrink: 0;

	}

</style>

<script>

    import CalcTranslateX from "./Helper/calcTranslateX";
    import EventSorter, {EVENT_TYPE} from "./Helper/eventSorter";
    import { onMount, beforeUpdate } from 'svelte';

    beforeUpdate(() => {
		console.log('the Scroller is about to update');
	});

    export let items = [];
    export let Item = null;
    export let itemProps = {};
    
    //export let numberOfItems = 0;

    let listStyle = '';
    //export const itemClickHandler = null;

    const calc = new CalcTranslateX();
    const eventSorter = new EventSorter();

    let isNeedScroller = false;
    let eventType = '';
    //const translateX = 0;

    let containerRef = null;
    let listRef = null;
    let itemRef = null;

    $: numberOfItems = items.length;

    onMount(() => {
        console.log("onMount scroller");
        //window.addEventListener("resize", onWindowResize, false);
        init();
	});
    
    export const init = () => {

        console.log(itemRef);
        console.log(listRef);
        console.log(containerRef);

        calc.setValues(listRef, itemRef, numberOfItems);
        calc.offsetX = containerRef.getBoundingClientRect().x;//right

        isNeedScroller = calc.isNeedScroller();

    }

    const onWindowResize = (event) => {

        calc.setValues(listRef, itemRef, numberOfItems);
        calc.offsetX = containerRef.getBoundingClientRect().x;//right

        isNeedScroller = calc.isNeedScroller();
        //setValues(listWidth, itemWidth, numberOfItems, minTranslateOffset, maxTranslateOffset);

        if(isNeedScroller === true){

            if(calc.translateX > calc.maxTranslateOffset){

                calc.translateX = calc.maxTranslateOffset;

            }else if(calc.translateX < calc.minTranslateOffset){

                calc.translateX = calc.minTranslateOffset;

            }

            listStyle = `transform: translateX( ${calc.translateX}px); transition: transform 0.5s ease-out 0s;`;
            

        }else{

            calc.translateX = 0;
            listStyle = '';

        }

    };

    const onMouseDown = (event) => {

        event.stopPropagation();
        event.preventDefault();

        onPointerDown(event.pageX, event.pageY);

        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseup', onMouseUp, false);

    };

    const onPointerDown = (pageX, pageY) => {
      
        calc.onPointerDown(pageX, pageY, listRef);

        eventSorter.onTouchStart(pageX, pageY);

        listStyle = `
                transform: translateX( ${calc.translateX}px);
            `;
            

    };

    const onMouseMove = (event) => {

        event.stopPropagation();
        event.preventDefault();

        onPointerMove(event.pageX, event.pageY);

    };

    const onPointerMove = (pageX, pageY) => {

        calc.onPointerMove(pageX, pageY);

        if(!calc.isYScroll){

            eventSorter.onTouchMove(pageX);

            calc.calcTranslateXOnMove(calc.translateX, pageX);

            listStyle = `transform: translateX( ${calc.translateX}px);`;
            

        }

    };

    const onMouseUp = (event) => {

        event.stopPropagation();
        event.preventDefault();

        onPointerUp(event.pageX, event.pageY);

        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);

    };

    const onPointerUp = (pageX, pageY) => {

        if(!calc.isYScroll){

            calc.onPointerUp();

            //what event - move, swipe etc...
            eventSorter.onTouchEnd(pageX);

            eventType = eventSorter.whatEventType(pageY);
            console.log(eventType);

            if(eventType === EVENT_TYPE.CLICK){

                return;
            
            }

            if(calc.translateX > calc.maxTranslateOffset){

                calc.translateX = calc.maxTranslateOffset;

            }else if(calc.translateX < calc.minTranslateOffset){

                calc.translateX = calc.minTranslateOffset;

            }else if(eventType === EVENT_TYPE.SWIPE || eventType === EVENT_TYPE.SWIPE_MOVE) {

                calc.calcTranslateXOnSwipe(eventSorter.getSwipeSpeed());

            }

            listStyle = ` transition: transform 0.5s ease-out 0s; transform: translateX( ${calc.translateX}px);`;
            

        }

        calc.onPointerUp();


    };


</script>

<svelte:window on:resize={onWindowResize}/>

<div class={"scroller"} bind:this={containerRef}>

    <ul
        class={"items-list"}
        bind:this={listRef}
        on:mousedown={onMouseDown}
        style={listStyle}
    >

        {#each items as item, i ("scroller_item" + item)}


            {#if i === items.length - 1}
                
                <li data-index={i} class={"scroller-item"}  bind:this={itemRef}>
                    <Item {...itemProps} index={i} />
                </li>
            
            {:else}

                <li  class={"scroller-item"} >
                    <Item {...itemProps} index={i} />
                </li>

            {/if}
            
                
        {/each}


    </ul>

</div>