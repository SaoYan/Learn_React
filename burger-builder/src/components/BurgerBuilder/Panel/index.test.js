import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Panel from ".";
import PanelElement from "./PanelElement";

configure({ adapter: new Adapter() });

describe("Panel", () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
        mockProps = {
            ingredients: {
                ing1: 1,
                ing2: 2,
                ing3: 3
            },
            resetIngredientsHandler: jest.fn(),
            purchaseHandler: jest.fn()
        }

        wrapper = shallow(
            <Panel
                ingredients={mockProps.ingredients}
                resetIngredientsHandler={mockProps.resetIngredientsHandler}
                purchaseHandler={mockProps.purchaseHandler}
            />
        );
    });

    it("Should render one PanelElement for each of the ingredients", () => {
        expect(wrapper.find(PanelElement)).toHaveLength(3);
    });

    it("Should handle click event: reset", () => {
        wrapper.find("button[children='Reset']").simulate("click");
        expect(mockProps.resetIngredientsHandler).toHaveBeenCalledTimes(1);
    });

    it("Should handle click event: checkout", () => {
        wrapper.find("button[children='Checkout']").simulate("click");
        expect(mockProps.purchaseHandler).toHaveBeenCalledTimes(1);;
    });
});