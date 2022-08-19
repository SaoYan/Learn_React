import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Redirect } from "react-router-dom";

import BurgerPreview from "../BurgerPreview";
import { Checkout } from ".";

configure({ adapter: new Adapter() });

describe("Checkout", () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
        mockProps = {
            history: {
                push: jest.fn(),
                replace: jest.fn()
            },
            ingredients: {
                ing1: 1,
                ing2: 2
            }
        };

        wrapper = shallow(
            <Checkout
                history={mockProps.history}
                ingredients={mockProps.ingredients}
            />
        );
    });

    it("Should render BurgerPreview based on the provided ingredients", () => {
        expect(wrapper.contains(<BurgerPreview ingredients={mockProps.ingredients}/>)).toEqual(true);
    });

    it("Should redirect to '/home' when no ingrdients occur", () => {
        wrapper.setProps({ ingredients: {} });
        expect(wrapper.equals(<Redirect to="/home" />)).toEqual(true);
    });

    it("Should redirecting to '/home' when clicking the cancel button", () => {
        wrapper.find("button[children='Cancel']").simulate("click");
        expect(mockProps.history.replace).toHaveBeenCalledTimes(1);
        expect(mockProps.history.replace).toBeCalledWith("/home");
    });

    it("Should route to the contact page when clicking continue", () => {
        wrapper.find("button[children='Continue']").simulate("click");
        expect(mockProps.history.push).toHaveBeenCalledTimes(1);
        expect(mockProps.history.push).toBeCalledWith("/checkout/contact");
    });
});