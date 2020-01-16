
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

    import ScrollerController from './Controller/ScrollerController';
    import CalcTranslateX from './Model/CalcTranslateX';
    import EventTyper, {EVENT_TYPE} from './Model/EventTyper';
    import { onMount, beforeUpdate } from 'svelte';

    beforeUpdate(() => {
        console.log('the ZScroller is about to update');
        //console.log("mouseDownHandler", mouseDownHandler);
	});

    export let items = [];
    export let Item = null;
    export let itemProps = {};
    export let itemClickHandler = null;
    
    //export let numberOfItems = 0;

    let state = {
        translateX: 0,
        listStyle: '',
        isNeedScroller: false
    };

    const setState = (callback) => {

        let newState = callback(state); 

        /* console.log("setState");
        console.log(state, newState);
        console.log(state === newState); */

        if(newState === state)
            return;
            
        state = newState;

    };

    const controller = new ScrollerController(
        new CalcTranslateX(),
        new EventTyper(),
        setState
    );

    /* controller.containerRef = null;
    controller.listRef = null;
    controller.itemRef = null; */

    //let mouseDownHandler = null;
    let touchStartHandler = null;
    let touchMoveHandler = null;
    let touchEndHandler = null;

    $: controller.numberOfItems = items.length;

    //$: finalListStyle = state.isNeedScroller ? state.listStyle : "justify-content: center";

    //$: mouseDownHandler = state.isNeedScroller ? controller.onMouseDown : null;

    

    /* $: if(state.isNeedScroller){

        console.log("isNeedScroller", state.isNeedScroller);

        mouseDownHandler = controller.onMouseDown;
        touchStartHandler = controller.onTouchStart;
        touchMoveHandler = controller.onTouchMove;
        touchEndHandler = controller.onTouchEnd;

    } */

    onMount(() => {
        console.log("onMount ZScroller");
        //window.addEventListener("resize", onWindowResize, false);
        controller.init();

        //console.log("mouseDownHandler", mouseDownHandler);
    });

    const onItemClick = (event) => {

        const target = event.target;
        //console.log("itemClickHandler start", state.eventType, state.isNeedScroller);
    
        if(state.isNeedScroller){
    
            if(controller.eventType === EVENT_TYPE.CLICK){
    
                //console.log("itemClickHandler eval", state.eventType);
                itemClickHandler(target);
    
            }
    
        }else{
    
            itemClickHandler(target);
    
        }
    
    };


</script>

<svelte:window on:resize={controller.onWindowResize}/>

<div class={"scroller"} bind:this={controller.containerRef}>

    {#if state.isNeedScroller}
        
        <ul
            class={"items-list"}
            bind:this={controller.listRef}
            style={state.listStyle}
            on:mousedown={controller.onMouseDown}
            on:touchstart={controller.onTouchStart}
            on:touchmove={controller.onTouchMove}
            on:touchend={controller.onTouchEnd}
        >

            {#each items as item, i ("scroller_item" + item)}


                {#if i === items.length - 1}
                    
                    <li data-index={i} class={"scroller-item"}  bind:this={controller.itemRef}>
                        <Item {...itemProps} onClick={onItemClick} index={i} />
                    </li>
                
                {:else}

                    <li  class={"scroller-item"} >
                        <Item {...itemProps} onClick={onItemClick} index={i} />
                    </li>

                {/if}
                
                    
            {/each}


        </ul>

    {:else}
         <ul
            class={"items-list"}
            bind:this={controller.listRef}
            style={"justify-content: center"}
        >

            {#each items as item, i ("scroller_item" + item)}


                {#if i === items.length - 1}
                    
                    <li data-index={i} class={"scroller-item"}  bind:this={controller.itemRef}>
                        <Item {...itemProps} onClick={onItemClick} index={i} />
                    </li>
                
                {:else}

                    <li  class={"scroller-item"} >
                        <Item {...itemProps} onClick={onItemClick} index={i} />
                    </li>

                {/if}
                
                    
            {/each}


        </ul>
    {/if}

</div>