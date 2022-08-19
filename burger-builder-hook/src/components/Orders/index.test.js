import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import * as react from "react";

import { Orders } from ".";
import OrderItem from "./OrderItem";
import Spinner from "../UI/Spinner";
import * as mapErrorToAlert from "../Util/mapErrorToAlert";

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

describe("Orders", () => {
    let mockProps;
    let useStateSpy;
    let wrapper;

    beforeEach(() => {
        jest.spyOn(mapErrorToAlert, "dataErrorAlert")
            .mockImplementation((error) => {});

        mockProps = {
            isAuthenticated: false,
            token: "TOKEN",
            userId: "ISER_ID",
            orders: {
                ORDER1: {},
                ORDER2: {},
                ORDER3: {}
            },
            fetchOrders: jest.fn().mockImplementation(() => Promise.resolve()),
            clearOrders: jest.fn().mockImplementation(() => Promise.resolve())
        };

        wrapper = shallow(
            <Orders
                {...mockProps}
                fetchOrders={mockProps.fetchOrders}
                clearOrders={mockProps.clearOrders}
            />
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
        if (useStateSpy) {
            useStateSpy.mockRestore();
        }
    });

    it("Should render Spinner when loading orders", () => {
        expect(wrapper.equals(<Spinner />)).toEqual(true);
    });

    it("Should render Spinner when processing deletion", () => {
        mockUseState([false, false, true]);
        wrapper = shallow(
            <Orders
                {...mockProps}
                fetchOrders={mockProps.fetchOrders}
                clearOrders={mockProps.clearOrders}
            />
        );

        expect(wrapper.equals(<Spinner />)).toEqual(true);
    });

    it("Should inform user when error occurs", () => {
        mockUseState([false, true, false]);
        wrapper = shallow(
            <Orders
                {...mockProps}
                fetchOrders={mockProps.fetchOrders}
                clearOrders={mockProps.clearOrders}
            />
        );

        expect(wrapper.equals(
            <React.Fragment>
                <h3>Ops, something went wrong.</h3>
                <h3>Fail to load order history.</h3>
            </React.Fragment>
        )).toEqual(true);
    });

    it("Should inform user if no orders are found", () => {
        mockUseState([false, false, false]);
        wrapper = shallow(
            <Orders
                {...mockProps}
                fetchOrders={mockProps.fetchOrders}
                clearOrders={mockProps.clearOrders}
            />
        );
        wrapper.setProps({ orders: {} });
        expect(wrapper.equals(<h3>No order history found.</h3>)).toEqual(true);
    });

    it("Should render OrderItem based on the fetched orders", () => {
        expect(wrapper.find(OrderItem)).toHaveLength(3);
    });

    it("Should handle click event - clear orders", () => {
        wrapper.find("button[children='Clear']").simulate("click");
        expect(mockProps.clearOrders).toHaveBeenCalledTimes(1);
        expect(mockProps.clearOrders).toBeCalledWith({
            token: mockProps.token,
            userId: mockProps.userId,
            orders: mockProps.orders
        });
    });
});