import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import OrderSummary from ".";

configure({ adapter: new Adapter() });

describe("OrderSummary", () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
        mockProps = {
            ingredients: {
                ing1: 1,
                ing2: 2
            },
            price: 0,
            clickCancel: jest.fn(),
            clickOk: jest.fn()
        };

        wrapper = shallow(
            <OrderSummary
                ingredients={mockProps.ingredients}
                price={mockProps.price}
                clickCancel={mockProps.clickCancel}
                clickOk={mockProps.clickOk}
            />
        );
    });

    it("Should display summary for each of the ingredients", () => {
        expect(
            wrapper.find("li").findWhere(x => x.text() === "ing1 x1")
        ).toHaveLength(1);

        expect(
            wrapper.find("li").findWhere(x => x.text() === "ing2 x2")
        ).toHaveLength(1);
    });

    it("Should handle event - clicking Calcel button", () => {
        wrapper.find("button[children='Cancel']").simulate("click");
        expect(mockProps.clickCancel).toHaveBeenCalledTimes(1);
    });

    it("Should handle event - clicking OK button", () => {
        wrapper.find("button[children='Go for it']").simulate("click");
        expect(mockProps.clickOk).toHaveBeenCalledTimes(1);
    });
});