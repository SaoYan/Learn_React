import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import OrderItem from "./OrderItem";

configure({ adapter: new Adapter() });

describe("OrderItem", () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
        mockProps = {
            ingredients: {
                ing1: 1,
                ing2: 2
            },
            time: "TIME",
            price: 0,
            clickHandler: jest.fn()
        };

        wrapper = shallow(<OrderItem {...mockProps} clickHandler={mockProps.clickHandler}/>);
    });

    it("Should display the ingredient summary", () => {
        expect(wrapper.find("p[children='1 ing1, 2 ing2']")).toHaveLength(1);
    });

    it("Should handld the click event", () => {
        wrapper.find("div").simulate("click");
        expect(mockProps.clickHandler).toHaveBeenCalledTimes(1);
    });
});