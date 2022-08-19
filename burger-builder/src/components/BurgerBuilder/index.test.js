import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { BurgerBuilder } from ".";
import BurgerPreview from "../BurgerPreview";
import OrderSummary from "./OrderSummary";
import Panel from "./Panel";
import Spinner from "../UI/Spinner";

configure({ adapter: new Adapter() });

describe("BurgerBuilder", () => {
    let mockProps;
    let mockState;
    let wrapper;

    beforeEach(() => {
        mockProps = {
            isAuthenticated: false,
            ingredients: {},
            totalPrice: 0,
            fetchInitBurger: jest.fn().mockImplementation(() => Promise.resolve())
        };

        mockState = {
            loadingMount: false,
            mountError: false
        };

        wrapper = shallow(
            <BurgerBuilder
                {...mockProps}
                fetchInitBurger={mockProps.fetchInitBurger}
            />
        );
        wrapper.setState(mockState);
    });

    it("Should render nothing when not authenticated", () => {
        expect(wrapper.type()).toBeNull();
    });

    it("Should not reach out to the server on mount when not authenticated", () => {
        expect(mockProps.fetchInitBurger).not.toHaveBeenCalled();
    });

    it("Should reach out to the server on mount when authenticated", () => {
        wrapper = shallow(
            <BurgerBuilder
                {...mockProps}
                isAuthenticated={true}
                fetchInitBurger={mockProps.fetchInitBurger}
            />
        );
        expect(mockProps.fetchInitBurger).toHaveBeenCalledTimes(1);
    });

    it("Should render correct content when authenticated, not loading, and no mount error", () => {
        wrapper.setProps({ isAuthenticated: true });

        expect(wrapper.contains(<h3>Ops, something went wrong.</h3>)).toEqual(false);

        expect(wrapper.exists(Spinner)).toEqual(false);

        expect(wrapper.exists(BurgerPreview)).toEqual(true);
        expect(wrapper.exists(OrderSummary)).toEqual(true);
        expect(wrapper.exists(Panel)).toEqual(true);
    });

    it("Should render Spinner when authenticated, while loading", () => {
        wrapper.setProps({ isAuthenticated: true });
        wrapper.setState({ loadingMount: true });

        expect(wrapper.contains(<h3>Ops, something went wrong.</h3>)).toEqual(false);

        expect(wrapper.exists(Spinner)).toEqual(true);

        expect(wrapper.exists(BurgerPreview)).toEqual(false);
        expect(wrapper.exists(OrderSummary)).toEqual(false);
        expect(wrapper.exists(Panel)).toEqual(false);
    });

    it("Should inform user when mount error occurs", () => {
        wrapper.setProps({ isAuthenticated: true });
        wrapper.setState({ mountError:true });

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