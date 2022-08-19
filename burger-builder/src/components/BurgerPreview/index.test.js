import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import BurgerPreview from ".";
import IngredientPlot from "./IngredientPlot";

configure({ adapter: new Adapter() });

describe("BurgerPreview", () => {
    it("Should render n + 2 IngredientPlot where n it the total count of all ingredients", () => {
        const ingredients = {
            bacon: 1,
            cheese: 2,
            meat: 3
        };
        const wrapper = shallow(<BurgerPreview ingredients={ingredients}/>)

        expect(wrapper.find(IngredientPlot)).toHaveLength(8);
    });
});