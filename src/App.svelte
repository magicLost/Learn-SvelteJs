<style>

    :global(*){
        margin: 0;
        padding: 0;
    }

	p {
		color: purple;
		font-family: 'Comic Sans MS';
	}

	.carousel-item{
        width: 100%;
        min-height: 350px;

        text-align: center;

        opacity: 0;

        margin-left: -100%;

        background: linear-gradient(45deg, rgb(255, 210, 217), rgb(199, 255, 255));

        flex-grow: 0;
        flex-shrink: 0;
    }

    .carousel-item:first-child{
        margin-left: 0;
	}

	.scroller{
		width: 80vw;
		margin: auto;
	}
	
	
</style>

<script>
/* 	import CallMe from './container/Forms/CallMe/CallMe.svelte';*/
	import { onMount, beforeUpdate } from 'svelte';
	import CarouselOpacity from './container/Carousel/CarouselOpacity.svelte';
	import Scroller from './container/Scroller/Scroller.svelte';
	import ZScroller from './container/ZScroller/ZScroller.svelte';
	import Card from './component/Card/Card.svelte';

	beforeUpdate(() => {
		console.log('the App is about to update');
	});

	//let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
	let items = [1, 2, 3, 4, 5, 6];
	let activeIndex = 0;
	let opacity = 1;
	let isTranslated = false;


	//scroller
	//let itemRef = null;
	

	//console.log("App");

	$: itemStyle = isTranslated ? 
		"transition-property: opacity; opacity: " + opacity 
		: "transition-property: opacity; transition-duration: 1s; opacity: " + opacity; 

	/* onMount(() => {
		console.log("Mount App");
        init();
	}); */


	const increaseActiveIndex = () => {
		activeIndex += 1;
	};

	const decreaseActiveIndex = () => {
		activeIndex -= 1;
	};

</script>

<CarouselOpacity 
	increaseActiveIndex={increaseActiveIndex} 
	decreaseActiveIndex={decreaseActiveIndex} 
	bind:isTranslated 
	bind:opacity
>

	{#each items as item, i ("caruosel_item" + item)}

		<li class={"carousel-item"} style={ i === activeIndex ? itemStyle : '' }>
			<h3>{activeIndex}</h3>
			<p>Hello, my friend.</p>
		</li>
             
    {/each}

</CarouselOpacity>

<div class="scroller">
	<Scroller
		items={items}
		Item={Card}
		itemProps={{}}
	/>
</div>

<br />

<div class="scroller">

	<ZScroller
		items={items}
		Item={Card}
		itemProps={{}}
		itemClickHandler={() => {console.log("Item click");}}
	/>

</div>

<!-- 	{#each items as item, i ("scroller_item" + item)}

		{#if i === items.length - 1}
			 
			<li class={"scroller-item"} style={listStyle} bind:this={itemRef}>
				<Card index={i} />
			</li>
		
		{:else}

			<li data-index={i} class={"scroller-item"} style={listStyle}>
				<Card index={i} />
			</li>

		{/if}
		
             
    {/each}

</Scroller> -->



