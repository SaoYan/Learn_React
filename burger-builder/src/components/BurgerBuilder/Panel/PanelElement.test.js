import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import PanelElement from "./PanelElement";

configure({ adapter: new Adapter() });

describe("PanelElement", () => {
    let mockProps;
    let wrapper;
    
    beforeEach(() => {
        mockProps = {
            label: "label",
            num: "num",
            addIngredientHandler: jest.fn(),
            removeIngredientHandler: jest.fn()
        };

        wrapper = shallow(
            <PanelElement
                label={mockProps.label}
                num={mockProps.num}
                addIngredientHandler={mockProps.addIngredientHandler}
                removeIngredientHandler={mockProps.removeIngredientHandler}
            />
        );
    });

    it("Should render buttons and correct text", () => {
        expect(wrapper.find("div[children='label xnum']").exists()).toEqual(true);
        expect(wrapper.find("button")).toHaveLength(2);
    });

    it("Should handle click events: add ingredient", () => {
        wrapper.find("button[children='+']").simulate("click");
        expect(mockProps.addIngredientHandler).toHaveBeenCalledTimes(1);
    });

    it("Should handle click events: remove ingredient", () => {
        wrapper.find("button[children='-']").simulate("click");
        expect(mockProps.removeIngredientHandler).toHaveBeenCalledTimes(1);
    });
});