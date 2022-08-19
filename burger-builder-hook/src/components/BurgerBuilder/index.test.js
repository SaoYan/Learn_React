import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import * as react from "react";

import { BurgerBuilder } from ".";
import BurgerPreview from "../BurgerPreview";
import OrderSummary from "./OrderSummary";
import Panel from "./Panel";
import Spinner from "../UI/Spinner";

configure({ adapter: new Adapter() });

const mockUseState = (state) => {
    let stateNo = 1;
    const useStateSpy =  jest.spyOn(react, "useState").mockImplementation((initState) => {
        initState = state[stateNo- 1];
        stateNo++;
        return [initState, jest.fn()]
    });
    return useStateSpy;
}

describe("BurgerBuilder", () => {
    let mockProps;
    let wrapper;
    let useStateSpy;

    beforeEach(() => {
        mockProps = {
            isAuthenticated: false,
            ingredients: {},
            totalPrice: 0,
            fetchInitBurger: jest.fn().mockImplementation(() => Promise.resolve())
        };

        wrapper = shallow(
            <BurgerBuilder
                {...mockProps}
                fetchInitBurger={mockProps.fetchInitBurger}
            />
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (useStateSpy) {
            useStateSpy.mockRestore();
        }
    });

    it("Should render nothing when not authenticated", () => {
        expect(wrapper.type()).toBeNull();
    });

    it("Should render Spinner when authenticated, while loading", () => {
        wrapper.setProps({ isAuthenticated: true });

        expect(wrapper.contains(<h3>Ops, something went wrong.</h3>)).toEqual(false);

        expect(wrapper.exists(Spinner)).toEqual(true);

        expect(wrapper.exists(BurgerPreview)).toEqual(false);
        expect(wrapper.exists(OrderSummary)).toEqual(false);
        expect(wrapper.exists(Panel)).toEqual(false);
    });

    it("Should render correct content when authenticated, not loading, and no mount error", () => {
        useStateSpy = mockUseState([false, false, false]);
        wrapper = shallow(
            <BurgerBuilder
                {...mockProps}
                isAuthenticated={true}
                fetchInitBurger={mockProps.fetchInitBurger}
            />
        );

        expect(wrapper.contains(<h3>Ops, something went wrong.</h3>)).toEqual(false);

        expect(wrapper.exists(Spinner)).toEqual(false);

        expect(wrapper.exists(BurgerPreview)).toEqual(true);
        expect(wrapper.exists(OrderSummary)).toEqual(true);
        expect(wrapper.exists(Panel)).toEqual(true);
    });

    it("Should inform user when mount error occurs", () => {
        useStateSpy = mockUseState([false, false, true]);
        wrapper = shallow(
            <BurgerBuilder
                {...mockProps}
                isAuthenticated={true}
                fetchInitBurger={mockProps.fetchInitBurger}
            />
        );

        expect(wrapper.equals(
            <React.Fragment>
                <h3>Ops, something went wrong.</h3>
                <h3>Fail to load the APP.</h3>
            </React.Fragment>
        )).toEqual(true);

        expect(wrapper.exists(Spinner)).toEqual(false);

        expect(wrapper.exists(BurgerPreview)).toEqual(false);
        expect(wrapper.exists(OrderSummary)).toEqual(false);
        expect(wrapper.exists(Panel)).toEqual(false);
    });
});