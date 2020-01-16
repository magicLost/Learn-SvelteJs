
class Helper{

    setState = null;

    constructor(setState){
        this.setState = setState;
    }

    onClick = () => {

        this.setState((prevState) => {

            return { translateX: prevState.translateX + 1 };

        });

    };

}

export default Helper;