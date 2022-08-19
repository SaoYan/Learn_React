import React from "react";

import IngredientPlot from "./IngredientPlot";

import classes from "./BurgerPreview.module.css";

/**
 * The visualization of the burger, according the given ingredient info.
 * 
 * @param props
 * `ingredients`s: a JS object { ingredientName: theNumberOfIt }
 */
const BurgerPreview = (props) => {
    let ingredientList = Object.keys(props.ingredients).map((ingre) => {
        const num = props.ingredients[ingre];
        return [...Array(num)].map((__, index) => {
            return <IngredientPlot key={ingre+index} type={ingre}/>
        });
    })
    .reduce((total, current) => {
        return total.concat(current);
    }, []);
    
    if (ingredientList.length === 0) {
        ingredientList = <p>Please start adding ingredients</p>;
    }
    
    return (
        <div className={classes.burgerPreview}>
            <IngredientPlot type="bread-top"/>
            {ingredientList}
            <IngredientPlot type="bread-bottom"/>
        </div>
    );
};

export default BurgerPreview;